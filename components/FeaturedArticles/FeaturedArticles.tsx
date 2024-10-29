import { FeaturedArticles as FeaturedArticlesProps } from '@/types/components'
import { FeaturedArticlesHeader } from './FeaturedArticlesHeader'
import { FeaturedArticlesBody } from './FeaturedArticlesBody'

const FeaturedArticles: React.FC<FeaturedArticlesProps> = (props: FeaturedArticlesProps) => {

    const { heading, sub_heading, articles, id, $ } = props

    return (
        <div
            id={id}
            className={'pb-8 px-8 sm:pb-12'}
        >
            <div className='max-w-7xl mx-auto '>

                {(heading || sub_heading) && <FeaturedArticlesHeader
                    id={id}
                    heading={heading}
                    sub_heading={sub_heading}
                    $={$}
                />}

                <FeaturedArticlesBody
                    id={id}
                    cards={articles}
                    totalCount={articles ? articles?.length : 0}
                    $={$}
                />
            </div>
        </div>
    )

}


export { FeaturedArticles }