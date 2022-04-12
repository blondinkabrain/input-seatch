import React from 'react';
import './popup.css';
interface IPosition {
    horizontal: 'left' | 'right',
    vertical: 'top' | 'bottom'| 'test'
}
interface PopupProps {
    /**
     * What position with target
     */
    position?: IPosition;
    /**
     * Target of popup
     */
    // target?: DOMRect;
}

/**
 * Popup UI component
 */
export const Popup = ({    position = {horizontal: 'left', vertical:'test'},
                          target,
                           ...props
                       }: PopupProps) => {

    const rect = target ? target.current.getBoundingClientRect() : {
        top : 50,
        width: 150
    };

    // document.body
    const popupStyle = {
        top: rect.top + rect.height,
        left: rect.left,
        width: rect.width
    }
    return (
        <div tabIndex={0}
            className={['storybook-Popup', `storybook-Popup__position-${position?.horizontal}`, `storybook-Popup__position-${position?.vertical}`].join(' ')}
            {...props}
            style={popupStyle}> {props.children}
        </div>
    );
};
