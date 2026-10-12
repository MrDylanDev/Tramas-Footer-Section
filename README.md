# Tramas

Sección de pie de página interactiva con seguimiento de mirada por video (gaze-tracking) que sigue la posición del cursor, construida con React 19, Vite y Tailwind CSS.

## Características

- **Seguimiento de mirada / Video scrubbing:** Sigue el movimiento del puntero en tiempo real utilizando ángulos de trayectoria ocular precalculados (`gaze-frames.json`).
- **Diseño responsivo y accesible:** Unidades fluidas de viewport (`vw`), adaptación para dispositivos móviles y compatibilidad con `prefers-reduced-motion`.
- **Tipografía local:** Fuentes Epilogue Black y DM Sans integradas.

## Demostración

![Demostración interactiva](public/Tramas.gif)

📥 [Descargar video original (Tramas.mp4)](public/Tramas.mp4)

## Primeros Pasos

### Requisitos previos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- npm, pnpm o yarn

### Instalación

Clona el repositorio e instala las dependencias:

```bash
git clone git@github.com:MrDylanDev/Tramas-Footer-Section.git
cd Tramas-Footer-Section
npm install
```

### Ejecución del Proyecto

Inicia el servidor de desarrollo local:

```bash
npm run dev
```

Una vez iniciado, abre tu navegador e ingresa a [http://localhost:3000](http://localhost:3000).

### Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo en el puerto 3000 (`--host 0.0.0.0`).
- `npm run build`: Compila la aplicación optimizada para producción.
- `npm run preview`: Previsualiza la compilación de producción de forma local.
- `npm run lint`: Ejecuta el chequeo de tipos con TypeScript sin emitir archivos.

