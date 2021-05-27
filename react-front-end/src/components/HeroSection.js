import React from "react";
import "../App.css";
import { Button } from "./show/Button";
import "./HeroSection.css";


function HeroSection() {
  return (
    <div className="hero-container">
      <video
        id="herovideo"
        data-cy="herovideo"
        src="/videos/go-the-distance.mp4"
        autoPlay
        loop
        muted
      />
      <h1>Workout From Home</h1>
      <p>NEW DAY - NEW YOU</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          to="/musclegroups"
        >
          GET STARTED
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          TUTORIAL <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
