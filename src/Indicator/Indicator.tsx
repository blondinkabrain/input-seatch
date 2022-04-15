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
            className={['c-Indicator'].join(' ')}
            {...props}
        >
            <div className="c-Indicator__spinner">
            </div>
        </div>
    );
};
