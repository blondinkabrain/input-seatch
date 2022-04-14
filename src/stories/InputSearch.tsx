import React, {ReactNode, useEffect, useRef, useState} from 'react';
import './inputSearch.css';
import {Popup} from "./Popup";
import {Indicator} from "./Indicator";
import {List} from "./List";
import DataService from "./DataService";

export interface InputSearchProps {
    startSearch?: number;
    dataService: DataService;
    onSelectItem: Function;
}

interface IndicatorControlProps {
    isShow?: boolean;
    children?: ReactNode;
}

/**
 * InputSearch UI component
 */
export const InputSearch = ({
                                startSearch = 3,
                                onSelectItem,
                                ...props
                            }: InputSearchProps) => {
    const [stateShowIndicator, setStateShowIndicator] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [stateItems, setStateItems] = useState([] as object[]); // props.dataService.data
    const [value, setValue] = useState('');
    const inputRef = useRef(null);
    useEffect(() => {
        let mounted = true;
        if (mounted && (value.length >= startSearch)) {
            setIsActive(true);
            setStateShowIndicator(true);
            props.dataService.load(value).then((items) => {
                setStateItems(items);
                setStateShowIndicator(false);
            }).catch((e) => {
                console.log('caught overload', e.message);
            });
        } else {
            setIsActive(false);
            setStateShowIndicator(false);
        }
        return () => {
            mounted = false;
        }
    }, [value, startSearch]);
    const onChangeInput = (e: React.SyntheticEvent<HTMLElement>) => {
        setValue(e.target.value);
    };
    const onFocus =(e: React.FocusEvent<HTMLElement>) => {
        setIsActive(true);
    };
    const onSelectItemListWrapper = (itemId:number) => {
        setIsActive(false); // close popup
        onSelectItem && onSelectItem(itemId);
    }
    return (
        <div
            className={['storybook-InputSearch'].join(' ')}>
            <input ref={inputRef}
                   placeholder="Print to search"
                   onChange={onChangeInput}
                   onFocus={onFocus}
                   value={value}/>
            <PopupControl isShow={isActive && (stateItems.length || stateShowIndicator)}
                          target={inputRef}
                          className={'storybook-InputSearch__popup'}>
                <IndicatorControl isShow={stateShowIndicator}/>
                <List items={stateItems} onSelectItem={onSelectItemListWrapper}/>
            </PopupControl>
        </div>

    );
};
const IndicatorControl = ({
                              ...props
                          }: IndicatorControlProps) => {
    return (
        <>
            {props.isShow &&
                <Indicator/>}
        </>

    );
};
const PopupControl = ({
                          ...props
                      }: IndicatorControlProps) => {
    return (
        <>
            {props.isShow &&
                <Popup target={props.target}
                       className={props.className}>
                    {props.children}
                </Popup>}
        </>

    );
};
