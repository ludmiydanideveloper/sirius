'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/store/useCart';

// CONFIGURACIÓN: Cambiá este número por el de la tienda (código de país + área + número sin el +)
const STORE_WHATSAPP_NUMBER = '5493329606115'; 

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [isOrdered, setIsOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  // Estado para el formulario de envío
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    shippingMethod: 'pickup', // 'pickup' | 'delivery'
    address: '',
  });

  // Estado para errores de validación
  const [validationError, setValidationError] = useState('');

  // Traemos el estado real del carrito de Zustand
  const { cart, updateQuantity, removeItem, totalPrice, clearCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen bg-white text-zinc-950 flex items-center justify-center">
        <div className="text-[10px] uppercase tracking-[0.5em] font-black animate-pulse text-zinc-400">
          Cargando Sistema de Carrito...
        </div>
      </main>
    );
  }

  const subtotal = totalPrice();
  const shippingCost = formData.shippingMethod === 'delivery' ? 4500 : 0;
  const total = subtotal + shippingCost;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError('');
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.name.trim()) {
      setValidationError('Ingresá tu nombre y apellido.');
      return;
    }
    if (!formData.phone.trim()) {
      setValidationError('Ingresá un celular de contacto.');
      return;
    }
    if (formData.shippingMethod === 'delivery' && !formData.address.trim()) {
      setValidationError('Ingresá una dirección para el envío.');
      return;
    }

    // Generar número de orden (ej: SR-7482)
    const generatedId = `SR-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedId);

    // Formatear el listado de productos para el mensaje de WhatsApp
    const itemsText = cart
      .map(
        (item) =>
          `• ${item.quantity}x ${item.name} (Talle: ${item.size}) - $${(
            item.price * item.quantity
          ).toLocaleString('es-AR')}`
      )
      .join('\n');

    // Construir mensaje estructurado para WhatsApp
    const message = `⚡ NUEVO PEDIDO - SIRIUS STUDIO ⚡
----------------------------------
Orden: *${generatedId}*
Cliente: *${formData.name}*
Contacto: *${formData.phone}*
Método: *${
      formData.shippingMethod === 'pickup'
        ? 'Retiro gratis en punto Baradero'
        : 'Envío a domicilio (Correo Argentino)'
    }*
${formData.shippingMethod === 'delivery' ? `Dirección: *${formData.address}*\n` : ''}
ITEMS:
${itemsText}

