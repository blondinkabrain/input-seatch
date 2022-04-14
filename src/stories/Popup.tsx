import React, {forwardRef, LegacyRef, Ref, useEffect, useState} from 'react';
import './popup.css';
import {createPortal} from "react-dom";

interface PopupProps {
    /**
     * Pick position around target
     */
    position?: 'left' | 'right' | 'top' | 'bottom';
    /**
     * Target of popup
     */
    target: Ref<ReactDOM.Container>;
    children: React.ReactNode;
    // ref: LegacyRef<HTMLDivElement>;
}

/**
 * Popup UI component
 */
export const Popup = ({
                          position = 'bottom',
                          target,
                          ...props
                      }: PopupProps) => {
    const [isShow, setIsShow] = useState(false); // to avoid blinking
    const [popupStyle, setPopupStyle] = useState({
        top: 50,
        left: 0,
        width: 150
    })
    useEffect(() => {
        const rect = target?.current?.getBoundingClientRect() || popupStyle;
        setPopupStyle({
            top: rect.top + (position === 'bottom' ? rect.height : 0),
            left: rect.left,
            width: rect.width
        });
        setIsShow(true);
    }, []);
    return (
        createPortal((
            <>
                {isShow &&
                    (<div tabIndex={0}
                          {...props}
                          className={['storybook-Popup', props.className || ''].join(' ')}
                          style={popupStyle}> {props.children}
                    </div>)}
            </>
        ), document.body)
    );
};
