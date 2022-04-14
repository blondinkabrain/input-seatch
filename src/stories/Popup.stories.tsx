import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PopupPage } from './PopupPage';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/PopupPage',
    component: PopupPage
} as ComponentMeta<typeof PopupPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PopupPage> = (args) => <PopupPage {...args} />;

export const OpenPopup = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