Subtotal: $${subtotal.toLocaleString('es-AR')}
Envío: ${shippingCost === 0 ? 'Gratis' : `$${shippingCost.toLocaleString('es-AR')}`}
TOTAL: *$${total.toLocaleString('es-AR')}*
----------------------------------
Por favor, envíame los datos para realizar la transferencia bancaria. ¡Muchas gracias!`;

    // Crear enlace a WhatsApp web / app
    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(whatsappUrl, '_blank');

    // Cambiar estado a pedido confirmado
    setIsOrdered(true);
  };

  const handleFinished = () => {
    // Limpiamos el carrito local
    clearCart();
    // Volvemos a home
    window.location.href = '/';
  };

  // VISTA DE "PEDIDO RECIBIDO"
  if (isOrdered) {
    return (
      <main className="min-h-screen bg-white text-zinc-950 flex items-center justify-center p-6 italic font-black">
        <div className="max-w-xl w-full border border-black/5 p-8 md:p-16 text-center space-y-8 animate-in fade-in zoom-in duration-500 bg-zinc-50 shadow-sm rounded-sm">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.5em] text-green-600 font-bold">Éxito // Pedido Confirmado</span>
            <h1 className="text-4xl md:text-6xl tracking-tighter uppercase leading-[0.9] text-black">PEDIDO RECIBIDO</h1>
          </div>
          
          <div className="py-8 border-y border-black/5 space-y-4">
            <div>
              <p className="text-[8px] uppercase tracking-widest text-zinc-400 mb-2">Tu número de orden es:</p>
              <p className="text-4xl tracking-tighter text-black font-mono">{orderId}</p>
            </div>
            <div className="bg-white p-4 border border-black/10 text-left not-italic font-sans text-xs text-zinc-600 space-y-2">
              <p className="font-bold text-[10px] uppercase tracking-widest text-zinc-400 italic">Resumen del Envío:</p>
              <p><span className="text-zinc-900 font-bold">Nombre:</span> {formData.name}</p>
              <p><span className="text-zinc-900 font-bold">Contacto:</span> {formData.phone}</p>
              <p><span className="text-zinc-900 font-bold">Método:</span> {formData.shippingMethod === 'pickup' ? 'Retiro en punto Baradero' : `Envío a domicilio (${formData.address})`}</p>
              <p><span className="text-zinc-900 font-bold">Total a Transferir:</span> ${total.toLocaleString('es-AR')}</p>
            </div>
          </div>

          <div className="space-y-4 font-sans not-italic text-xs text-zinc-500">
            <p className="leading-relaxed uppercase tracking-wider font-black text-black italic">
              ¡Hemos abierto WhatsApp para coordinar tu compra!
            </p>
            <p className="leading-relaxed">
              Si la pestaña de WhatsApp no se abrió de forma automática o tuviste algún inconveniente, haz clic en el siguiente enlace para enviar el pedido manualmente:
            </p>
            <a 
              href={`https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hola! Mi orden es la ${orderId}. Aquí tienes mi pedido.`
              )}`}
              target="_blank"
              className="inline-block text-green-600 hover:text-green-500 font-bold underline transition"
            >
              Hacer clic aquí para reenviar por WhatsApp
            </a>
          </div>

          <button 
            onClick={handleFinished} 
            className="w-full block bg-black text-white py-5 text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-800 transition font-black italic rounded-sm shadow-sm"
          >
            Volver a la Tienda [ Finalizar ]
          </button>
        </div>
      </main>
    );
  }

  // VISTA NORMAL DEL CARRITO
  return (
    <main className="min-h-screen bg-white text-zinc-900 p-6 md:p-24 italic font-black selection:bg-black selection:text-white transition-all duration-300">
      <header className="mb-16 border-b border-black/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-6xl md:text-8xl uppercase tracking-tighter leading-none text-black">Tu Carrito</h1>
          <p className="text-[9px] text-zinc-400 uppercase tracking-[0.4em] mt-4 font-bold">Prendas Seleccionadas // Listas para el Lanzamiento</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-zinc-300 font-mono tracking-tighter uppercase italic block">
            Artículos_Activos // {cart.length}
          </span>
        </div>
      </header>

      {cart.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          
          {/* COLUMNA 1 & 2: LISTA DE PRODUCTOS (2/3 de ancho) */}
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item) => (
              <div 
                key={`${item.id}-${item.size}`} 
                className="flex flex-col sm:flex-row gap-6 border-b border-black/5 pb-8 group relative"
              >
                {/* Imagen del producto */}
                <div className="w-24 h-32 bg-zinc-50 border border-black/5 overflow-hidden shrink-0 rounded-sm">
                  <img 
                    src={item.image || "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=200"} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                    alt={item.name} 
                  />
                </div>

                {/* Detalles e Interactividad */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl uppercase tracking-tighter leading-none mb-2 text-black">
                        {item.name}
                      </h3>
                      <p className="text-[9px] text-zinc-400 tracking-widest uppercase font-sans not-italic font-bold">
                        Talle: <span className="text-zinc-950 font-black italic">{item.size}</span>
                      </p>
                    </div>
                    <p className="text-2xl tracking-tighter font-mono text-black">
                      ${(item.price * item.quantity).toLocaleString('es-AR')}
                    </p>
                  </div>

                  {/* Controles de cantidad e eliminación */}
                  <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center border border-black/10 bg-white text-xs rounded-sm shadow-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="px-4 py-2 hover:bg-black hover:text-white transition font-bold"
                      >
                        -
                      </button>
                      <span className="px-4 font-mono text-sm text-black">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="px-4 py-2 hover:bg-black hover:text-white transition font-bold"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      onClick={() => removeItem(item.id, item.size)}
                      className="text-[9px] text-zinc-400 hover:text-red-600 uppercase tracking-widest transition"
                    >
                      [ Quitar ]
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* COLUMNA 3: DETALLES DE COMPRA Y FORMULARIO DE ENVÍO */}
          <div className="space-y-8 lg:sticky lg:top-28">
            <form onSubmit={handleCheckout} className="bg-zinc-50 border border-black/5 p-6 md:p-8 space-y-8 shadow-sm rounded-sm">
              <h2 className="text-xl uppercase tracking-tighter border-b border-black/10 pb-4 text-black">
                Datos del Pedido
              </h2>

              {/* Campos del Formulario */}
              <div className="space-y-4 font-sans not-italic">
                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-zinc-400 font-bold mb-2">Nombre y Apellido *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-black/10 p-4 text-xs font-bold text-black uppercase outline-none focus:border-black transition shadow-inner rounded-sm"
                    placeholder="Ej: Dani Gómez"
                  />
                </div>

                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-zinc-400 font-bold mb-2">Celular de Contacto (WhatsApp) *</label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-white border border-black/10 p-4 text-xs font-bold text-black outline-none focus:border-black transition shadow-inner rounded-sm"
                    placeholder="Ej: 3329123456"
                  />
                </div>

                <div>
                  <label className="block text-[8px] uppercase tracking-widest text-zinc-400 font-bold mb-2">Método de Entrega *</label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, shippingMethod: 'pickup' }))}
                      className={`py-3 text-[9px] uppercase tracking-widest font-black border transition rounded-sm ${
                        formData.shippingMethod === 'pickup' 
                          ? 'bg-black text-white border-black shadow-sm' 
                          : 'bg-white border-black/10 text-zinc-500 hover:border-black/20 hover:bg-zinc-100'
                      }`}
                    >
                      Retiro Baradero
                    </button>
                    <button 
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, shippingMethod: 'delivery' }))}
                      className={`py-3 text-[9px] uppercase tracking-widest font-black border transition rounded-sm ${
                        formData.shippingMethod === 'delivery' 
                          ? 'bg-black text-white border-black shadow-sm' 
                          : 'bg-white border-black/10 text-zinc-500 hover:border-black/20 hover:bg-zinc-100'
                      }`}
                    >
                      Envío Correo
                    </button>
                  </div>
                </div>

                {formData.shippingMethod === 'delivery' && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-[8px] uppercase tracking-widest text-zinc-400 font-bold mb-2">Dirección Completa de Envío *</label>
                    <input 
                      type="text" 
                      name="address"
                      required={formData.shippingMethod === 'delivery'}
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-black/10 p-4 text-xs font-bold text-black uppercase outline-none focus:border-black transition shadow-inner rounded-sm"
                      placeholder="Ej: Calle Ficticia 123, CP 2942, Baradero"
                    />
                  </div>
                )}
              </div>

              {/* Mensaje de validación */}
              {validationError && (
                <p className="text-red-500 text-[10px] uppercase font-bold tracking-widest animate-pulse">
                  ⚠️ {validationError}
                </p>
              )}

              {/* Desglose de Precios */}
              <div className="space-y-4 pt-4 border-t border-black/10">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500 font-sans not-italic">
                  <span>Productos ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                  <span>${subtotal.toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-500 font-sans not-italic">
                  <span>Envío</span>
                  <span>{shippingCost === 0 ? 'Gratis' : `$${shippingCost.toLocaleString('es-AR')}`}</span>
                </div>
                <div className="flex justify-between text-3xl pt-4 border-t border-black/10">
                  <span className="uppercase tracking-tighter text-sm self-end pb-1 text-zinc-800">Total</span>
                  <span className="tracking-tighter font-mono text-black">${total.toLocaleString('es-AR')}</span>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-black text-white py-6 text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all active:scale-[0.98] rounded-sm shadow-md"
              >
                Confirmar Pedido (WhatsApp)
              </button>
              
              <div className="space-y-2 text-center text-zinc-400 uppercase tracking-widest text-[8px] font-sans not-italic leading-relaxed">
                <p>Pagos únicamente vía Transferencia Bancaria o Efectivo.</p>
                <p>Al confirmar, se generará el mensaje de pedido estructurado para enviarlo al instante por chat.</p>
              </div>
            </form>
          </div>

        </div>
      ) : (
        // VISTA DE CARRITO VACÍO
        <div className="py-40 text-center space-y-10 border border-dashed border-black/10 rounded-sm bg-zinc-50/50">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-400 font-bold block animate-pulse">
              Carrito_Vacío // Sin prendas seleccionadas
            </span>
            <p className="text-4xl md:text-6xl uppercase tracking-tighter text-zinc-300 font-black italic">
              Tu Carrito está vacío
            </p>
          </div>
          <Link 
            href="/tienda" 
            className="inline-block bg-black text-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.4em] hover:bg-zinc-800 transition-all duration-500 rounded-sm shadow-sm"
          >
            Explorar Catálogo [ Volver ]
          </Link>
        </div>
      )}
    </main>
  );
}