import React from 'react';
import './list.css';

interface IItem {
    id: number;
    caption: string;
}
interface ListProps {
    items: IItem[];
    onSelectItem?: Function;
}

/**
 * List UI component
 */
export const List = ({ items = [],
                         onSelectItem,
                      }: ListProps) => {
    // "onSelectItem(id)"
    const sendOnItemClick = (id: number) => {
        console.log('clicked', id);
        onSelectItem && onSelectItem(id);
    }
    const listItems = items.map((item) =>
        <div key={item.id} className='storybook-List__item' onClick={() => sendOnItemClick(item.id)}>
            {item.caption}
        </div>
    );
    return (
        <div
            className='storybook-List'
        >{listItems}
        </div>
    );
};
