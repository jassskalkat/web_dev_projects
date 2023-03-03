import React from "react";
import { nanoid } from "nanoid";

export default function Question({ question, toggleSelect, checkingAnswers }) {
  console.log(question.answerOrder);
  let answers = Array(question.answerOrder.length);

  answers = question.answerOrder.map((answer) => {
    let styles;

    if (checkingAnswers) {
      if (answer.isCorrect) {
        styles = { backgroundColor: "#94D7A2", opacity: "0.75" };
      } else if (answer.selected) {
        styles = { backgroundColor: "#F8BCBC", opacity: "0.75" };
      }
    } else if (answer.selected) {
      styles = { backgroundColor: "#D6DBF5", opacity: "0.75" };
    }

    return (
      <button
        key={nanoid()}
        className="game--answer"
        style={styles}
        onClick={() => toggleSelect(question.question, answer.answer)}
        dangerouslySetInnerHTML={{ __html: answer.answer }}
      ></button>
    );
  });

  return (
    <>
      <div className="game--container">
        <div
          className="game--question"
          dangerouslySetInnerHTML={{ __html: question.question }}
        ></div>
        <div className="game--answers--container">{answers}</div>
      </div>
      <hr />
    </>
  );
}
