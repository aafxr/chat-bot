import React, {useState} from 'react';
import clsx from "clsx";

import {SearchIcon} from "../svg";
import Input from "../Input/Input";

import './Header.scss'


export type HeaderProps = {
    className?: string
    onSelect?: (str: string) => unknown
}


export function Header({onSelect, className}: HeaderProps) {
    const [value, setValue] =useState('')


    function handleTextChange(e: React.KeyboardEvent<HTMLInputElement>){
        const {key} = e
        if(key === 'Enter' && value) onSelect?.(value)
    }


    function handleSearchClick() {
        if(value) onSelect?.(value)
    }


    return (
        <header className={clsx('header', className)}>
            <div className='header-inner'>
                <SearchIcon className='header-search' onClick={handleSearchClick} />
                <Input
                    className='header-input'
                    value={value}
                    onChange={setValue}
                    onKeyDown={handleTextChange}
                />
            </div>
        </header>
    );
}

