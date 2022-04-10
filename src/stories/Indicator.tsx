import React from 'react';
import './indicator.css';

interface IndicatorProps {
}

/**
 * Indicator UI component
 */
export const Indicator = ({
                         ...props
                     }: IndicatorProps) => {
    return (
        <div
            className={['storybook-Indicator'].join(' ')}
            {...props}
        >
            <div className="storybook-Indicator--spinner">
            </div>
        </div>
    );
};
