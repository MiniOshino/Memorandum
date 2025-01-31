"use server";
import lib0 from "@/scenes/Library0.json";

const SCENES = {
  Library0: lib0,
};

export async function load(id: string, sceneID: string) {
  return SCENES[id][sceneID];
}
