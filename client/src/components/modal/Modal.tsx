import React, {HTMLAttributes} from 'react';
import cx from 'classnames';
import ReactPortal from '@/components/layout/ReactPortal';

const ModalStyles = {
	Mask: 'bg-accent w-full h-full top-0 absolute opacity-40 z-[2]',
};

export default function Modal({setIsOpen, children, className, ...atr}: ModalProps) {
	return (
		<>
			<ReactPortal>
				{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
				<div tabIndex={-1} className={ModalStyles.Mask} onClick={() => setIsOpen(false)} />
				<div className={cx('top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute z-[2]', className)} {...atr}>
					<div className='w-full h-full'>{children}</div>
				</div>
			</ReactPortal>
		</>
	);
}

type ModalProps = HTMLAttributes<HTMLDivElement> & {
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
};
