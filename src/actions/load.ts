"use server";
import * as fs from "fs";

export async function load(id: string, sceneID: string) {
  console.log(process.cwd());
  fs.readdirSync(process.cwd()).forEach(file => console.log(file));
  console.log("------------------------------------------");
  fs.readdirSync(process.cwd() + "/src/scenes").forEach(file => console.log(file));

  const file = await fs.readFileSync(`./src/scenes/${id}.json`, "utf-8");
  const data = JSON.parse(file);
  
  if (data?.frames){

  
            const images = new Set();
            for(const f of data.frames){
              console.log(f);
              if (f.sprites){
              if (f.sprites.rrright) images.add(f.sprites.rrright + ".png")
              if (f.sprites.sright) images.add(f.sprites.sright + ".png")
              if (f.sprites.rright) images.add(f.sprites.rright + ".png")
              if (f.sprites.right) images.add(f.sprites.right + ".png")
              if (f.sprites.center) images.add(f.sprites.center + ".png")
              if (f.sprites.left) images.add(f.sprites.left + ".png")
              if (f.sprites.lleft) images.add(f.sprites.lleft + ".png")
              if (f.sprites.sleft) images.add(f.sprites.sleft + ".png")
              if (f.sprites.llleft) images.add(f.sprites.llleft + ".png")
              if (f.sprites.down) images.add(f.sprites.down + ".png") 
              }
            
            if (f.background?.bg) images.add("BG" + f.background.bg + ".png")
            if (f.background?.effect) images.add(f.background.effect + ".gif")
            if (f.items?.item) images.add("Item" + f.items.item + ".png")
            }
            console.log('IMAGES HERE');
            console.log(images);
            images.forEach((img) => {
              fetch(`https://beans.images.ni-verse.com/${img}`, {mode: "no-cors"});
            });
          }
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
