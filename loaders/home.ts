import { getEntryByUrl } from '@/services'
import { featuredArticlesReferenceIncludes, imageCardsReferenceIncludes, teaserReferenceIncludes, textAndImageReferenceIncludes } from './loaders.helper'

export const getHomePage = ( cmsUrlPath: string | undefined, locale: string | undefined) => {
    const refUids = [
        ...textAndImageReferenceIncludes,
        ...teaserReferenceIncludes,
        ...imageCardsReferenceIncludes,
        ...featuredArticlesReferenceIncludes 
    ]

    return getEntryByUrl('home_page',locale, cmsUrlPath , refUids, [])
}