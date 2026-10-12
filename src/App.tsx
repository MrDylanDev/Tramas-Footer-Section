import FooterBackground from './footer-background';
import BrandLogo from './brand-logo';

// objeto con la informacion del contenido que se muestra en el footer
const FOOTER_CONTENT = {
  name: 'Tramas.',
  leftTag: 'atelier textil & confección',
  leftHeadline1: 'fibras nobles',
  leftHeadline2: 'en cada metro',
  nav: ['Catálogo de telas', 'Guía de cuidados', 'Muestras & envíos', 'Preguntas frecuentes'],
  rightTag: 'pedidos & asesoría',
  rightHeadline1: '¿iniciando confección?',
  rightHeadline2: 'pide tu muestrario*',
  note: '*envío de muestras y asesoría personalizada a todo el país.',
};

// componente principal que arma toda la estructura visual del footer
export default function App() {
  return (
    <footer className="footer" aria-label="Pie de página">
      {/* video interactivo que reacciona al movimiento del mouse */}
      <FooterBackground />

      {/* columna izquierda con el mensaje principal y la lista de navegacion */}
      <div className="jobs">
        <span className="tag">
          {FOOTER_CONTENT.leftTag}
        </span>
        <span className="headline job-title">
          <span>{FOOTER_CONTENT.leftHeadline1}</span>
          <br />
          <span>{FOOTER_CONTENT.leftHeadline2}</span>
        </span>
        <div className="footer-nav">
          {/* recorremos los enlaces de navegacion */}
          {FOOTER_CONTENT.nav.map((item, idx) => (
            <span key={idx}>{item}</span>
          ))}
        </div>
      </div>

      {/* bloque central donde se renderiza el logo */}
      <div className="logo" role="img" aria-label={`Logo de ${FOOTER_CONTENT.name}`}>
        <BrandLogo name={FOOTER_CONTENT.name} />
      </div>

      {/* columna derecha con la informacion de contacto y redes */}
      <div className="contact">
        <span className="tag">
          {FOOTER_CONTENT.rightTag}
        </span>
        <div className="headline contact-links">
          <span>{FOOTER_CONTENT.rightHeadline1}</span>
          <span>{FOOTER_CONTENT.rightHeadline2}</span>
        </div>
        <p className="note">
          {FOOTER_CONTENT.note}
        </p>
        <div className="socials">
          {/* iconos de redes sociales cargados desde la carpeta public */}
          <span aria-label="LinkedIn"><img src="/linkedin.svg" alt="" width="35" height="35" /></span>
          <span aria-label="Instagram"><img src="/instagram.svg" alt="" width="35" height="35" /></span>
          <span aria-label="TikTok"><img src="/tiktok.svg" alt="" width="35" height="35" /></span>
        </div>
      </div>
    </footer>
  );
}
