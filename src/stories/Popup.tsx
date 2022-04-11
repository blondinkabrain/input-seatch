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
                           ...props
                       }: PopupProps) => {
    return (
        <div
            className={['storybook-Popup', `storybook-Popup__position-${position?.horizontal}`, `storybook-Popup__position-${position?.vertical}`].join(' ')}
            {...props}
        > {props.children}
        </div>
    );
};
