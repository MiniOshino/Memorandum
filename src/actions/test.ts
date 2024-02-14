"use server";
export default async function test(x: number) {
  console.log("I run only on the server.", x);
}
