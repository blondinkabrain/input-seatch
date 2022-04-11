import React, {useState} from 'react';
import './inputSearch.css';
import {Popup} from "./Popup";
import {Indicator} from "./Indicator";
import {List} from "./List";
import DataService from "./DataService";

interface InputSearchProps {
    startSearch?: number;
    dataService: DataService;
}
interface IndicatorControlProps {
    isShow?: boolean;
}
/**
 * InputSearch UI component
 */
export const InputSearch = ({ startSearch = 3,
                          ...props
                      }: InputSearchProps) => {
    // const [stateShow, setStateShow] = useState(false);
    const [stateShowIndicator, setStateShowIndicator] = useState(false);
    // const createItems = (count: number) => {
    //     const items = []
    //     for (let i = 0; i < count; i++) {
    //         items.push({
    //             id: i,
    //             caption: `caption-${i}`
    //         })
    //     }
    //     return items;
    // }
    // const listItems = createItems(10);
    const [stateItems, setStateItems]= useState(props.dataService.data);
    const onChangeInput = (e) => {
        const value = e.target.value;
        if (value.length >= startSearch) {
            setStateShowIndicator(true);
            props.dataService.load(value).then((items) => {
                setStateItems(items);
                setStateShowIndicator(false);
            }).catch((e) => {
                console.log('caught overload', e.message);
            });
        }
        console.log(e.target.value)
    }
    return (
        <div
            className={['storybook-InputSearch'].join(' ')}>
            <input placeholder="Print to search" onChange={onChangeInput}/>
            <PopupControl isShow={stateItems.length}>
                <IndicatorControl isShow={stateShowIndicator}/>
                <List items={stateItems}/>
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
                <Popup>{props.children}</Popup>}
        </>

    );
};