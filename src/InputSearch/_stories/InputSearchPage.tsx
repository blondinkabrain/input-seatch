import React, { useState, KeyboardEvent } from "react";
import "./inputSearchPage.css";
import { List } from "../../List/List";
import { InputSearch, InputSearchProps } from "../InputSearch";

export const InputSearchPage = ({
   startSearch,
   dataService,
   onSelectItem,
}: InputSearchProps) => {
   const [value, setValue] = useState("");
   const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
         dataService.add(value);
         setValue("");
      }
   };
   return (
      <article>
         <div className="storybook-Page__inputSearch-container">
            <div className="storybook-Page__inputSearch">
               <InputSearch
                  startSearch={startSearch}
                  dataService={dataService}
                  onSelectItem={onSelectItem}
               />
            </div>
            <div className="storybook-Page__data">
               <input
                  placeholder="Print value and hit Enter to Add"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  onKeyDown={onKeyDown}
               />
               Here is the whole data. You can simply add any more strings
               <List items={dataService.data} />
            </div>
         </div>
      </article>
   );
};
