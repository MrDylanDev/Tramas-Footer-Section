import { useState, useEffect } from 'react';
import FooterBackground from './footer-background';
import BrandLogo from './brand-logo';

interface StudioContent {
  name: string;
  leftTag: string;
  leftHeadline1: string;
  leftHeadline2: string;
  nav: string[];
  rightTag: string;
  rightHeadline1: string;
  rightHeadline2: string;
  note: string;
}

const DEFAULT_CONTENT: StudioContent = {
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

const STORAGE_KEY = 'studio_fabrics_footer_v4';

export default function App() {
  const [content, setContent] = useState<StudioContent>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_CONTENT;
  });

  const [isEditingName, setIsEditingName] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    } catch {
      // ignore
    }
  }, [content]);

  const updateField = (key: keyof StudioContent, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const updateNavItem = (index: number, value: string) => {
    setContent((prev) => {
      const nextNav = [...prev.nav];
      nextNav[index] = value;
      return { ...prev, nav: nextNav };
    });
  };

  return (
    <footer className="footer" aria-label="Pie de página">
      <FooterBackground />
      <div className="jobs">
        <span
          className="tag cursor-text"
          contentEditable
          suppressContentEditableWarning
          title="Haz clic para editar"
          onBlur={(e) => updateField('leftTag', e.currentTarget.textContent || '')}
        >
          {content.leftTag}
        </span>
        <span className="headline job-title">
          <span
            className="cursor-text"
            contentEditable
            suppressContentEditableWarning
            title="Haz clic para editar"
            onBlur={(e) => updateField('leftHeadline1', e.currentTarget.textContent || '')}
          >
            {content.leftHeadline1}
          </span>
          <br />
          <span
            className="cursor-text"
            contentEditable
            suppressContentEditableWarning
            title="Haz clic para editar"
            onBlur={(e) => updateField('leftHeadline2', e.currentTarget.textContent || '')}
          >
            {content.leftHeadline2}
          </span>
        </span>
        <div className="footer-nav">
          {content.nav.map((item, idx) => (
            <span
              key={idx}
              className="cursor-text"
              contentEditable
              suppressContentEditableWarning
              title="Haz clic para editar"
              onBlur={(e) => updateNavItem(idx, e.currentTarget.textContent || '')}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="logo" role="img" aria-label={`Logo de ${content.name}`}>
        {isEditingName ? (
          <input
            autoFocus
            type="text"
            defaultValue={content.name}
            className="bg-transparent border-b border-[#080909] outline-none text-[#080909] w-full"
            style={{
              fontFamily: 'Epilogue, Arial, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(22px, 2.7vw, 40px)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
            }}
            onBlur={(e) => {
              const val = e.target.value.trim();
              if (val) updateField('name', val);
              setIsEditingName(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const val = e.currentTarget.value.trim();
                if (val) updateField('name', val);
                setIsEditingName(false);
              }
            }}
          />
        ) : (
          <div
            onClick={() => setIsEditingName(true)}
            title="Haz clic para editar el nombre"
            style={{ cursor: 'pointer' }}
          >
            <BrandLogo name={content.name} />
          </div>
        )}
      </div>
      <div className="contact">
        <span
          className="tag cursor-text"
          contentEditable
          suppressContentEditableWarning
          title="Haz clic para editar"
          onBlur={(e) => updateField('rightTag', e.currentTarget.textContent || '')}
        >
          {content.rightTag}
        </span>
        <div className="headline contact-links">
          <span
            className="cursor-text"
            contentEditable
            suppressContentEditableWarning
            title="Haz clic para editar"
            onBlur={(e) => updateField('rightHeadline1', e.currentTarget.textContent || '')}
          >
            {content.rightHeadline1}
          </span>
          <span
            className="cursor-text"
            contentEditable
            suppressContentEditableWarning
            title="Haz clic para editar"
            onBlur={(e) => updateField('rightHeadline2', e.currentTarget.textContent || '')}
          >
            {content.rightHeadline2}
          </span>
        </div>
        <p
          className="note cursor-text"
          contentEditable
          suppressContentEditableWarning
          title="Haz clic para editar"
          onBlur={(e) => updateField('note', e.currentTarget.textContent || '')}
        >
          {content.note}
        </p>
        <div className="socials">
          <span aria-label="LinkedIn"><img src="/linkedin.svg" alt="" width="35" height="35" /></span>
          <span aria-label="Instagram"><img src="/instagram.svg" alt="" width="35" height="35" /></span>
          <span aria-label="TikTok"><img src="/tiktok.svg" alt="" width="35" height="35" /></span>
        </div>
      </div>
    </footer>
  );
}
