import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesBar from "@/components/FeaturesBar";
import ServicesSection from "@/components/ServicesSection";
import PartnerStrip from "@/components/PartnerStrip";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-ebg-black min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesBar />
      <ServicesSection />
      <PartnerStrip />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  );
}
