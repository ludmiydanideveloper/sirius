'use client';

export default function AnnouncementBar() {
  const items = [
    "⚡ 3 Y 6 CUOTAS SIN INTERÉS",
    "ENVÍOS GRATIS A TODO EL PAÍS A PARTIR DE $110.000",
    "10% OFF PAGANDO CON TRANSFERENCIA BANCARIA",
    "3 CUOTAS SIN INTERÉS CON GO CUOTAS DÉBITO",
    "SUMATE A LA CREW Y OBTENÉ 10% OFF EN TU PRIMERA COMPRA"
  ];

  const renderContent = () => (
    <div className="flex items-center shrink-0">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center">
          <span className="mx-8 shrink-0">{item}</span>
          <span className="opacity-30 select-none shrink-0">•</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-black text-white py-3.5 text-[9px] uppercase font-black tracking-[0.2em] italic overflow-hidden whitespace-nowrap select-none border-b border-white/5 relative z-[150] flex">
      {/* Primer set de anuncios */}
      <div className="animate-marquee flex shrink-0">
        {renderContent()}
        {renderContent()}
      </div>
      {/* Segundo set duplicado para efecto loop infinito */}
      <div className="animate-marquee flex shrink-0" aria-hidden="true">
        {renderContent()}
        {renderContent()}
      </div>
    </div>
  );
}
