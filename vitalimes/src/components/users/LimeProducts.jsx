import React from "react";

export default function LimeProducts() {
  const limeCategories = [
    { icon: "🍋", label: "Lemon Powder" },
    { icon: "🧴", label: "Lime Oil" },
    { icon: "🥥", label: "Dry Lemon" },
    { icon: "🌿", label: "Lime Extract" },
    { icon: "🍬", label: "Lime Candy" },
    { icon: "✨", label: "Lime Zest" },
    { icon: "🥫", label: "Lime Pickle" },
    { icon: "🥤", label: "Juice Concentrate" },
  ];

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "30px 10px",
    gap: "40px",
    textAlign: "center",
  };

  const itemStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    transition: "0.3s",
  };

  const iconStyle = {
    fontSize: "38px",
    marginBottom: "10px",
    color: "black",
  };

  const textStyle = {
    marginTop: "6px",
    fontSize: "14px",
    color: "#333",
    fontWeight: "500",
  };

  return (
    <div style={containerStyle}>
      {limeCategories.map((item, index) => (
        <div
          key={index}
          style={itemStyle}
          onMouseEnter={(e) => {
            e.currentTarget.querySelector("p").style.color = "#a1c900";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelector("p").style.color = "#333";
          }}
        >
          <div style={iconStyle}>{item.icon}</div>
          <p style={{ ...textStyle }}>{item.label}</p>
        </div>
      ))}
    </div>
  );
}
