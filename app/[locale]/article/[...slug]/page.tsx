'use client'
import { useEffect, useState } from 'react'
import { isNull } from 'lodash'
import { getArticle, getArticleListingPageByTaxonomy, getArticles, getRecommendedArticles } from '@/loaders'
import { RenderComponents } from '@/components'
import { Page } from '@/types'
import { ArticleCover, NotFoundComponent, PageWrapper, RelatedArticles, RecommendedArticles, RelatedLinks } from '@/components'
import { ImageCardItem } from '@/types/components'
import { onEntryChange } from '@/config'
import { isDataInLiveEdit } from '@/utils'
import useRouterHook from '@/hooks/useRouterHook'
import { setDataForChromeExtension } from '@/utils'


export default function Article () {
    const [data, setData] = useState<Page.ArticlePage['entry'] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [relatedArticles, setRelatedArticles] = useState<Page.ArticlePage['articles'] | null>(null)
    const [recommendedArticles, setRecommendedArticles] = useState<Page.ArticlePage['recommended_articles'] | null>(null)
    const [relatedLinks, setRelatedLinks] = useState<Page.ArticleListingPage['entry'][] | []>([])
    const {path, locale} = useRouterHook()

    const fetchData = async () => {
        try {
            const entryData: Page.ArticlePage['entry'] = await getArticle(path, locale)
            setData(entryData)
            setDataForChromeExtension({ entryUid: entryData?.uid || '', contenttype: 'article', locale: locale })
            if (!entryData && !isNull(entryData)) {
                throw '404'
            }
        } catch (err) {
            console.error('🚀 ~ article.tsx ~ fetchData ~ err:', err)
            setLoading(false)
        }
    }
    const fetchArticles = async () => {
        try {
            if (data && data?.taxonomies?.length > 0) {
                if (show_related_links) {
                    const listingData: Page.ArticleListingPage['entry'][] = await getArticleListingPageByTaxonomy(locale, data?.taxonomies)
                    listingData && setRelatedLinks(listingData)
                }
                if (show_related_articles) {
                    let relatedArticlesData: Page.ArticlePage['articles'] = await getArticles(locale, data?.taxonomies, 7)
                    relatedArticlesData = relatedArticlesData?.filter((article) => article.uid !== data?.uid)
                    relatedArticlesData && setRelatedArticles(relatedArticlesData)
                }
                if (show_recommended_articles) {
                    let recommendedArticlesData: Page.ArticlePage['recommended_articles'] = await getRecommendedArticles(locale, data?.taxonomies, 7)
                    recommendedArticlesData = recommendedArticlesData?.filter((article) => article.uid !== data?.uid)
                    recommendedArticlesData && setRecommendedArticles(recommendedArticlesData)
                } 
            } else {
                setRelatedLinks([])
                setRelatedArticles([])
                setRecommendedArticles([])
            }
            
        } catch (err) {
            console.error('🚀 ~ article.tsx ~ fetchArticles ~ err:', err)
            setRelatedArticles([])
            setRecommendedArticles([])
        }
    }

    useEffect(() => {
        onEntryChange(fetchData)
    }, [path])

    useEffect(() => {
        fetchArticles()
    }, [data])


    const { content, title, summary, cover_image, show_related_links, related_links, show_related_articles, related_articles, show_recommended_articles, recommended_articles, $ } = data || {}

    const related_cards: ImageCardItem[] | [] = relatedArticles?.map((article) => {
        return ({
            title: article?.title,
            content: article?.summary,
            image: article?.cover_image,
            $: article?.$,
            cta: article?.url
        })
    }) as ImageCardItem[] | []

    const recommended_cards: ImageCardItem[] | [] = recommendedArticles?.map((article) => {
        return ({
            title: article?.title,
            content: article?.summary,
            image: article?.cover_image,
            $: article?.$,
            cta: article?.url
        })
    }) as ImageCardItem[] | []

    const relatedArticleCards = related_cards && related_cards.splice(0, (data?.related_articles?.number_of_articles && data?.related_articles?.number_of_articles <= 6) ? related_articles?.number_of_articles : 6)
    const recommendedArticleCards = recommended_cards && recommended_cards.splice(0, (data?.recommended_articles?.number_of_recommendations && data?.recommended_articles?.number_of_recommendations <= 6) ? recommended_articles?.number_of_recommendations : 6)

    return (
        data ? <>
            <PageWrapper {...data} contentType='article'>
                <ArticleCover
                    title={title}
                    summary={summary}
                    cover_image={cover_image}
                    $={$}
                />
                <RenderComponents components={[{
                    text: {
                        content,
                        $: $
                    }
                }]}
                />
                {show_related_links && <RelatedLinks
                    relatedLinks={relatedLinks}
                    relatedLinksLabel={related_links}
                    $={data?.$}
                />}
                {show_related_articles && <RelatedArticles
                    related_articles={related_articles}
                    cards={relatedArticleCards}
                />}
                {show_recommended_articles && <RecommendedArticles
                    recommended_articles={recommended_articles}
                    cards={recommendedArticleCards}
                    affinities={['affinity1', 'affinity2']}
                />}
            </PageWrapper>

        </>
            : !loading && !isDataInLiveEdit() && <NotFoundComponent />
    )

}
