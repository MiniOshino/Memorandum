import Scene from "@/Scene";
import { load } from "@/actions/load";
import ClientTest from "@/components/ClientTest";
import React, { useRef } from 'react';
// const content = {
//   scene_id: 0,
//   name: "Chapter One",
//   characters: ["Roy", "Nora"],
//   backgrounds: ["Tavern"],
//   dialog: [
//     { textBox: { name: "Roy", text: "hi" }, sprites: { right: "roy_normal" } },
//     { noText: true, textBox: {}, sprites: { right: "roy_normal" } },
//     { textBox: { name: "Nora", text: "hi" }, sprites: { left: "nora_normal" } },
//     { textBox: { name: "Roy", text: "bye" }, sprites: { right: null } },
//   ],
//   possibleNextScene: [1],
//   next: { type: "fixed", target: 2 },
//   next2: {
//     type: "picked",
//     question: "What day is it?",
//     target: { Sunday: 3, Monday: 2 },
//   },
// };

async function test() {
  "use server";
  console.log("I run only on the server.");
}



export default async function Home() {
  //const defaultScene = await load("Library0", "Begining");
  //const defaultScene = await load("test", "test");
  const defaultScene = await load("Chapter1", "Chapter1");
  
  //console.log("Load:", defaultScene);
  return (
    <main className=" overflow-hidden overflow-x-hidden overflow-y-hidden overscroll-none">
      <Scene initial_content={defaultScene}></Scene>
    </main>
  );
}
/*

      <ClientTest />
      <form action={test}>
        <button>hi</button>
      </form>

      flex min-h-screen flex-col items-center justify-between p-24
*/