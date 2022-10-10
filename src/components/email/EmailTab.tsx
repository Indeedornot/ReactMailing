import AccordionItem from "@/components/accordion/AccordionItem";
import Accordion from "@/components/accordion/Accordion";
import { EmailModel } from "@/components/email/EmailModel";
import parse from "html-react-parser";
import { Card } from "react-bootstrap";
import { sort } from "../../scripts/sort";
import { css } from "@emotion/react";
import { useState } from "react";

export default function EmailTab(props: EmailTabProps) {
  const [emails, SetEmails] = useState([...props.emails]);
  const [sortedBy, setSorted] = useState("");

  const sortBy = (property: keyof EmailModel) => {
    console.log(sortedBy);
    if (sortedBy != property) {
      SetEmails(sort(emails, property));
      setSorted(property);
    } else {
      SetEmails(sort(emails, `-${property}`));
      setSorted(`-${property}`);
    }
  };

  const buttonStyleless = css`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  `;

  return (
    <Card className={"bg-dark text-white p-0 m-0 border-0"}>
      <Card.Header>
        <div className={"container-fluid h-100 w-100"}>
          <div className={"row text-center"}>
            <button
              className={"col-3"}
              css={buttonStyleless}
              onClick={() => sortBy("SenderName")}
            >
              From
            </button>
            <button
              className={"col-6"}
              css={buttonStyleless}
              onClick={() => sortBy("Subject")}
            >
              Subject
            </button>
            <button
              className={"col-3"}
              css={buttonStyleless}
              onClick={() => sortBy("Date")}
            >
              Date
            </button>
          </div>
        </div>
      </Card.Header>
      <Accordion className={"h-100 w-100 border-0"}>
        {emails.map((email) => (
          <AccordionItem
            header={
              <div className={"container-fluid h-100 w-100"}>
                <div className={"row text-center"}>
                  <div className={"col-3"}>{email.SenderName}</div>
                  <div className={"col-6"}>{email.Subject}</div>
                  <div className={"col-3"}>{email.Date}</div>
                </div>
              </div>
            }
            eventKey={email.id}
            headerStyle={"clickable"}
            key={email.id}
          >
            {/*
                        Dangerous - Email body is not sanitized
                    */}
            {parse(email.Body)}
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}

type EmailTabProps = {
  emails: EmailModel[];
};
