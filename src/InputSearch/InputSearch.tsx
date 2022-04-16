import React, { FocusEvent, useEffect, useRef, useState } from "react";
import "./inputSearch.css";
import { Popup } from "../Popup/Popup";
import { Indicator } from "../Indicator/Indicator";
import { List } from "../List/List";
import DataService from "../DataService";
import { debounce } from "ts-debounce";

export interface InputSearchProps {
   /**
    * From what value.length start search in dataService
    */
   startSearch?: number;
   /**
    * Class for data loading and filtering
    */
   dataService: DataService;
   /**
    * Optional onSelectItem handler
    */
   onSelectItem?: (id: number) => void;
}

interface IItem {
   id: number;
   caption: string;
}

/**
 * InputSearch UI component
 */
export const InputSearch = ({
   startSearch = 3,
   onSelectItem,
   dataService,
}: InputSearchProps) => {
   const [isShowIndicator, setIsShowIndicator] = useState(false);
   const [isShowPopup, setIsShowPopup] = useState(false);
   const [items, setItems] = useState<IItem[]>([]); // props.dataService.data
   const [value, setValue] = useState("");
   const inputRef = useRef(null);

   // debounce inputload - avoid "DDOS" by fast printing
   const debouncedLoadRef = useRef(
      debounce((filter: string) => {
         dataService
            .load(filter)
            .then(items => {
               setItems(items as IItem[]);
               setIsShowIndicator(false);
            })
            .catch(e => {
               if (e.message === "stopped loading before new load") {
                  console.log("caught overload", e.message);
               }
            });
      }, 200),
   );
   useEffect(() => {
      if (value.length >= startSearch) {
         setIsShowPopup(true);
         setIsShowIndicator(true);
         debouncedLoadRef.current(value);
      } else {
         setIsShowPopup(false);
         setIsShowIndicator(false);
         setItems([]); // remove old search data
      }
   }, [value, startSearch]);
   const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
   };
   const onFocus = () => {
      setIsShowPopup(true);
   };
   const onBlur = (e: FocusEvent<HTMLInputElement>) => {
      // could be with ref, but now it is enough with checking "my own" class
      // click outside any popup closes opened popup
      if (!e.relatedTarget?.className?.includes("c-InputSearch__popup")) {
         setIsShowPopup(false);
      }
   };
   const onSelectItemListWrapper = (itemId: number) => {
      setIsShowPopup(false); // close popup
      onSelectItem && onSelectItem(itemId);
   };
   return (
      <div className="c-InputSearch">
         <input
            ref={inputRef}
            placeholder="Print to search"
            onChange={onChangeInput}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
         />
         <>
            {isShowPopup && (items.length > 0 || isShowIndicator) && (
               <Popup target={inputRef} className="c-InputSearch__popup">
                  {isShowIndicator && <Indicator />}
                  <List items={items} onSelectItem={onSelectItemListWrapper} />
               </Popup>
            )}
         </>
      </div>
   );
};
