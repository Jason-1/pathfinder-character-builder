import React from "react";
import { Canvas } from "@react-three/fiber";
import Dice from "./Dice";

const DiceTray = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Dice />
    </Canvas>
  );
};

export default DiceTray;
