import { css } from "@emotion/react";
import cx from "classnames";
import {
  Accordion as ReactAccordion,
  AccordionProps as ReactAccordionProps,
} from "react-bootstrap";

import React, { HTMLAttributes } from "react";

export default function Accordion({
  children,
  defaultActiveKey,
  ...atr
}: AccordionProps) {
  const roundChildrenStyle = css`
    &:not(.border-0) {
      & > :only-child {
        border-radius: 0.375rem;
      }

      & > :first-child:not(:only-child) {
        border-radius: 0.4rem 0.4rem 0px 0px;
      }

      & > :not(:first-child):not(:last-child) {
        border-radius: 0px 0px 0px 0px;
      }

      & > :not(:only-child):last-child {
        border-radius: 0px 0px 0.4rem 0.4rem;
      }
    }

    &.border-0 {
      & > * {
        border-radius: 0px 0px 0px 0px;
      }
    }
  `;

  return (
    <>
      <ReactAccordion
        defaultActiveKey={defaultActiveKey}
        css={roundChildrenStyle}
        {...atr}
      >
        {children}
      </ReactAccordion>
    </>
  );
}

type AccordionProps = ReactAccordionProps & {
  children: React.ReactNode;
  defaultActiveKey?: string;
};
