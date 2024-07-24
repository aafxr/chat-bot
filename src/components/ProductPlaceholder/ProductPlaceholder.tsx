import React from 'react';
import {Card, Placeholder, ThemeProvider} from "react-bootstrap";

import './ProductPlaceholder.scss'


export function ProductPlaceholder() {

    const prefixes = {
        "card": "productPlaceholder-card",
    }


    return (
        <ThemeProvider prefixes={prefixes}>
            <Card>
                <Card.Img variant="top" src="/placeholder_image.png"/>
                <Card.Body>
                    <Placeholder as={Card.Text} animation="glow">
                        <Placeholder xs={7}/> <Placeholder xs={4}/> <Placeholder xs={4}/>{' '}
                        <Placeholder xs={6}/> <Placeholder xs={8}/>
                    </Placeholder>
                    <Placeholder.Button className='productPlaceholder-btn w-100' variant="primary" xs={6}/>
                </Card.Body>
            </Card>
        </ThemeProvider>
    );
}

