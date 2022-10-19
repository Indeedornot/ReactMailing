import React, {HTMLAttributes} from 'react';
import tw, {css} from 'twin.macro';
import {ToggleHeader} from '@/components/accordion/ToggleHeader';
import {ButtonHeader} from '@/components/accordion/ButtonHeader';
import cx from 'classnames';
import useCollapse from 'react-collapsed';

//TODO: Block AccordionItem from being used when animation is set to true
export default function AccordionItem(props: AccordionItemProps) {
	const {children, header, headerType = 'button', open = false, flush = false, onToggle, ...atr} = props;

	const {getCollapseProps, setExpanded} = useCollapse({
		duration: 300,
		onCollapseEnd: () => {
			onToggle && onToggle(false);
		},
		onExpandEnd: () => {
			onToggle && onToggle(true);
		},
		defaultExpanded: open,
	});

	const getHeader = () => {
		switch (headerType) {
			case 'button':
				return <ButtonHeader onClick={() => setExpanded((expanded) => !expanded)} header={header} />;
			case 'toggle':
				return (
					<ToggleHeader header={header} initialState={open} onClick={() => setExpanded((expanded) => !expanded)} />
				);
		}
	};

	// eslint-disable-next-line react/display-name
	const AccordionHeader = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
		const {children, className, ...atr} = props;
		return (
			<div
				ref={ref}
				css={css`
					${!flush &&
					css`
						&:first-of-type {
							${tw`rounded-t-lg`}
						}

						${tw`px-5`}
					`}
				`}
				className={cx('items-center w-full bg-primary transition text-font-primary', className)}
				{...atr}>
				{children}
			</div>
		);
	});

	const AccordionBody = ({children}: {children: React.ReactNode}) => {
		return (
			<div
				css={css`
					${!flush &&
					css`
						&:last-of-type {
							${tw`rounded-b-lg`}
						}
						${tw`px-5 pt-2`}
					`}
				`}
				className='bg-primary text-font-primary w-full h-full'>
				{children}
			</div>
		);
	};

	return (
		<div>
			<AccordionHeader {...atr}>{getHeader()}</AccordionHeader>
			<div  {...getCollapseProps()}>
				<AccordionBody>{children}</AccordionBody>
			</div>
		</div>
	);
}

type AccordionItemProps = HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	header: React.ReactNode;
	headerType?: 'button' | 'toggle';
	open?: boolean;
	flush?: boolean;
	onToggle?: (isOpen: boolean) => void;
};
