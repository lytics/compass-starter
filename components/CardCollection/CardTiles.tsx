'use client'
import { useEffect, useState } from 'react'
import { classNames } from '@/utils'
import { ImageCardItem } from '@/types/components'
import { CardTile } from '../CardTile'


const CardTiles = ({cards, totalCount, id}:{ id?: string | number, cards?: ImageCardItem[]|[], totalCount: number }) => {

    const [subTitle, setSubTitle] = useState(false)

    useEffect(() => {
        let exists = false
        cards?.map((cardData) => {
            if(cardData?.subtitle) exists = true 
        })
        setSubTitle(exists)

    }, [cards])

    const gridConfigurator  = () => {

        if(totalCount > 12) return 'sm:grid-cols-2 lg:grid-cols-3'

        switch(cards?.length) {
        case 1:
            return 'lg:grid-cols-1'

        case 2:
            return 'sm:grid-cols-2 lg:grid-cols-2'

        case 3: 
            return 'sm:grid-cols-2 lg:grid-cols-3'

        default:
            return 'sm:grid-cols-2 lg:grid-cols-3'
        }

    }

    return (
        cards && cards?.length > 0 ? <div
            className={
                classNames(
                    gridConfigurator(),
                    'sm:grid-cols-2 lg:grid-cols-2 grid grid-cols-1 gap-y-12 sm:gap-x-6 xl:gap-x-8'
                )
            }
        >
            {cards?.map((cardData: ImageCardItem, idx: number) => {
                return (<CardTile
                    id={id}
                    key={idx}
                    {...cardData}
                    count={cards.length}
                    totalCount={totalCount}
                    subtitleExists={subTitle}
                />
                )
            })
            }
        </div> : <></>
    )
}

export {CardTiles}