import { useAccordionButton } from "react-bootstrap";
import RotatingToggle from "@/components/animated/RotatingToggle";
import React from "react";

export default function ContextAwareToggle({
  eventKey,
  callback,
  className = "",
}: ContextAwareToggleProps) {
  //const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  // const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <RotatingToggle
      className={className}
      onClick={decoratedOnClick}
    ></RotatingToggle>
  );
}

type ContextAwareToggleProps = {
  eventKey: string;
  callback?: (eventKey: string) => any;
  className?: string;
};
