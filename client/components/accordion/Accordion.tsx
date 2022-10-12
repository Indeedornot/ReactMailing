import React, {HTMLAttributes} from 'react';

export function Accordion(props: AccordionProps) {
    const {children, ...atr} = props;
    return (
        <>
            <div data-accordion="collapse" {...atr}>
                {children}
            </div>
        </>
    );
}

type AccordionProps = HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode
};