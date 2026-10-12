import { useEffect, useRef } from 'react';
import gazeFrames from './gaze-frames.json';

// dos pi radianes equivalen a una vuelta completa (360 grados)
const TAU = Math.PI * 2;

// normaliza el angulo para que siempre quede dentro del rango de 0 a dos pi
const wrappedAngle = (angle: number) => (angle % TAU + TAU) % TAU;

// busca en la tabla de datos el fotograma del video mas cercano al angulo hacia donde apunta el cursor
function timeForAngle(angle: number) {
  const target = wrappedAngle(angle);
  let nearestTime = gazeFrames[0][1];
  let nearestDistance = Infinity;

  for (const [sampleAngle, time] of gazeFrames) {
    const difference = Math.abs(target - sampleAngle);
    // medimos la distancia circular mas corta
    const distance = Math.min(difference, TAU - difference);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearestTime = time;
    }
  }

  // sumamos un offset minimo para asegurar que el video caiga en el fotograma correcto
  return nearestTime + 1 / 240;
}

export default function FooterBackground() {
  // referencia directa a la etiqueta de video para controlar el tiempo de reproduccion
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current!;
    let frame = 0;
    let desiredTime = 0;
    let pointer: { x: number; y: number } | null = null;
    let disposed = false;

    // media queries para detectar dispositivos moviles o preferencias de movimiento reducido
    const mobile = window.matchMedia('(max-width: 700px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    // mueve la linea de tiempo del video al tiempo deseado segun el cursor
    const seek = () => {
      frame = 0;
      if (disposed || mobile.matches || video.readyState < 2 || video.seeking) return;
      // solo cambiamos el tiempo si hay una diferencia perceptible
      if (Math.abs(video.currentTime - desiredTime) > 1 / 48) {
        video.currentTime = Math.min(desiredTime, video.duration - 1 / 24);
      }
    };

    // sincroniza el cambio con la tasa de refresco de la pantalla para evitar saltos
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(seek);
    };

    // calcula las coordenadas relativas del centro de los ojos y el angulo hacia el puntero
    const updateTarget = () => {
      if (mobile.matches || !pointer) return;
      const rect = video.getBoundingClientRect();
      const scale = Math.max(rect.width / 1920, rect.height / 1080);

      // posicion aproximada del centro de la mirada en el video original
      const eyeX = rect.left + rect.width / 2 + (948 - 960) * scale;
      const eyeY = rect.top + rect.height / 2 + (418 - 540) * scale;

      const dx = pointer.x - eyeX;
      const dy = pointer.y - eyeY;

      // ignoramos variaciones muy pequeñas si el cursor esta justo encima del punto central
      if (Math.hypot(dx, dy) > 8) {
        desiredTime = timeForAngle(Math.atan2(dy, dx));
        schedule();
      }
    };

    // guarda la posicion actual del mouse
    const move = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
      updateTarget();
    };

    // ajusta el comportamiento del video segun el tipo de pantalla
    const ready = () => {
      video.loop = mobile.matches;
      if (mobile.matches && !reducedMotion.matches) {
        void video.play().catch(() => {});
      } else {
        video.pause();
        if (!mobile.matches) {
          updateTarget();
          schedule();
        }
      }
    };

    // escuchamos los eventos del usuario y del ciclo de vida del video
    video.addEventListener('seeked', schedule);
    video.addEventListener('loadeddata', ready);
    mobile.addEventListener('change', ready);
    reducedMotion.addEventListener('change', ready);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('resize', updateTarget);
    window.addEventListener('scroll', updateTarget, { passive: true });

    if (video.readyState >= 2) ready();

    // limpiamos todos los listeners al desmontar el componente
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      video.removeEventListener('seeked', schedule);
      video.removeEventListener('loadeddata', ready);
      mobile.removeEventListener('change', ready);
      reducedMotion.removeEventListener('change', ready);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('resize', updateTarget);
      window.removeEventListener('scroll', updateTarget);
    };
  }, []);

  return (
    <div className="footer-background" aria-hidden="true">
      <video ref={videoRef} muted playsInline preload="auto" src="/footer-scrub.mp4" />
    </div>
  );
}
