import clsx from "clsx";
import React from 'react';

import {CatalogItemProperty} from "../../core/classes/CatalogItemProperty";

import './ElementProperty.scss'


export type ElementPropertyProps = {
    className?: string
    property: CatalogItemProperty
    onClick?: (p: CatalogItemProperty) => unknown
}


export function ElementProperty({property, className, onClick}: ElementPropertyProps) {


    function handlePropertyClick(){
        onClick?.(property)
    }


    return (
        <div
            className={clsx('property', className)}
            onClick={handlePropertyClick}
        >
            <div className='property-container'>
                <div className='property-name'>{property.name}</div>
                <div className='property-value'>{property.value}</div>
            </div>
        </div>
    );
}

