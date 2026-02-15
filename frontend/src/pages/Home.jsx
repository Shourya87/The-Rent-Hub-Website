import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import FeaturedProperties from "../components/FeaturedProperties";
import WhyChooseUs from "../components/WhyChooseUs";
import CTASection from "../components/CTASection";

import { getProperties } from "../services/propertyService";

export default function Home() {

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const { data, error } = await getProperties();

      if (error) {
        console.error("❌ Error fetching properties:", error);
      } else {
        console.log("✅ Properties fetched:", data);
        setProperties(data);
      }
    };

    fetchProperties();
  }, []);

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
