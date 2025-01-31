"use server";
import start from "@/scenes/start.json";
import lib0 from "@/scenes/Library0.json";

const SCENES = {
  start: start,
  Library0: lib0,
};

export async function load(id: string, sceneID: string) {
  return SCENES[id][sceneID];
}
