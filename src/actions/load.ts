"use server";
import * as fs from "fs";

export async function load(id: string, sceneID: string) {
  console.log(process.cwd());
  fs.readdirSync(process.cwd()).forEach(file => console.log(file));
  console.log("------------------------------------------");
  fs.readdirSync(process.cwd() + "/src/scenes").forEach(file => console.log(file));

  const file = await fs.readFileSync(`./src/scenes/${id}.json`, "utf-8");
  const data = JSON.parse(file);

console.log(data);
  // const file = await fs.readFile(`../scenes/${id}.JSON`);
  // console.log(file);
  // get scene from file
  // const scenes = [
  //   {
  //     scene_id: 0,
  //     name: "Chapter One",
  //     characters: ["Roy", "Nora"],
  //     backgrounds: ["Tavern"],
  //     dialog: [
  //       {
  //         textBox: { name: "Roy", text: "hi" },
  //         sprites: { right: "roy_normal" },
  //       },
  //       {
  //         textBox: { name: "Nora", text: "hi" },
  //         sprites: { left: "nora_normal" },
  //       },
  //       { textBox: { name: "Roy", text: "bye" }, sprites: { right: null } },
  //     ],
  //   },
  //   {
  //     scene_id: 1,
  //     name: "Chapter Two",
  //     characters: ["Roy", "Nora"],
  //     backgrounds: ["Tavern"],
  //     dialog: [
  //       {
  //         textBox: { name: "Roy", text: "Hallo" },
  //         sprites: { right: "roy_normal" },
  //       },
  //       {
  //         textBox: { name: "Nora", text: "Hallo" },
  //         sprites: { left: "nora_normal" },
  //       },
  //       { textBox: { name: "Roy", text: "Tudelue" }, sprites: { right: null } },
  //     ],
  //   },
  // ];
  // console.log(id);

  return data[sceneID];
}
