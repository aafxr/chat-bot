import React, {useState} from 'react';
import clsx from "clsx";

import {SearchIcon} from "../svg";
import Input from "../Input/Input";

import {Container} from "../Container";

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
            <Container className='header-container'>
                <div className='header-inner'>
                    <SearchIcon className='header-search' onClick={handleSearchClick}/>
                    <Input
                        className='header-input'
                        value={value}
                        placeholder={'Поиск по артикулу/названию'}
                        onChange={setValue}
                        onKeyDown={handleTextChange}
                    />
                </div>
            </Container>
        </header>
    );
}

