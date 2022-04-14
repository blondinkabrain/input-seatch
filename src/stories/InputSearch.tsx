import React, {ReactNode, Ref, useEffect, useRef, useState} from 'react';
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

interface IndicatorControlProps {
    isShow: boolean;
    children?: ReactNode;
    target? : Ref<ReactDOM.Container>;
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
    const [stateShowIndicator, setStateShowIndicator] = useState(false);
    const [isShowPopup, setIsShowPopup] = useState(false);
    const [stateItems, setStateItems] = useState([] as IItem[]); // props.dataService.data
    const [value, setValue] = useState('');
    const inputRef = useRef(null);
    useEffect(() => {
        let mounted = true;
        if (mounted && (value.length >= startSearch)) {
            setIsShowPopup(true);
            setStateShowIndicator(true);
            dataService.load(value).then((items ) => {
                setStateItems(items as IItem[]);
                setStateShowIndicator(false);
            }).catch((e) => {
                if (e.message === 'stopped loading before new load') {
                    console.log('caught overload', e.message);
                }
            });
        } else {
            setIsShowPopup(false);
            setStateShowIndicator(false);
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
                   value={value}/>
            <PopupControl isShow={isShowPopup && ((stateItems.length > 0) || stateShowIndicator)}
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
                <Popup target={props.target} {...props}>
                    {props.children}
                </Popup>}
        </>

    );
};
