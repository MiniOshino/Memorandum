import Scene from "@/Scene";
import { load } from "@/actions/load";
import ClientTest from "@/components/ClientTest";

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
  const defaultScene = await load(0);
  console.log("Load:", defaultScene);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p></p>
      <Scene initial_content={defaultScene}></Scene>
      <ClientTest />
      <form action={test}>
        <button>hi</button>
      </form>
    </main>
  );
}
