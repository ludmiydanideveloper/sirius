import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import AnnouncementBar from '@/components/AnnouncementBar';
import NewsletterModal from '@/components/NewsletterModal';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sirius Studio // Tienda Oficial",
  description: "Tienda online premium de Sirius Studio. Indumentaria urbana de alta calidad diseñada y construida para resistir.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* CINTA DE ANUNCIOS SUPERIOR */}
        <AnnouncementBar />

        {/* BARRA DE NAVEGACIÓN GLOBAL */}
        <Navbar />

        {/* CARRITO LATERAL GLOBAL */}
        <CartDrawer />

        {/* MODAL DE BIENVENIDA (10% OFF) */}
        <NewsletterModal />

        {/* PÁGINAS ACTIVAS */}
        {children}

        {/* PIE DE PÁGINA GLOBAL CON REDES SOCIALES */}
        <Footer />

      </body>
    </html>
  );
}
