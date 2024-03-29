import React, {HTMLAttributes} from 'react';
import cx from 'classnames';
import ReactPortal from '@/components/layout/ReactPortal';

export default function Modal({setIsOpen, children, className, ...atr}: ModalProps) {
	return (
		<ReactPortal>
			<button
				className='bg-accent w-full h-full top-0 absolute opacity-40 z-[2] cursor-default'
				onClick={() => setIsOpen(false)}
			/>
			<div className={cx('top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-[2]', className)} {...atr}>
				{children}
			</div>
		</ReactPortal>
	);
}

type ModalProps = HTMLAttributes<HTMLDivElement> & {
	setIsOpen: (open: boolean) => void;
	children: React.ReactNode;
};
