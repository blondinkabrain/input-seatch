import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { InputSearchPage } from './InputSearchPage';
import DataService from "../../DataService";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Example/InputSearch',
    component: InputSearchPage
} as ComponentMeta<typeof InputSearchPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof InputSearchPage> = (args) => <InputSearchPage {...args} />;

export const StartSearch = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
StartSearch.args = {
    startSearch: 3,
    dataService: new DataService(5, 'title'),
    onSelectItem: (id: number) => {
        alert(`clicked-${id}`);
    }
};
