"use server";
import start from "@/scenes/start.json";
import lib0 from "@/scenes/Library0.json";
import chapter0 from "@/scenes/Chapter0.json";
import chapter1 from "@/scenes/Chapter1.json";
import chapter2 from "@/scenes/Chapter2.json";
import chapter3 from "@/scenes/Chapter3.json";
import chapter4 from "@/scenes/Chapter4.json";
import chapter5 from "@/scenes/Chapter5.json";
import CrystalLog from "@/scenes/CrystalLog.json";
import Dream from "@/scenes/Dream.json";
import Extra from "@/scenes/Extra.json";
import Fights from "@/scenes/Fights.json";
import Ha117L  from "@/scenes/Ha117L.json";
import NexusCore from "@/scenes/NexusCore.json";
import ReadingChambers from "@/scenes/ReadingChambers.json";
import shorts from "@/scenes/shorts.json";
import Transmitter from "@/scenes/Transmitter.json";


const SCENES = {
  start: start,
  Library0: lib0,
  Chapter0: chapter0,
  Chapter1: chapter1,
  Chapter2: chapter2,
  Chapter3: chapter3,
  Chapter4: chapter4,
  Chapter5: chapter5,
  CrystalLog: CrystalLog,
  Dream: Dream,
  Extra: Extra,
  Fights: Fights,
  Ha117L: Ha117L,
  NexusCore: NexusCore,
  ReadingChambers: ReadingChambers,
  shorts: shorts,
  Transmitter: Transmitter
};

export async function load(id: string, sceneID: string) {
  return SCENES[id][sceneID];
}
