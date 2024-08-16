import clsx from "clsx";
import React from 'react';
import {Headline} from "@telegram-apps/telegram-ui";

import {Container} from "../Container";

import './PageHeader.scss'



export interface PageHeaderProps {
    className?: string
    title?:string
}


export function PageHeader({className, title}: PageHeaderProps) {
    return (
        <div className={clsx('wrapper-header pageHeader', className)}>
        <Container >
            <Headline weight={"1"}>{title}</Headline>
        </Container>
        </div>
    );
}

