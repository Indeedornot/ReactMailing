import React from 'react';

export function ButtonHeader(props: ButtonHeaderProps) {
  const {header, onClick} = props;
  return (
    <button onClick={onClick} className={'h-full w-full p-0 m-0'}>
      {header}
    </button>
  );
}

type ButtonHeaderProps = {
  onClick: () => void;
  header: React.ReactNode;
};
