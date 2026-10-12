# Tramas - Interactive Footer Section

Interactive footer section featuring video gaze-tracking that follows the cursor, built with React 19, Vite, and Tailwind CSS.

## Features
- **Video Scrubbing / Gaze Tracking:** Follows pointer movements using pre-calculated eye trajectory angles (`gaze-frames.json`).
- **Responsive & Accessible:** Fluid viewport units (`vw`), mobile layout fallback, and support for `prefers-reduced-motion`.
- **Local Typography:** Epilogue Black & DM Sans fonts.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm, pnpm, or yarn

### Installation
Clone the repository and install dependencies:
```bash
git clone git@github.com:MrDylanDev/Tramas-Footer-Section.git
cd Tramas-Footer-Section
npm install
```

### Running the Project
Start the development server:
```bash
npm run dev
```
Once started, open your browser and navigate to [http://localhost:3000](http://localhost:3000).

### Available Scripts
- `npm run dev`: Starts the local development server on port 3000 (`--host 0.0.0.0`).
- `npm run build`: Bundles the application for production.
- `npm run preview`: Previews the production build locally.
- `npm run lint`: Runs TypeScript type-checking without emitting files.

