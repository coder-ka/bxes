import { useEffect, useRef } from "react";
import EventEmitter from "eventemitter3";

class Box extends EventEmitter {
  constructor({ element, rect }) {
    super();

    this.element = element;
    this.rect = rect;
  }
}

export const BoxEv = Box;

export function useBox() {
  const box = useRef(null);

  box.current = new Box({
    element: null,
    rect: null
  });

  return box;
}

export function useMoveByDrag(box, defaultPosition, boundary, onMove) {
  const bounded = boundary !== null;

  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let currentPosition = defaultPosition;

    function onMousemove(e) {
      const offsetX = e.clientX - startX;
      const offsetY = e.clientY - startY;

      currentPosition = {
        left: defaultPosition.left + offsetX,
        right: defaultPosition.left + offsetX + box.current.rect.width,
        top: defaultPosition.top + offsetY,
        bottom: defaultPosition.top + offsetY + box.current.rect.height
      };

      if (bounded) {
        const boundaryRect = boundary.ref.current.getBoundingClientRect();

        if (currentPosition.left < 0) currentPosition.left = 0;
        if (currentPosition.top < 0) currentPosition.top = 0;
        if (currentPosition.right > boundaryRect.width)
          currentPosition.left = boundaryRect.width - box.current.rect.width;
        if (currentPosition.bottom > boundaryRect.height)
          currentPosition.top = boundaryRect.height - box.current.rect.height;
      }

      onMove(currentPosition);
    }

    function onMouseup() {
      document.removeEventListener("mousemove", onMousemove);
    }

    function onMousedown(e) {
      defaultPosition = currentPosition;
      startX = e.clientX;
      startY = e.clientY;

      document.addEventListener("mousemove", onMousemove);
      document.addEventListener("mouseup", onMouseup);
    }

    box.current.element.addEventListener("mousedown", onMousedown);

    return () => {
      box.current.element.removeEventListener("mousedown", onMousedown);
      box.current.element.removeEventListener("mouseup", onMouseup);
    };
  }, []);
}
