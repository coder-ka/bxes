import React, { useEffect, useState } from "react";

import Connection from "./Connection";

function Connector({ from, to, children }) {
  const [points, setPoints] = useState({ from, to });

  function onMove() {
    setPoints({ from, to });
  }

  useEffect(() => {
    from.current.on("move", onMove);
    to.current.on("move", onMove);

    from.current.emit("move");

    return () => {
      from.current.removeListener("move", onMove);
      to.current.removeListener("move", onMove);
    };
  }, []);

  return children ? children(points) : Connection(points);
}

export default Connector;
