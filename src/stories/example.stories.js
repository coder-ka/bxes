import React, { useState, useRef } from "react";
import Boundary from "../components/Boundary";
import Box from "../components/Box";
import Connector from "../components/Connector";
import { useBox } from "../hooks";

import "../../.storybook/css/tailwind.css";
import Connection from "../components/Connection";

export default { title: "Box Usecases" };

// 箱は、DnDで動かすことができる
export const boxCanBeMoved = () => {
  return (
    <Box
      className="shadow border border-primary-400 w-10 h-10"
      defaultPosition={{
        left: 100,
        top: 100
      }}
      onMove={console.log}
    ></Box>
  );
};

// 箱は、境界の外には出られないようにできる
export const boxCanBeWithBoundary = () => {
  return (
    <Boundary className="shadow border border-accent-400 w-64 h-64 m-10">
      <Box
        className="shadow border border-primary-400 w-10 h-10"
        defaultPosition={{
          left: 10,
          top: 10
        }}
        onMove={console.log}
      ></Box>
    </Boundary>
  );
};

// 箱同士をつなげることができる
export const boxesCanBeConnected = () => {
  const box1 = useBox();
  const box2 = useBox();

  return (
    <>
      <Box
        box={box1}
        className="shadow border border-primary-400 w-10 h-10 rounded-full"
        defaultPosition={{
          left: 10,
          top: 10
        }}
      ></Box>
      <Box
        box={box2}
        className="shadow border border-primary-400 w-10 h-10 rounded-full"
        defaultPosition={{
          left: 80,
          top: 80
        }}
      ></Box>
      <Connector from={box1} to={box2}></Connector>
    </>
  );
};

// コネクターは関数でもよい
export const connectionCanBeFunction = () => {
  const box1 = useBox();
  const box2 = useBox();

  return (
    <>
      <Box
        box={box1}
        className="shadow border border-primary-400 w-10 h-10"
        defaultPosition={{
          left: 10,
          top: 10
        }}
      ></Box>
      <Box
        box={box2}
        className="shadow border border-primary-400 w-10 h-10"
        defaultPosition={{
          left: 80,
          top: 80
        }}
      ></Box>
      <Connector from={box1} to={box2}>
        {({ from, to }) => {
          console.log(from, to);

          return Connection({ from, to });
        }}
      </Connector>
    </>
  );
};
