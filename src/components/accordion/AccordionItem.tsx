import { css } from "@emotion/react";
import cx from "classnames";
import td from "./accordion.css";

import React, { ButtonHTMLAttributes, HTMLAttributes, useContext } from "react";
import RotatingToggle from "@/components/animated/RotatingToggle";

import { AccordionContext, Card, useAccordionButton } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import HeaderWithButton from "@/components/accordion/Headers/HeaderWithButton";
import HeaderClickable from "@/components/accordion/Headers/HeaderClickable";

export default function AccordionItem(props: AccordionItemProps) {
  const {
    children,
    header,
    headerStyle = "withButton",
    eventKey,
    className = "",
    ...atr
  } = props;

  const getHeader = () => {
    switch (headerStyle) {
      case "withButton":
        return <HeaderWithButton header={header} eventKey={eventKey} />;
      case "clickable":
        return <HeaderClickable header={header} eventKey={eventKey} />;
      default:
        return header;
    }
  };

  return (
    <Card
      className={cx("td-accordion-item bg-dark text-light", className)}
      {...atr}
    >
      <Card.Header>{getHeader()}</Card.Header>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body>{children}</Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  headerStyle?: "withButton" | "clickable" | "custom";
  header: React.ReactNode;
  children: React.ReactNode;
  callback?: (eventKey: string) => void;
  eventKey: string;
};
