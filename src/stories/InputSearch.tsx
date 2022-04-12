import React, {useEffect, useRef, useState} from 'react';
import './inputSearch.css';
import {Popup} from "./Popup";
import {Indicator} from "./Indicator";
import {List} from "./List";
import DataService from "./DataService";

interface InputSearchProps {
    startSearch?: number;
    dataService: DataService;
    onSelectItem: Function;
}

interface IndicatorControlProps {
    isShow?: boolean;
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
    const [stateItems, setStateItems] = useState([]); // props.dataService.data
    const [value, setValue] = useState('');
    const popupRef = useRef(document.body);
    const inputRef = useRef(null);
    useEffect(() => {
        let mounted = true;
        if (mounted && (value.length >= startSearch)) {
            setStateShowIndicator(true);
            props.dataService.load(value).then((items) => {
                setStateItems(items);
                setStateShowIndicator(false);
            }).catch((e) => {
                console.log('caught overload', e.message);
            });
        }
        return () => {
            mounted = false;
        }
    }, [value]);
    const onChangeInput = (e: React.SyntheticEvent<HTMLElement>) => {
        setValue(e.target.value);
    }
    const onBlur = (e: React.FocusEvent<HTMLElement>) => {
        // we close popup only when click out of it
        // if (e.relatedTarget !== inputRef.current) {
        //     setIsActive(false);
        // }
        // return true;
    }
    const onFocus =(e: React.FocusEvent<HTMLElement>) => {
        setIsActive(true);
    }
    return (
        <div
            className={['storybook-InputSearch'].join(' ')}>
            <input ref={inputRef} placeholder="Print to search" onChange={onChangeInput} onBlur={onBlur} onFocus={onFocus} value={value}/>
            <PopupControl ref={popupRef} isShow={isActive && (stateItems.length || stateShowIndicator)} target={inputRef}>
                <IndicatorControl isShow={stateShowIndicator}/>
                <List items={stateItems} onSelectItem={onSelectItem}/>
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
                <Popup target={props.target}>{props.children}</Popup>}
        </>

    );
};