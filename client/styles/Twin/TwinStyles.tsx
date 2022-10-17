// client/styles/TwinStyles.tsx
//https://github.com/ben-rogerson/twin.examples/tree/master/vite-emotion-typescript

import React from 'react';
import {Global} from '@emotion/react';
import {css, GlobalStyles as BaseStyles} from 'twin.macro';

const customStyles = css(
	css`
		:root {
			--color-primary: 255 255 255;
			--color-secondary: 220 220 220;
			--color-accent: 216 216 216;
			--color-text-primary: 0 0 0;
			--color-text-secondary: 69 69 69;
		}

		.dark {
			--color-primary: 28 28 28;
			--color-secondary: 34 34 34;
			--color-accent: 33 33 33;
			--color-text-primary: 255 255 255;
			--color-text-secondary: 188 188 188;
		}
	`
);

const TwinStyles = () => (
	<>
		<BaseStyles />
		<Global styles={customStyles} />
	</>
);

export default TwinStyles;
