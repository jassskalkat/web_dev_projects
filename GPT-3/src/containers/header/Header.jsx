import React from "react";
import people from "../../assets/people.png";
import ai from "../../assets/ai.png";
import "./header.css";

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">
        Let&apos;s Build Something amazing with GPT-3 Open AI
      </h1>
      <p>
        GPT-3 is a game-changing technology that has revolutionized our
        interactions with machines. With its ability to generate human-like
        language, GPT-3 has opened up a world of possibilities for developers
        and businesses. From chatbots to content creation, GPT-3 has the
        potential to streamline and automate many aspects of our daily lives.
        And with the OpenAI API, it's now easier than ever to integrate GPT-3
        into your projects and build something unique.
      </p>

      <div className="gpt3__header-content__input">
        <input type="email" placeholder="Your Email Address" />
        <button type="button">Get Started</button>
      </div>

      <div className="gpt3__header-content__people">
        <img src={people} />
        <p>1,600 people requested access a visit in last 24 hours</p>
      </div>
    </div>

    <div className="gpt3__header-image">
      <img src={ai} />
    </div>
  </div>
);

export default Header;
