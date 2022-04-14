import React, {useRef, useState} from 'react';

import {Popup} from "./Popup";
import './popupPage.css';

export const PopupPage: React.VFC = ({}) => {
    return (
        <article>
            <div>
                <OpenPopupControl></OpenPopupControl>
            </div>
        </article>
    );
};
const OpenPopupControl = () => {
    const buttonRef = useRef(null);
    const [isShow, setIsShow] = useState(false);
    const openPopup = () => {
        setIsShow(true);
    };
    return (
        <div className="{storybook-OpenPopup}">
            <button ref={buttonRef} onClick={openPopup}>click to Open Popup</button>
            {isShow && <Popup target={buttonRef} position='bottom'>
                <OpenPopupControl></OpenPopupControl>
            </Popup>}
        </div>
    );
};