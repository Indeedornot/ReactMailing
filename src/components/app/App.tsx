import "./app.module.css";
import Accordion from "@/components/accordion/Accordion";
import AccordionItem from "@/components/accordion/AccordionItem";
import AccordionsContainer from "@/components/accordion/AccordionsContainer";
import { css } from "@emotion/react";

import React, { useState } from "react";

import "@/bootstrap/dist/css/bootstrap.min.css";
import { FaReact } from "react-icons/fa/";
import RotatingIcon from "@/components/animated/RotatingIcon";
import EmailTab from "@/components/email/EmailTab";

export default function App() {
  const accordionItems = [
    {
      id: "1",
      header: "Accordion Item 1",
      body: "Accordion Item 1 Body",
    },
    {
      id: "2",
      header: "Accordion Item 2",
      body: "Accordion Item 2 Body",
    },
    {
      id: "3",
      header: "Accordion Item 3",
      body: "Accordion Item 3 Body",
    },
  ];

  return (
    <div
      className="App"
      css={css`
        height: 896px;
        width: 414px;
      `}
    >
      <div className={"container-fluid h-100"}>
        <div id={"col-left"}></div>
        <div id={"content"} className={"h-100"}>
          <div
            className={
              "bg-light w-100 h-100 d-flex flex-column align-items-center"
            }
          >
            <div
              id={"icon"}
              className={""}
              css={css`
                font-size: 10rem;
              `}
            >
              <RotatingIcon from={0} to={360} time={2} alternate={false}>
                <FaReact />
              </RotatingIcon>
            </div>
            <br />
            <div
              className={
                "d-flex justify-content-center align-items-center w-100"
              }
            >
              <div id={"Faq"} className={"w-75"}>
                <AccordionsContainer>
                  {accordionItems.map((value) => (
                    <Accordion key={value.id}>
                      <AccordionItem eventKey={"0"} header={value.header}>
                        {value.body}
                      </AccordionItem>
                    </Accordion>
                  ))}
                </AccordionsContainer>
              </div>
            </div>
          </div>
        </div>
        <div id={"col-right"}></div>
      </div>
    </div>
  );
}
