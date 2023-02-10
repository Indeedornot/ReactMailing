import {ButtonHTMLAttributes, useState, MouseEvent} from 'react';
import {VscChevronDown} from 'react-icons/vsc';
import {useSpring, animated} from 'react-spring';

//TODO: Add Icon Sizing
export default function RotatingToggle(props: RotatingToggleProps) {
	const {
		callback,
		initialState = false,
		buttonColor = {on: '#4A3AFF', off: '#FFFFFF'},
		iconColor = {on: '#FFFFFF', off: '#4A3AFF'},
		degrees = {on: 0, off: 90},
	} = props;

	const [on, setOpen] = useState(initialState);
	const handleToggle = (e: MouseEvent<HTMLButtonElement>) => {
		setOpen(!on);
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
		<div className='flex justify-center items-center flex-row flex-1'>
			<animated.button
				style={{...buttonAnimation}}
				className='rounded-full p-0 m-0 aspect-square flex'
				onClick={handleToggle}>
				<animated.div
					className='overflow-hidden flex justify-center items-center h-full w-full'
					style={{...iconAnimation}}>
					<VscChevronDown></VscChevronDown>
				</animated.div>
			</animated.button>
		</div>
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
