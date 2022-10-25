import React, {HTMLAttributes} from 'react';
import {css, cx} from 'twind';

export default function RotatingIcon({
	from,
	to,
	alternate = true,
	time,
	children,
	className,
	...props
}: RotatingIconProps) {
	const rotationStyle = css`
		@keyframes rotating {
			from {
				transform: rotate(${from}deg);
			}
			to {
				transform: rotate(${to}deg);
			}
		}

		& > :only-child {
			animation: rotating ${time}s linear infinite;
			animation-direction: ${alternate ? 'alternate' : 'normal'};
		}
	`;
	return (
		<div className={cx(rotationStyle, className)} {...props}>
			{children}
		</div>
	);
}

type RotatingIconProps = HTMLAttributes<HTMLDivElement> & {
	from: number;
	to: number;
	children: React.ReactElement;
	time: number;
	alternate?: boolean;
};
