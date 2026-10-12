interface BrandLogoProps {
  name?: string;
}

export default function BrandLogo({ name = 'Tramas.' }: BrandLogoProps) {
  const width = Math.max(130, name.length * 22);
  return (
    <svg
      aria-hidden="true"
      width={width}
      height="40"
      viewBox={`0 0 ${width} 40`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
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
