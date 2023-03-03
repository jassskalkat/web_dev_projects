import React from "react";
import possibilityImage from "../../assets/possibility.png";
import "./possibility.css";

const Possibility = () => (
  <div className="gpt3__possibility section__padding" id="possibility">
    <div className="gpt3__possibility-image">
      <img src={possibilityImage} alt="possibility" />
    </div>
    <div className="gpt3__possibility-content">
      <h1 className="gradient__text">
        The possibilities are <br /> beyond your imagination
      </h1>
      <p>
        GPT-3 represents a significant step forward in the capabilities of
        artificial intelligence, and its potential applications are vast and
        varied. From creating engaging and personalized customer experiences to
        automating complex tasks and processes, the possibilities for GPT-3 are
        limited only by our imagination. With its natural language processing
        capabilities, GPT-3 can generate creative writing, compose music, and
        even create art. It can help to optimize business operations, streamline
        workflows, and improve decision-making. The possibilities for GPT-3 are
        genuinely limitless. As developers and businesses continue to explore
        its capabilities, we can expect to see even more exciting and innovative
        applications.
      </p>
    </div>
  </div>
);

export default Possibility;
