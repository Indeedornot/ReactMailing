import {css} from 'twin.macro';
import DropdownItemGroup from '@/components/dropdown/DropdownItemGroup';
import React, {HTMLAttributes} from 'react';
import cx from 'classnames';

export default function Dropdown({children, header, className, ...atr}: DropdownProps) {
	const style = css`
		/* since nested groupes are not supported we have to use
		\t\tregular css for the nested dropdowns
		\t\t*/
		li > ul {
			transform: translatex(100%) scale(0);
		}

		li:hover > ul {
			transform: translatex(101%) scale(1);
		}

		li > button svg {
			transform: rotate(-90deg);
		}

		li:hover > button svg {
			transform: rotate(-270deg);
		}

		/* Below styles fake what can be achieved with the tailwind config
		\t\tyou need to add the group-hover variant to scale and define your custom
		\t\tmin width style.
		\t\tSee https://codesandbox.io/s/tailwindcss-multilevel-dropdown-y91j7?file=/index.html
		\t\tfor implementation with config file
		\t\t*/

		.group:hover .group-hover\\:scale-100 {
			transform: scale(1);
		}

		.group:hover .group-hover\\:-rotate-180 {
			transform: rotate(180deg);
		}

		.scale-0 {
			transform: scale(0);
		}

		.min-w-32 {
			min-width: 8rem;
		}
	`;
	return (
		<div className={cx('group inline-block', className)} css={style} {...atr}>
			{header}
			<DropdownItemGroup parent={true}>{children}</DropdownItemGroup>
		</div>
	);
}

type DropdownProps = HTMLAttributes<HTMLDivElement> & {
	children: React.ReactNode;
	header: React.ReactNode;
};
