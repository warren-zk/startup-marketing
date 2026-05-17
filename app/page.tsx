import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import HeroSection from "@/components/home/HeroSection"
import FeaturesSection from "@/components/home/FeaturesSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import PricingSection from "@/components/home/PricingSection"
import FAQSection from "@/components/home/FAQSection"
import CTABannerSection from "@/components/home/CTABannerSection"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTABannerSection />
      </main>
      <Footer />
    </div>
  )
}
