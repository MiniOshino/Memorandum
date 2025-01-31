"use server";
import * as fs from "fs";

export async function load(id: string, sceneID: string) {

  const file = await fs.readFileSync(`./src/scenes/${id}.json`, "utf-8");
  const data = JSON.parse(file);

  return data[sceneID];
}
