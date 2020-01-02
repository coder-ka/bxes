import React, { useState, useEffect, useRef, useContext } from "react";
import { useMoveByDrag, useBox, BoxEv } from "../hooks";

import { BoundaryContext } from "./Boundary";

function Box({ box, onMove, defaultPosition, style, className, zIndex }) {
  const [position, setPosition] = useState(
    defaultPosition || {
      left: 0,
      top: 0
    }
  );

  const ref = useRef(null);
  box = box || useRef(new BoxEv({ element: null, rect: null, position: null }));

  const boundary = useContext(BoundaryContext);
  const bounded = boundary !== null;

  useEffect(() => {
    const element = ref.current;
    box.current.element = element;
    const rect = ref.current.getBoundingClientRect();
    box.current.rect = rect;
    box.current.position = {
      ...defaultPosition,
      right: defaultPosition.left + rect.width,
      bottom: defaultPosition.top + rect.height
    };
  }, []);

  useMoveByDrag(box, position, boundary, position => {
    onMove &&
      onMove({
        element: ref.current,
        position
      });

    box.current.position = position;
    box.current.emit("move");

    setPosition(position);
  });

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: position.left + "px",
        top: position.top + "px",
        zIndex,
        ...style
      }}
      className={className}
    ></div>
  );
}

export default Box;
