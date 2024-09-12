import clsx from "clsx";
import React from 'react';

import {ProductProperty} from "../../core/classes/ProductProperty";

import './ElementProperty.scss'


export type ElementPropertyProps = {
    className?: string
    property: ProductProperty
    onClick?: (p: ProductProperty) => unknown
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

