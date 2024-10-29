import React from 'react'
import { RelatedArticles as RelatedArticlesType } from '@/types/components'
import { CardCollection } from '../CardCollection'

const RelatedArticles:React.FC<RelatedArticlesType> = (props:RelatedArticlesType) => {

    const { related_articles, cards } = props
    const { heading, sub_heading, $ } = {...related_articles} //related_article_tags
    
    return(<div>
        <CardCollection header={{heading, sub_heading, $}} cards={cards} id='related-articles-card-collection' />
    </div>
    )
}

export { RelatedArticles }