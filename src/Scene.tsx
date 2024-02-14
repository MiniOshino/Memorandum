"use client";
import React, { use, useEffect, useState } from "react";

export function SceneLoader({ load }) {
  const [scene, setScene] = useState(0);

  console.log(load(0));

  return (
    <>
      <Scene content={() => load(scene)} next={(id) => setScene(id)}></Scene>
    </>
  );
}

const TextBox = ({ name, text }) => {
  return (
    <div className="border-4">
      <h3>{name}</h3>
      <p>{text}</p>
    </div>
  );
};

const Scene = ({ content, next }) => {
  const dialog = content.dialog || [];
  const [currentScene, setScene] = useState(0);

  console.log(content);
  // detect mouse click or spacebar

  return (
    <div>
      <TextBox
        name={dialog[currentScene]?.textBox.name}
        text={dialog[currentScene]?.textBox.text}
      ></TextBox>
      <button
        onClick={() => {
          if (currentScene > dialog.length) {
            next();
          } else {
            setScene(currentScene + 1);
          }
        }}
      >
        next
      </button>
    </div>
  );
};

export default Scene;
