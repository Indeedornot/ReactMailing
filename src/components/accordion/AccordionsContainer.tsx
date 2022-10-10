import { css } from "@emotion/react";
import React, { HTMLAttributes } from "react";

export default function AccordionsContainer({
  children,
  ...atr
}: AccordionsContainerProps) {
  //go through every Accordion
  //if it is rounded bottom and after it is another component - remove border
  //if it is rounded top and after another component - remove border
  //TODO: Fix css
  const roundChildrenStyle = css`
    & > :not(:only-child) {
      :not(:last-child):not(:first-child) {
        & > * {
          border-radius: 0;
        }
      }

      :first-child {
        & > * {
          :last-child {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
      }

      :last-child {
        & > * {
          :first-child {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
          }
        }
      }
    }
  `;

  return (
    <div css={roundChildrenStyle} {...atr}>
      {children}
    </div>
  );
}

type AccordionsContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};
