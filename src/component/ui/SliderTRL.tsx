import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDictionary } from './DictionaryProvider';
import { getDictionary } from './dictionaries';
import * as dictit from './it.json';
import * as dicten from './en.json';

// Main application component
const SliderTRL = (props: { onchange: (min: number, max: number) => void, minmax: { min: number, max: number }, refresh: number }) => {
    const [minValue, setMinValue] = useState(props.minmax.min);
    const [maxValue, setMaxValue] = useState(props.minmax.max);
    const [isMinDragging, setIsMinDragging] = useState(false);
    const [isMaxDragging, setIsMaxDragging] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    const lang = document.getElementsByTagName('html')[0]!.getAttribute('lang') || 'en';
    const dict = lang === 'it' ? dictit : dicten;

    const rangePercentage = ((maxValue - minValue) / 90) * 100;
    const minPercentage = (minValue / 90) * 100;
    const maxPercentage = (maxValue / 90) * 100;

    useEffect(() => {
        props.refresh;
        setMinValue(props.minmax.min);
        setMaxValue(props.minmax.max);
    }, [props.refresh]);

    /* touch */
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>, isMin: boolean) => {
        e.preventDefault();
        if (isMin) {
            setIsMinDragging(true);
        } else {
            setIsMaxDragging(true);
        }
    };

    const handleTouchDrag = useCallback((e: TouchEvent) => {
        if (!isMinDragging && !isMaxDragging) return;

        const sliderRect = sliderRef.current!.getBoundingClientRect();
        const newPosition = (e.touches[0]!.clientX - sliderRect.left);
        const newPercentage = Math.max(0, Math.min(90, (newPosition / sliderRect.width) * 100));
        const newValue = Math.round(newPercentage / 10) * 10;

        if (isMinDragging) {
            if (newValue < maxValue) {
                setMinValue(newValue);
            }
        } else if (isMaxDragging) {
            if (newValue > minValue) {
                setMaxValue(newValue);
            }
        }
        props.onchange(minValue, maxValue);
    }, [isMinDragging, isMaxDragging, props, minValue, maxValue]);

    const handleTouchEnd = React.useCallback(() => {
        setIsMinDragging(false);
        setIsMaxDragging(false);
    }, []);


    /* mouse */
    const handleDragStart = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, isMin: boolean) => {
        e.preventDefault();
        if (isMin) {
            setIsMinDragging(true);
        } else {
            setIsMaxDragging(true);
        }
    };

    const handleDrag = useCallback((e: MouseEvent) => {
        if (!isMinDragging && !isMaxDragging) return;

        const sliderRect = sliderRef.current!.getBoundingClientRect();
        const newPosition = (e.clientX - sliderRect.left);
        const newPercentage = Math.max(0, Math.min(90, (newPosition / sliderRect.width) * 100));
        const newValue = Math.round(newPercentage / 10) * 10;

        if (isMinDragging) {
            if (newValue < maxValue) {
                setMinValue(newValue);
            }
        } else if (isMaxDragging) {
            if (newValue > minValue) {
                setMaxValue(newValue);
            }
        }
        props.onchange(minValue, maxValue);
    }, [isMinDragging, isMaxDragging, props, minValue, maxValue]);

    const handleDragEnd = React.useCallback(() => {
        setIsMinDragging(false);
        setIsMaxDragging(false);
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleDrag);
        window.addEventListener('mouseup', handleDragEnd);

        window.addEventListener('touchmove', handleTouchDrag);
        window.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('mousemove', handleDrag);
            window.removeEventListener('mouseup', handleDragEnd);

            window.removeEventListener('touchmove', handleTouchDrag);
            window.removeEventListener('touchend', handleTouchEnd);
        };
    }, [handleDrag, handleDragEnd, handleTouchDrag, handleTouchEnd]);

    //rounded-xl shadow-lg border border-gray-200
    return (
        <div className="w-full max-w-xl p-6 bg-white">
            <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {dict.slideTRL.label}
            </h4>
            <div ref={sliderRef} className="relative h-4 mt-6">
                {/* Sfondo del track */}
                <div className="absolute h-2 top-1/2 -translate-y-1/2 w-full bg-gray-200 rounded-full"></div>
                {/* Range selezionato */}
                <div
                    className="absolute h-2 top-1/2 -translate-y-1/2 bg-indigo-500 rounded-full"
                    style={{
                        left: `${minPercentage}%`,
                        width: `${rangePercentage}%`,
                    }}
                ></div>

                {/* Thumb minimo */}
                <div
                    className="absolute h-5 w-5 rounded-full bg-indigo-600 shadow-md cursor-pointer top-1/2 -translate-y-1/2 -translate-x-1/2 border-2 border-white transition-colors duration-200"
                    style={{ left: `${minPercentage}%` }}
                    onMouseDown={(e) => handleDragStart(e, true)}
                    onTouchStart={(e) => handleTouchStart(e, true)}
                ></div>
                {/* Thumb massimo */}
                <div
                    className="absolute h-5 w-5 rounded-full bg-indigo-600 shadow-md cursor-pointer top-1/2 -translate-y-1/2 -translate-x-1/2 border-2 border-white transition-colors duration-200"
                    style={{ left: `${maxPercentage}%` }}
                    onMouseDown={(e) => handleDragStart(e, false)}
                    onTouchStart={(e) => handleTouchStart(e, false)}
                ></div>
            </div>

            <div className="flex justify-between items-center mt-6">
                <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold text-gray-700">{dict.slideTRL.minlabel}</span>
                    <span className="text-xl font-bold text-indigo-600 mt-1">{minValue / 10}</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-sm font-semibold text-gray-700">{dict.slideTRL.maxlabel}</span>
                    <span className="text-xl font-bold text-indigo-600 mt-1">{maxValue / 10}</span>
                </div>
            </div>
        </div>
    );
};

export default SliderTRL;