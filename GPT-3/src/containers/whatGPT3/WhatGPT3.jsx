import React from "react";
import Feature from "../../components/feature/Feature";
import "./whatGPT3.css";

const WhatGPT3 = () => (
  <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
    <div className="gpt3__whatgpt3-feature">
      <Feature
        title="What is GPT-3?"
        text="GPT-3, or Generative Pre-trained Transformer 3, is a state-of-the-art language processing model developed by OpenAI. It's the third iteration of the GPT series and represents a significant advancement in natural language processing. GPT-3 is trained on massive text data and uses deep neural networks to generate human-like language. This technology can potentially revolutionize many industries, from customer service to content creation. With GPT-3, machines can now generate written content that is difficult to distinguish from that of a human writer. Its impressive capabilities have garnered attention from developers and businesses worldwide."
      />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">
        The possibilities are beyond your imagination
      </h1>
      <p>Explore the Library</p>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature
        title="Chatbots"
        text="By leveraging GPT-3's natural language processing capabilities, chatbots can understand and respond to user inputs in a more conversational and less robotic way. GPT-3 can also generate text that is difficult to distinguish from that of a human, allowing for more seamless interactions between users and chatbots. "
      />
      <Feature
        title="Knowledgebase"
        text="With its natural language processing capabilities, GPT-3 understands and responds to queries in a more human-like way, making it easier to find the information needed. Knowledgebase systems powered by GPT-3 can also generate text, allowing for a more seamless and engaging user experience. "
      />
      <Feature
        title="Education"
        text="With its natural language processing capabilities, GPT-3 can generate text that is difficult to distinguish from that of a human, allowing for more engaging and interactive learning experiences. GPT-3 can also automate many tasks, such as grading assignments and providing feedback to students. "
      />
    </div>
  </div>
);

export default WhatGPT3;
