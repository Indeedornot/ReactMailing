import { css } from "@emotion/react";
import React, { HTMLAttributes } from "react";
import { useSpring, animated, config } from "react-spring";
import { ButtonProps } from "react-bootstrap";

//TODO write implementation for from x to y
export default function RotatingIcon({
  from,
  to,
  alternate = true,
  time,
  children,
  ...props
}: RotatingIconProps) {
  const rotationStyle = css`
    @keyframes rotating {
      from {
        transform: rotate(${from}deg);
      }
      to {
        transform: rotate(${to}deg);
      }
    }

    & > :only-child {
      animation: rotating ${time}s linear infinite;
      animation-direction: ${alternate ? "alternate" : "normal"};
    }
  `;
  return (
    <animated.div css={rotationStyle} {...props}>
      {children}
    </animated.div>
  );
}

type RotatingIconProps = HTMLAttributes<HTMLDivElement> & {
  from: number;
  to: number;
  children: React.ReactElement;
  time: number;
  alternate?: boolean;
};
