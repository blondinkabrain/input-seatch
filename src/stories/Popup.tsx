import React, {forwardRef, LegacyRef, Ref, useEffect, useState} from 'react';
import './popup.css';
import {createPortal} from "react-dom";
type PositionString = 'left' | 'right' | 'top' | 'bottom';

interface PopupProps {
    /**
     * What position with target
     */
    position?: PositionString;
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
     const [popupStyle, setPopupStyle] = useState({
         top: 50,
         left: 0,
         width: 150
     })
    useEffect(() => {
        const rect = target ? target.current.getBoundingClientRect() : popupStyle;
        setPopupStyle({
            top: rect.top + (position === 'bottom' ? rect.height : 0),
            left: rect.left,
            width: rect.width
        });
    }, []);
    return (
        createPortal(
            (<div tabIndex={0}
                  {...props}
                  className={['storybook-Popup', props.className || ''].join(' ')}
                  style={popupStyle}> {props.children}
            </div>), document.body
        )
    );
};
