import React from "react";
import ContextAwareToggle from "@/components/accordion/Headers/ContextAwareToggle";
import { useAccordionButton } from "react-bootstrap";
import { css } from "@emotion/react";

export default function HeaderClickable(props: HeaderWithButtonProps) {
  const { eventKey, header, callback } = props;
  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  return (
    <button
      className={"h-100 w-100"}
      css={css`
        all: unset;
      `}
      onClick={decoratedOnClick}
    >
      {header}
    </button>
  );
}

type HeaderWithButtonProps = {
  callback?: (eventKey: string) => any;
  header: React.ReactNode;
  eventKey: string;
};
