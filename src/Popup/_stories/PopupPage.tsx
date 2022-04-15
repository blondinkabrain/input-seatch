import React, {useRef, useState} from 'react';

import {Popup} from "../Popup";
import './popupPage.css';

export const PopupPage = () => {
    return (
        <article>
            <div>
                <OpenPopupControl/>
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
        <div className="storybook-OpenPopup">
            <button ref={buttonRef}
                    onClick={openPopup}
                    style={{cursor: "pointer"}}>click to Open Popup</button>
            {isShow && <Popup target={buttonRef}
                              position="bottom">
                <OpenPopupControl/>
            </Popup>}
        </div>
    );
};
