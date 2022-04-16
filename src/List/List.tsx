import React from "react";
import "./list.css";

interface IItem {
   id: number;
   caption: string;
}

interface ListProps {
   items: IItem[];
   /**
    * Optional item click handler
    */
   onSelectItem?: (id: number) => void;
}

/**
 * List UI component
 */
export const List = ({ items = [], onSelectItem }: ListProps) => {
   const listItems = items.map(item => (
      <div
         key={item.id}
         className="c-List__item"
         onClick={() => {
            onSelectItem && onSelectItem(item.id);
         }}
      >
         {item.caption}
      </div>
   ));
   return <div className="c-List">{listItems}</div>;
};
