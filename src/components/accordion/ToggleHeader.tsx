import RotatingToggle from '@/components/animated/RotatingToggle';
import React from 'react';

export function ToggleHeader({header, initialState, onClick}: ToggleHeaderProps) {
    return (
        <div className={'h-full w-full p-0 m-0 grid grid-cols-12'}>
            <div className={'col-span-10 h-full'}>
                <div className={'flex items-center h-full w-full'}>{header}</div>
            </div>
            <div className={'col-span-2 flex justify-center items-center'}>
                <div className={'flex justify-center items-center h-2/3 w-2/3'}>
                    <RotatingToggle initialState={initialState}
                                    onClick={onClick}
                    />
                </div>
            </div>
        </div>);
}

type ToggleHeaderProps = {
    header: React.ReactNode;
    initialState: boolean;
    onClick: () => void;
};