import React from "react";
import ContextAwareToggle from "@/components/accordion/Headers/ContextAwareToggle";
import { useAccordionButton } from "react-bootstrap";

export default function HeaderWithButton(props: HeaderWithButtonProps) {
  const { eventKey, header } = props;

  return (
    <div className={"container-fluid h-100 w-100 px-2"}>
      <div className={"row h-100 align-items-center"}>
        <div className={"col-10 d-flex align-items-center h-100 align-middle"}>
          {header}
        </div>
        <div
          className={"col-2 d-flex justify-content-end align-items-center"}
          // css={css`
          //   font-size: 15rem;
          // `}
          //Square to be rewritten
        >
          <ContextAwareToggle
            eventKey={eventKey}
            className={""}
          ></ContextAwareToggle>
        </div>
      </div>
    </div>
  );
}

type HeaderWithButtonProps = {
  header: React.ReactNode;
  eventKey: string;
};
