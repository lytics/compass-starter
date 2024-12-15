import React from 'react'
import { RecommendedArticles as RecommendedArticlesType } from '@/types/components'
import { CardCollection } from '../CardCollection'

const RecommendedArticles:React.FC<RecommendedArticlesType> = (props:RecommendedArticlesType) => {

    const { recommended_articles, cards } = props
    const { heading, sub_heading, $ } = {...recommended_articles} //related_article_tags

    // sub_heading2 = (sub_heading || "") + (affinities?.join(", "));

    return(<div>
        <CardCollection header={{heading, sub_heading, $}} cards={cards} className='poweredByLytics' id='recommended-articles-card-collection' />
    </div>
    )
}

export { RecommendedArticles }