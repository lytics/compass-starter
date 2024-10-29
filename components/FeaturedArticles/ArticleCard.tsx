import React from 'react'
import { Image, Link } from '@/components'
import { ArticleCardItem } from '@/types/components'
import { classNames, resolveCardCta } from '@/utils'

const ArticleCard: React.FC<ArticleCardItem> = (props: ArticleCardItem) => {
    const { cover_image, image_alt_text, title, url, summary, count, key, id } = props

    cover_image && delete cover_image.$

    {/* eslint-disable-next-line jsx-a11y/alt-text */ }
    const cardImage = cover_image ? <Image
        image={cover_image}
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
            url={resolveCardCta(url)}
        >
            <div
                id={`card-${id}-${key}`}
                className={'group h-full relative flex flex-col justify-between'}
            // {...$?.title}
            >
                <div className='flex flex-col'>
                    {url ? <Link
                        url={resolveCardCta(url)}
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
                    {summary && <p
                        data-id='paragraph-text'
                        className='mt-4 p-0 text-base leading-5 text-black dark:text-white card-content'
                    >
                        {summary}
                    </p>
                    }
                </div>
                {/* <div>
                {url && !isString(url) && url?.text && <p className='mt-3 text-base font-semibold !text-purple'>
                    <Link
                        url={resolveCardCta(url)}
                        className='!text-purple hover:border-b-2  hover:border-purple cursor-pointer'
                    >
                        {url.text}
                    </Link> &rarr;
                </p>
                }
            </div> */}
            </div>
        </Link>
    )
}

export { ArticleCard }