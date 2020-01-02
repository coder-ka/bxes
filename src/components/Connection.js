import React from "react";

const horizontal = Symbol("horizontal");
const vertical = Symbol("vertical");

function getConnectorEndpoints({ from, to }) {
  if (
    from.current.position === undefined ||
    to.current.position === undefined
  ) {
    return {
      p1: { x: 0, y: 0, width: 0, height: 0 },
      p4: { x: 0, y: 0, width: 0, height: 0 }
    };
  }

  if (from.current.position.left > to.current.position.right) {
    return {
      p1: {
        x: from.current.position.left,
        y: from.current.position.top + from.current.rect.height / 2,
        width: from.current.rect.width,
        height: from.current.rect.height,
        path: horizontal
      },
      p4: {
        x: to.current.position.right,
        y: to.current.position.top + to.current.rect.height / 2,
        width: to.current.rect.width,
        height: to.current.rect.height,
        path: horizontal
      }
    };
  } else if (from.current.position.right < to.current.position.left) {
    return {
      p1: {
        x: from.current.position.right,
        y: from.current.position.top + from.current.rect.height / 2,
        width: from.current.rect.width,
        height: from.current.rect.height,
        path: horizontal
      },
      p4: {
        x: to.current.position.left,
        y: to.current.position.top + to.current.rect.height / 2,
        width: to.current.rect.width,
        height: to.current.rect.height,
        path: horizontal
      }
    };
  }

  if (from.current.position.bottom > to.current.position.top) {
    return {
      p1: {
        x: from.current.position.left + from.current.rect.width / 2,
        y: from.current.position.top,
        width: from.current.rect.width,
        height: from.current.rect.height,
        path: vertical
      },
      p4: {
        x: to.current.position.left + to.current.rect.width / 2,
        y: to.current.position.bottom,
        width: to.current.rect.width,
        height: to.current.rect.height,
        path: vertical
      }
    };
  } else if (from.current.position.top < to.current.position.bottom) {
    return {
      p1: {
        x: from.current.position.left + from.current.rect.width / 2,
        y: from.current.position.bottom,
        width: from.current.rect.width,
        height: from.current.rect.height,
        path: vertical
      },
      p4: {
        x: to.current.position.left + to.current.rect.width / 2,
        y: to.current.position.top,
        width: to.current.rect.width,
        height: to.current.rect.height,
        path: vertical
      }
    };
  }

  return {
    p1: { x: 0, y: 0, width: 0, height: 0 },
    p4: { x: 0, y: 0, width: 0, height: 0 }
  };
}

function Connection({ from, to, color }) {
  const { p1, p4 } = getConnectorEndpoints({ from, to });

  const p2 =
    p1.path === horizontal
      ? {
          x: (p1.x + p4.x) / 2,
          y: p1.y
        }
      : p1.path === vertical
      ? {
          x: p1.x,
          y: (p1.y + p4.y) / 2
        }
      : p1;

  const p3 =
    p4.path === horizontal
      ? {
          x: (p4.x + p1.x) / 2,
          y: p4.y
        }
      : p4.path === vertical
      ? {
          x: p4.x,
          y: (p4.y + p1.y) / 2
        }
      : p4;

  return [
    // cocnnector
    <svg
      key="connector"
      version="1.1"
      baseProfile="full"
      xmlns="http://www.w3.org/2000/svg"
      width={p4.x > p1.x ? p4.x + p4.width : p1.x + p1.width}
      height={p4.y > p1.y ? p4.y + p4.height : p1.y + p1.height}
    >
      <path
        d={`M${p1.x} ${p1.y} C ${p2.x} ${p2.y} ${p3.x} ${p3.y} ${p4.x} ${p4.y}`}
        fill="transparent"
        stroke={color || "gray"}
      />
    </svg>
  ].concat(
    [p1, p4].map((point, i) => (
      // dots
      <div
        key={i}
        className="absolute rounded-full border border-primary-900 bg-white"
        style={{
          left: point.x - 5,
          top: point.y - 5,
          width: "10px",
          height: "10px"
        }}
      ></div>
    ))
  );
}

export default Connection;
