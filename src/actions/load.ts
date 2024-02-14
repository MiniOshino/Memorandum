"use server";
export async function load(id: number) {
  const scenes = [
    {
      scene_id: 0,
      name: "Chapter One",
      characters: ["Roy", "Nora"],
      backgrounds: ["Tavern"],
      dialog: [
        {
          textBox: { name: "Roy", text: "hi" },
          sprites: { right: "roy_normal" },
        },
        {
          textBox: { name: "Nora", text: "hi" },
          sprites: { left: "nora_normal" },
        },
        { textBox: { name: "Roy", text: "bye" }, sprites: { right: null } },
      ],
    },
    {
      scene_id: 1,
      name: "Chapter Two",
      characters: ["Roy", "Nora"],
      backgrounds: ["Tavern"],
      dialog: [
        {
          textBox: { name: "Roy", text: "Hallo" },
          sprites: { right: "roy_normal" },
        },
        {
          textBox: { name: "Nora", text: "Hallo" },
          sprites: { left: "nora_normal" },
        },
        { textBox: { name: "Roy", text: "Tudelue" }, sprites: { right: null } },
      ],
    },
  ];

  return scenes[id];
}
