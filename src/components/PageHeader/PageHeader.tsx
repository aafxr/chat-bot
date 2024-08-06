import clsx from "clsx";
import React from 'react';

import {Container} from "../Container";
import {Title} from "../Title";

import './PageHeader.scss'



export interface PageHeaderProps {
    className?: string
    title?:string
}


export function PageHeader({className, title}: PageHeaderProps) {
    return (
        <div className={clsx('wrapper-header pageHeader', className)}>
        <Container >
            <Title>{title}</Title>
        </Container>
        </div>
    );
}

