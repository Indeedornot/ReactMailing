import React from "react";
import { EmailModel } from "@/shared/emails/models/EmailModel";
import { Virtuoso } from "react-virtuoso";
import Email from "./Email";
import { scrollBarless } from "@/styles/PublicStyles";

const Footer = () => {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        justifyContent: "center"
      }}
    >
      Loading...
    </div>
  );
};

export default function EmailsVirtualized({
                                            emails,
                                            loadNextPage
                                          }: EmailsVirtualizedProps) {
  const loadMore = (index: number) => {
    return loadNextPage(index);
  };

  const MemoizedEmail = React.memo(Email);

  const getItemContent = (index: number, email: EmailModel) => {
    return <MemoizedEmail email={email} flush={true}></MemoizedEmail>;
  };

  return (
    <Virtuoso
      css={scrollBarless}
      className="w-full h-full bg-primary"
      data={emails}
      endReached={loadMore}
      overscan={25}
      itemContent={(index, email) => getItemContent(index, email)}
      components={{ Footer }}
    ></Virtuoso>
  );
}

type EmailsVirtualizedProps = {
  // Array of items loaded so far.
  emails: EmailModel[];
  // Callback function responsible for loading the next page of items.
  loadNextPage: (index: number) => void;
};
