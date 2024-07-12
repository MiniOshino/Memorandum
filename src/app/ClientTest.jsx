"use client";

import test from "@/actions/test";
import { useState } from "react";

function ClientTest() {
  const [num, setNum] = useState(0);

  const handleClick = () => {
    setNum((prev) => prev + 1);
    console.log(num);
  };

  return (
    <div>
      <p>client test</p>
      <button onClick={() => test(num)}>click</button>
      <br />
      <button onClick={handleClick}>inc</button>
      <p>end client</p>
    </div>
  );
}

export default ClientTest;
