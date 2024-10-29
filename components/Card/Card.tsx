import React from 'react'
import { isString } from 'lodash'
import { Image, Link } from '@/components'
import { ImageCardItem } from '@/types/components'
import { classNames, resolveCardCta } from '@/utils'

const Card: React.FC<ImageCardItem> = (props: ImageCardItem) => {
    const { $, image, image_alt_text, title, cta, content, count, key, id } = props

    {/* eslint-disable-next-line jsx-a11y/alt-text */ }
    const cardImage = image ? <Image
        image={image}
        image_alt_text={image_alt_text}
        className={classNames(
            count === 1 ? 'h-auto w-auto'
                : count === 2 ? 'h-48 lg:h-64'
                    : count === 3 ? 'h-48 lg:h-52'
                        : count && count >= 4 ? 'h-48 lg:h-52'
                            : '',
            'w-full object-center object-fit object-cover hover:opacity-90 hover:cursor-pointer'
        )}
    /> : <></>

    return (
        <Link
            url={resolveCardCta(cta)}
        >
            <div
                id={`card-${id}-${key}`}
                className={'group h-full relative flex flex-col justify-between'}
                {...$?.title}
            >
                <div className='flex flex-col'>
                    {cta ? <Link
                        url={resolveCardCta(cta)}
                    >
                        {cardImage}
                    </Link> : <>
                        {cardImage}
                    </>}

                    <div className='mt-6 text-xl text-black dark:text-white'>
                        {title
                            && <h4
                                data-id='h4-text'
                                className='font-bold card-title'>
                                {title}
                            </h4>
                        }
                    </div>
                    {content && <p
                        data-id='paragraph-text'
                        className='mt-4 p-0 text-base leading-5 text-black dark:text-white card-content'
                    >
                        {content}
                    </p>
                    }
                </div>
                <div>
                    {cta && !isString(cta) && cta?.text && <p className='mt-3 text-base font-semibold !text-purple'>
                        <Link
                            url={resolveCardCta(cta)}
                            className='!text-purple hover:border-b-2  hover:border-purple cursor-pointer'
                        >
                            {cta.text}
                        </Link> &rarr;
                    </p>
                    }
                </div>
            </div>
        </Link>
    )
}

export { Card }