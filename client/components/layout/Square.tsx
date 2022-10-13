import React, {useRef, useEffect} from 'react';

//TODO: Add Icon Sizing
//TODO: Rewrite to use the size of the biggest child
export default function Square({children}: RatioProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  React.useEffect(() => {
    function handleResize() {
      if (!(parentRef.current && targetRef.current)) return;
      setDimensions({
        height: parentRef.current.offsetHeight,
        width: parentRef.current.offsetWidth,
      });
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  function setSquareSize() {
    if (!parentRef.current || !targetRef.current) return;

    const currSize = {
      width: parentRef.current.offsetWidth,
      height: parentRef.current.offsetHeight,
    };

    const newSize = Math.min(currSize.width, currSize.height);

    if (
      newSize == targetRef.current.offsetWidth &&
      newSize == targetRef.current.offsetHeight
    )
      return;

    console.log(newSize);
    targetRef.current.style.width = `${newSize}px`;
    targetRef.current.style.height = `${newSize}px`;
    setDimensions({
      width: newSize,
      height: newSize,
    });
  }

  useEffect(() => setSquareSize(), [dimensions]);

  return (
    <div
      className={'flex items-center justify-center h-full w-full'}
      ref={parentRef}>
      <div ref={targetRef}>{children}</div>
    </div>
  );
}

type RatioProps = {
  children: React.ReactNode;
};
