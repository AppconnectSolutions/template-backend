

import React from "react";
import "./whychoose.css"; // <- Add CSS separately

export default function WhyChooseVitalimes() {
  const features = [
    {
      img: "/assets/images/why_1.png",
      label: "Pure & Natural Ingredients",
    },
    {
      img: "/assets/images/why_2.png",
      label: "Chemical-Free Processing",
    },
    {
      img: "/assets/images/why_3.png",
      label: "Cold-Pressed Extraction",
    },
    {
      img: "/assets/images/why_4.png",
      label: "Rich Nutrients & Vitamins",
    },
    {
      img: "/assets/images/why_5.png",
      label: "Farm-Fresh & Locally Sourced",
    },
    {
      img: "/assets/images/why_6.png",
      label: "Sustainable Farming Support",
    },
    {
      img: "/assets/images/why_7.png",
      label: "Trusted by 250+ Farmers",
    },
    {
      img: "/assets/images/why_8.png",
      label: "Quality Tested & Verified",
    },
  ];

  return (
    <section className="why-vitalimes">
      <h2 className="why-title">Why Choose Vitalimes</h2>

      <div className="why-grid">
        {features.map((item, index) => (
          <div className="why-item" key={index}>
            <img src={item.img} alt={item.label} />
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}