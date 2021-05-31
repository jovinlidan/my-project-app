import React, { useEffect } from "react";
import calculatorImg from "../../assets/images/calculator.png";
import tictactoeImg from "../../assets/images/tictactoe.png";
import Card from "./../../components/Card";
import "./Features.css";
const Features = ({ location }) => {
  const features = [
    { src: calculatorImg, name: "CALCULATOR" },
    { src: tictactoeImg, name: "TICTACTOE" },
    { src: calculatorImg, name: "WEATHER" },
  ];
  useEffect(() => {
    setOverflow(); // MEMPERBAIKI MASALAH DRAG AND DROP
  }, []);
  const setOverflow = () => {
    document.body.style.overflow = "auto";
  };
  return (
    <div className="features">
      <div className="tag-wrapper">
        <p className="tag">ALL FEATURES</p>
      </div>
      <section className="cards-wrapper">
        {features.map(({ src, name }) => (
          <Card src={src} name={name} location={location} key={name} />
        ))}
      </section>
    </div>
  );
};

export default Features;
