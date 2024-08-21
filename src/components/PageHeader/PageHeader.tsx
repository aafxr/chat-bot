import clsx from "clsx";
import React from 'react';
import {useNavigate} from "react-router";
import {Headline} from "@telegram-apps/telegram-ui";

import {Container} from "../Container";
import {ArrowBackIcon} from "../svg";

import './PageHeader.scss'


export interface PageHeaderProps {
    arrow?: boolean
    to?: string
    className?: string
    title?: string
}


export function PageHeader({arrow = false, to, className, title}: PageHeaderProps) {
    const navigate = useNavigate()

    return (
        <Container className={clsx('wrapper-header pageHeader', className)}>
            {arrow && (
                <div
                    className='pageHeader-arrow flex-0'
                    onClick={() => to ? navigate(to) : navigate(-1)}
                >
                    <ArrowBackIcon className='icon-16'/>
                </div>
            )}
            <div className='pageHeader-title'>
                <Headline weight={"1"}>{title}</Headline>
            </div>
        </Container>
    );
}

