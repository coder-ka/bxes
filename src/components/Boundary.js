import React, { useRef, useEffect } from "react";

export const BoundaryContext = React.createContext(null);

function Boundary({ children, style, className }) {
  const ref = useRef(null);

  return (
    <BoundaryContext.Provider
      value={{
        ref
      }}
    >
      <div
        ref={ref}
        style={{
          position: "relative",
          ...style
        }}
        className={className}
      >
        {children}
      </div>
    </BoundaryContext.Provider>
  );
}

export default Boundary;
