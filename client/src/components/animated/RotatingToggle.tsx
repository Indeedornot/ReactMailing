import Square from '@/components/layout/Square';
import React, {ButtonHTMLAttributes, useState, MouseEvent} from 'react';
import {VscChevronDown} from 'react-icons/vsc';
import {useSpring, animated} from 'react-spring';
import cx from 'classnames';

const RotatingToggleStyles = {
	Container: 'rounded-full p-0 m-0 h-full w-full flex  overflow-clip',
	Icon: 'overflow-hidden flex justify-center items-center h-full w-full',
};

//TODO: Add Icon Sizing
export default function RotatingToggle(props: RotatingToggleProps) {
	const {
		callback,
		className,
		onClick,
		initialState = false,
		buttonColor = {on: '#4A3AFF', off: '#FFFFFF'},
		iconColor = {on: '#FFFFFF', off: '#4A3AFF'},
		degrees = {on: 0, off: 90},
		...atr
	} = props;

	const [on, setOpen] = useState(initialState);
	const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
		setOpen(!on);
		onClick && onClick(e);
		callback && callback(on);
	};

	const buttonAnimation = useSpring({
		from: {
			transform: on ? `rotate(${degrees.off}deg)` : `rotate(${degrees.on}deg)`,
			backgroundColor: on ? buttonColor.off : buttonColor.on,
		},
		to: {
			transform: on ? `rotate(${degrees.on}deg)` : `rotate(${degrees.off}deg)`,
			backgroundColor: on ? buttonColor.on : buttonColor.off,
		},
	});
	const iconAnimation = useSpring({
		from: {
			color: on ? iconColor.off : iconColor.on,
		},
		to: {
			color: on ? iconColor.on : iconColor.off,
		},
		delay: 143,
	});

	return (
		<Square>
			{/*'btn rounded-circle p-0 m-0 h-100 w-100 d-flex'*/}
			<animated.button
				style={{...buttonAnimation}}
				className={cx(RotatingToggleStyles.Container, className)}
				onClick={handleToggle}
				{...atr}>
				<animated.div className={RotatingToggleStyles.Icon} style={{...iconAnimation}}>
					<VscChevronDown></VscChevronDown>
				</animated.div>
			</animated.button>
		</Square>
	);
}

type RotatingToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	callback?: (parameter: boolean) => any;
	initialState?: boolean;
	//style
	buttonColor?: {on?: string; off?: string};
	iconColor?: {on?: string; off?: string};
	degrees?: {on?: number; off?: number};
};
