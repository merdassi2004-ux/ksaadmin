import HeroSection from "@/components/HeroSection";
import AmbianceSection from "@/components/AmbianceSection";
import MenuSection from "@/components/MenuSection";
import GallerySection from "@/components/GallerySection";
import WhatsAppReservation from "@/components/WhatsAppReservation";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <HeroSection />
      <AmbianceSection />
      <MenuSection />
      <GallerySection />
      <WhatsAppReservation />
      <ContactSection />
    </main>
  );
}
