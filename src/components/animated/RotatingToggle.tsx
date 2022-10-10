import Square from "@/components/layout/Square";
import { css } from "@emotion/react";
import cx from "classnames";
import ctx from "classnames";
import React, {
  ButtonHTMLAttributes,
  useRef,
  useState,
  MouseEvent,
} from "react";
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";
import { useSpring, animated } from "react-spring";

//TODO: Add Icon Sizing
export default function RotatingToggle(props: RotatingToggleProps) {
  const {
    initialState = false,
    callback,
    buttonColorOff = "#FFFFFF",
    buttonColorOn = "#4A3AFF",
    iconColorOff = "#4A3AFF",
    iconColorOn = "#FFFFFF",
    degreesOn = 0,
    degreesOff = 90,
    className,
    onClick,
    ...atr
  } = props;

  const [on, setOpen] = useState(initialState);
  const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
    setOpen(!on);
    onClick && onClick(e);
    callback && callback(on);
  };

  const buttonAnimation = useSpring({
    from: {
      transform: on ? `rotate(${degreesOff}deg)` : `rotate(${degreesOn}deg)`,
      backgroundColor: on ? buttonColorOff : buttonColorOn,
    },
    to: {
      transform: on ? `rotate(${degreesOn}deg)` : `rotate(${degreesOff}deg)`,
      backgroundColor: on ? buttonColorOn : buttonColorOff,
    },
  });

  const iconAnimation = useSpring({
    from: {
      color: on ? iconColorOff : iconColorOn,
    },
    to: {
      color: on ? iconColorOn : iconColorOff,
    },
    delay: 143,
  });

  return (
    <Square>
      <animated.button
        className={cx(
          "btn rounded-circle p-0 m-0 h-100 w-100 d-flex",
          className
        )}
        style={{ overflow: "clip", ...buttonAnimation }}
        onClick={handleToggle}
        {...atr}
      >
        <animated.div
          className={
            "overflow-hidden d-flex justify-content-center align-items-center h-100 w-100"
          }
          style={{ ...iconAnimation }}
        >
          <VscChevronDown></VscChevronDown>
        </animated.div>
      </animated.button>
    </Square>
  );
}

type RotatingToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  callback?: (parameter: boolean) => any;
  initialState?: boolean;
  buttonColorOff?: string;
  buttonColorOn?: string;
  iconColorOff?: string;
  iconColorOn?: string;
  degreesOn?: number;
  degreesOff?: number;
};
