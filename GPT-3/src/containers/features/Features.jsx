import React from "react";
import Feature from "../../components/feature/Feature";
import "./features.css";

const featuresData = [
  {
    title: "Natural Language Generation",
    text: "GPT-3 can generate human-like text based on a given prompt, making it useful for tasks such as content creation and automated writing.",
  },
  {
    title: "Language Translation",
    text: "GPT-3 can translate text from one language to another with high accuracy, enabling more seamless communication across languages.",
  },
  {
    title: "Question Answering",
    text: "GPT-3 can answer questions based on the information provided in a given context, making it useful for tasks such as customer support and education.",
  },
  {
    title: "Chatbot Creation",
    text: "GPT-3 can be used to create chatbots that can interact with users in a more natural and conversational way, making them useful for tasks such as customer service and sales.",
  },
];

const Features = () => (
  <div className="gpt3__features section__padding" id="features">
    <div className="gpt3__features-heading">
      <h1 className="gradient__text">
        The Future is Now and You Just Need to Realize It. Step into Future
        Today. & Make it Happen.
      </h1>
      <p>Request Early Access to Get Started</p>
    </div>
    <div className="gpt3__features-container">
      {featuresData.map((item, index) => (
        <Feature title={item.title} text={item.text} key={item.title + index} />
      ))}
    </div>
  </div>
);

export default Features;
