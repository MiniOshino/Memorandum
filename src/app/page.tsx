import Scene, { SceneLoader } from "@/Scene";
import { load } from "@/actions/load";
import { fstat } from "fs";
import Image from "next/image";
import ClientTest from "@/components/ClientTest";

async function test() {
  "use server";
  console.log("I run only on the server.");
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <SceneLoader load={load}></SceneLoader> */}
      <ClientTest />
      <form action={test}>
        <button>hi</button>
      </form>
    </main>
  );
}
