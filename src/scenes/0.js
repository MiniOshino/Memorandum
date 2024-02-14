
const test = {
  scene_id: 0,
  name: "Chapter One",
  characters: ["Roy", "Nora"],
  backgrounds: ["Tavern"],
  dialog: [
    { textBox: { name: "Roy", text: "hi" }, sprites: { right: "roy_normal" } },
    { textBox: { name: "Nora", text: "hi" }, sprites: { left: "nora_normal" } },
    { textBox: { name: "Roy", text: "bye" }, sprites: { right: null } },
  ]
}

const test2 = {
  scene_id: 'scene_1',
  name: "Chapter One",
  characters: ["Roy", "Nora"],
  backgrounds: ["Tavern"],
  continueation: [1, 2, 3],

  dialog: [
    { textBox: { name: "Roy", text: "hi" }, sprites: { right: "roy_normal" } },
    { textBox: { name: "Nora", text: "hi" }, sprites: { left: "nora_normal" } },
    { textBox: { name: "Roy", text: "bye" }, sprites: { right: null } },
  ]
}