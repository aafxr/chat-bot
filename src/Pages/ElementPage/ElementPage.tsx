import React from 'react';
import {useNavigate, useParams} from "react-router";
import {useCatalogElement} from "../../redux/hooks/useCatalogElement";

import {Slide} from 'react-slideshow-image';

import './ElementPage.scss'
import 'react-slideshow-image/dist/styles.css'


export function ElementPage() {
    const {detailId} = useParams()
    const element = useCatalogElement(detailId)
    const navigate = useNavigate()

    if (!element) {
        navigate('/')
        return <></>
    }

    console.log(element)


    return (
        <div className='itemDetails'>
            <div className="itemDetails-container">
                <div className='itemDetails-slider'>
                    <Slide
                        arrows={false}
                        autoplay
                        canSwipe
                        pauseOnHover
                        transitionDuration={500}
                        duration={3000}
                    >
                        {element.photo.map((slideImage) => (
                            <div
                                key={slideImage.id}
                                className='itemDetails-slide'
                                style={{'backgroundImage': `url(${slideImage.src})`}}
                            />
                        ))}
                    </Slide>
                </div>
            </div>
        </div>
    );
}

