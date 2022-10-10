import React, { useRef, useLayoutEffect, useState } from "react";

//TODO: Rewrite to use the size of the biggest child
export default function Square({ children }: RatioProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (targetRef.current) {
      const currSize = {
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      };
      const newSize = Math.min(currSize.width, currSize.height);

      targetRef.current.style.width = `${newSize}px`;
      targetRef.current.style.height = `${newSize}px`;
      setDimensions({
        width: newSize,
        height: newSize,
      });
    }
  }, []);

  return <div ref={targetRef}>{children}</div>;
}

type RatioProps = {
  children: React.ReactNode;
};
