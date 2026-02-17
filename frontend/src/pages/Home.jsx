import React from "react";
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import WhyChooseUs from "../components/WhyChooseUs";
import CTASection from "../components/CTASection";
import { usePropertiesContext } from "@/context/PropertiesContext";

export default function Home() {
  const { properties } = usePropertiesContext();

  return (
    <div>
      <Hero />

      {/* You can later pass properties dynamically */}
      <FeaturedProperties properties={properties} />

      <WhyChooseUs />
      <CTASection />
    </div>
  );
}
