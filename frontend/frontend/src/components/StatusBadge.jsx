import React, { useState, useEffect } from "react";

export default function StatusBadge({ status }) {
  const [dotOn, setDotOn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotOn(prev => !prev);
    }, 1000); 
    return () => clearInterval(interval);
  }, []);

  const getColor = () => {
    switch (status) {
      case "ACTIVE":
        return "green";
      case "IN-ACTIVE":
        return "orange";
      default:
        return "red";
    }
  };

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 10px",
        border: `2px solid ${getColor()}`,
        borderRadius: "12px",
        fontWeight: "bold",
        color: getColor(),
      }}
    >
      <span
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: dotOn ? getColor() : "transparent",
          transition: "background-color 0.3s",
        }}
      ></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
}
