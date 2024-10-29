'use client'

import Slider from 'react-slick'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/outline'
import { Carousel as CarouselType } from '@/types/components'

const Carousel = ({className, children}: CarouselType) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        nextArrow: <ChevronRightIcon className='h-5 my-auto'/>,
        prevArrow: <ChevronLeftIcon className='h-5 my-auto'/>,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    infinite: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    nextArrow: <ChevronRightIcon className='h-5 my-auto !text-black hover:!text-gray-900'/>,
                    prevArrow: <ChevronLeftIcon className='h-5 my-auto !text-gray-600 hover:!text-gray-900'/>
                    
                }
            }
        ]
    }

    return (
        <Slider {...settings} className={className}>
            {children}
        </Slider>
    )
}

export {Carousel}