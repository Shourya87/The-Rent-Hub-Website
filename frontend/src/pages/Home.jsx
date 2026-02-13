import React from "react";
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import WhyChooseUs from "../components/WhyChooseUs";
import CTASection from "../components/CTASection";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProperties />
      <WhyChooseUs />
      <CTASection />
    </div>
  );
}
