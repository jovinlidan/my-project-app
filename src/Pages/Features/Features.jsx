import React, { useEffect } from "react";
import calculatorImg from "../../assets/images/calculator.png";
import tictactoeImg from "../../assets/images/tictactoe.png";
import weatherImg from "../../assets/images/weather.png";
import chatroomImg from "../../assets/images/chat.png";
import Card from "./../../components/Card";
import "./Features.css";
const Features = ({ location }) => {
  const features = [
    { src: calculatorImg, name: "Calculator" },
    { src: tictactoeImg, name: "Tictactoe" },
    { src: weatherImg, name: "Weather" },
    { src: chatroomImg, name: "Chatroom" },
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
