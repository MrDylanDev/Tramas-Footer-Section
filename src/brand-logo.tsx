// este componente dibuja el logo como un grafico svg
interface BrandLogoProps {
  name?: string;
}

export default function BrandLogo({ name = 'Tramas.' }: BrandLogoProps) {
  // calculamos el ancho aproximado segun la cantidad de letras para que no se corte
  const width = Math.max(130, name.length * 22);

  return (
    // usamos svg en lugar de una imagen fija para que el texto siempre se vea nitido
    <svg
      aria-hidden="true"
      width={width}
      height="40"
      viewBox={`0 0 ${width} 40`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      {/* dibujamos el texto usando la tipografia epilogue */}
      <text
        x="0"
        y="30"
        fontFamily="Epilogue, Arial, sans-serif"
        fontWeight="900"
        fontSize="32"
        letterSpacing="-0.04em"
        fill="currentColor"
      >
        {name}
      </text>
    </svg>
  );
}
