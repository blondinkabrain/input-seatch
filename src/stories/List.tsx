import React from 'react';
import './list.css';

interface IItem {
    id: number;
    caption: string;
}
interface ListProps {
    items: IItem[]
}

/**
 * List UI component
 */
export const List = ({ items = [],
                       ...props
                      }: ListProps) => {
    // "onSelectItem(id)"
    const sendOnItemClick = (id: number) => {
        console.log('clicked', id);
    }
    const listItems = items.map((item) =>
        <div key={item.id} onClick={() => sendOnItemClick(item.id)}>
            {item.caption}
        </div>
    );
    return (
        <div
            className='storybook-List'
            {...props}
        >{listItems}
        </div>
    );
};
