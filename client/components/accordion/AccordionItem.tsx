import React, {createRef, HTMLAttributes, useEffect, useState} from 'react';
import tw, {css} from 'twin.macro';
import {ToggleHeader} from '@/components/accordion/ToggleHeader';
import {ButtonHeader} from '@/components/accordion/ButtonHeader';
import {SerializedStyles} from '@emotion/react';

export default function AccordionItem(props: AccordionItemProps) {
  const {
    children = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    header = 'This is an accordion header example',
    headerType = 'button',
    open = false,
    flush = false,
    ...atr
  } = props;

  const headerRef = createRef<HTMLDivElement>();
  const bodyRef = createRef<HTMLDivElement>();

  const [isOpen, setIsOpen] = useState(open);
  useEffect(() => {
    console.log(open);
    if (!bodyRef.current) return;
    const accordionContent = bodyRef.current;

    if (isOpen)
      accordionContent.style.maxHeight = `${
        accordionContent.scrollHeight + 32
      }px`;
    else accordionContent.style.maxHeight = '0px';
  }, [isOpen]);

  const styles = {
    accordionItem: css``,
    accordionItemFlushable: css`
      &:first-of-type {
        & > .accordion-header {
          ${tw`rounded-t-lg`}
        }
      }

      &:last-of-type {
        & > .accordion-collapse > .accordion-body {
          ${tw`rounded-b-lg`}
        }
      }
    `,

    accordionHeader: css`
      ${tw`
            flex items-center h-14 w-full
            bg-indigo-50 dark:bg-gray-900
            dark:text-blue-50
            transition`}
    `,
    accordionHeaderFlushable: css`
      ${tw`
                px-5`}
    `,

    accordionBody: css`
      ${tw`
            px-5 pt-2 pb-3.5
            bg-white dark:bg-gray-800 
            dark:text-blue-50
          `}
    `,

    accordionCollapse: css`
      transition: max-height 0.3s ease-out, padding 0.3s ease;
      ${open ? 'max-height: 100%' : 'max-height: 0px'};

      ${tw`overflow-hidden`}
    `,
  };

  const notFlush = (style: SerializedStyles) => (flush ? '' : style);
  return (
    <div
      className={'accordion-item'}
      css={css`
        ${styles.accordionItem} ${notFlush(styles.accordionItemFlushable)}
      `}
      {...atr}>
      <div
        className={'accordion-header'}
        css={css`
          ${styles.accordionHeader} ${notFlush(styles.accordionHeaderFlushable)}
        `}
        ref={headerRef}>
        {(() => {
          switch (headerType) {
            case 'button':
              return (
                <ButtonHeader
                  onClick={() => setIsOpen(!isOpen)}
                  header={header}
                />
              );
            case 'toggle':
              return (
                <ToggleHeader
                  header={header}
                  initialState={isOpen}
                  onClick={() => setIsOpen(!isOpen)}
                />
              );
          }
        })()}
      </div>

      <div
        className={'accordion-collapse'}
        css={styles.accordionCollapse}
        ref={bodyRef}>
        <div className={'accordion-body'} css={styles.accordionBody}>
          {children}
        </div>
      </div>
    </div>
  );
}

type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
  children?: React.ReactNode;
  header?: React.ReactNode;
  headerType?: 'button' | 'toggle';
  open?: boolean;
  flush?: boolean;
};
