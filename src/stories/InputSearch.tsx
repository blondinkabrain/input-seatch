import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import './inputSearch.css';
import {Popup} from "./Popup";
import {Indicator} from "./Indicator";
import {List} from "./List";
import DataService from "./DataService";

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
    const [items, setItems] = useState([] as IItem[]); // props.dataService.data
    const [value, setValue] = useState('');
    const inputRef = useRef(null);
    useEffect(() => {
        let mounted = true;
        if (mounted && (value.length >= startSearch)) {
            setIsShowPopup(true);
            setIsShowIndicator(true);
            dataService.load(value).then((items ) => {
                setItems(items as IItem[]);
                setIsShowIndicator(false);
            }).catch((e) => {
                if (e.message === 'stopped loading before new load') {
                    console.log('caught overload', e.message);
                }
            });
        } else {
            setIsShowPopup(false);
            setIsShowIndicator(false);
            setItems([]); // remove old search data
        }
        return () => {
            mounted = false;
        }
    }, [value, startSearch]);
    const onChangeInput = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const onFocus = () => {
        setIsShowPopup(true);
    };
    const onBlur = (e: SyntheticEvent) => {

        // fixMe find a way  with a ref - trouble with click on another popup
        // click outside any popup closes opened popup
        if (!e.relatedTarget?.className?.includes('storybook-Popup')) {
            setIsShowPopup(false);
        }

    };
    const onSelectItemListWrapper = (itemId:number) => {
        setIsShowPopup(false); // close popup
        onSelectItem && onSelectItem(itemId);
    }
    return (
        <div
            className={['storybook-InputSearch'].join(' ')}>
            <input ref={inputRef}
                   placeholder="Print to search"
                   onChange={onChangeInput}
                   onFocus={onFocus}
                   onBlur={onBlur}
                   value={value}/>
            <>
                {isShowPopup && ((items.length > 0) || isShowIndicator) &&
                    <Popup target={inputRef}
                           className={'storybook-InputSearch__popup'}>{isShowIndicator &&
                        <Indicator/>}
                        <List items={items} onSelectItem={onSelectItemListWrapper}/>
                    </Popup>}
            </>
        </div>

    );
};
