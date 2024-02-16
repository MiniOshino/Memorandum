"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import { load } from "./actions/load";
import Image from "next/image";

const SpriteBox = ({ sprites }) => {
  return (
    <div>
      {sprites?.right && (
        <Image
          src={`/public/asset/chars/${sprites.right}.png`}
          alt={sprites.right}
        />
      )}
    </div>
  );
};
const TextBox = ({ name, text }) => {
  return (
    <div className="border-4">
      <h3>{name}</h3>
      <p>{text}</p>
    </div>
  );
};

export const Scene = ({ initial_content }) => {
  const [scene, setContent] = useState(initial_content);
  const [frame, setFrame] = useState(0);
  // console.log(scene.frames[frame]?.te)

  return (
    <div>
      {scene.frames[frame]?.textBox && (
        <TextBox
          name={scene.frames[frame]?.textBox.name}
          text={scene.frames[frame]?.textBox.text}
        ></TextBox>
      )}
      <button
        onClick={async () => {
          if (frame >= scene.frames.length - 1) {
            console.log("get next scene");
            // if (content.next.type === "fixed") {
            setContent(await load(scene.scene_id + 1));
            setFrame(0);
            // } else {
            // }
          } else {
            setFrame(frame + 1);
          }
        }}
      >
        next
      </button>
    </div>
  );
};

export default Scene;
