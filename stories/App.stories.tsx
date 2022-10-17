import React from 'react';

import App from '../client/components/app/App';
import TwinStyles from '../client/styles/Twin/TwinStyles';

export default {
	title: 'Components/App',
	component: App,
};

const Template = (args) => (
	<>
		<TwinStyles />
		<App {...args} />
	</>
);
export const Default = Template.bind({});
