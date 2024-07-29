import clsx from "clsx";
import React, {useEffect, useState} from 'react';

import {setCatalogFilter} from "../../redux/slices/catalog-slice";
import {useCatalog} from "../../redux/hooks/useCatalog";
import {useAppDispatch} from "../../redux/hooks";
import {SearchIcon, CloseIcon} from "../svg";
import {Container} from "../Container";
import Input from "../Input/Input";

import './Header.scss'


export type HeaderProps = {
    className?: string
    onSelect?: (str: string) => unknown
}


export function Header({onSelect, className}: HeaderProps) {
    const [value, setValue] = useState('')
    const dispatch = useAppDispatch()
    const catalog = useCatalog()


    useEffect(() => {
        if(!catalog) return
        if (catalog._filter) setValue(catalog._filter)
    }, []);


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const {key} = e
        if (key === 'Enter' && value) {
            onSelect?.(value)
        }
    }


    const handleTextChange = (value: string) => {
        setValue(value)
        dispatch(setCatalogFilter(value))
    }

    const resetFilter = () => {
        setValue('')
        dispatch(setCatalogFilter(''))
    }


    function handleSearchClick() {
        if (value) onSelect?.(value)
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
                        onChange={handleTextChange}
                        onKeyDown={handleKeyPress}
                        autoCapitalize='off'
                    />
                    {!!value && (
                        <div className='header-clear' onClick={resetFilter}>
                            <CloseIcon className='icon-16' />
                        </div>
                    )}
                </div>
            </Container>
        </header>
    );
}

