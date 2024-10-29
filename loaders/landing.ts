import { getEntryByUrl } from '@/services'
import { imageCardsReferenceIncludes, teaserReferenceIncludes, textAndImageReferenceIncludes, textJSONRtePaths } from './loaders.helper'

export const getLandingPage = (cmsUrlPath: string | undefined, locale: string | undefined) => {
    const refUids = [
        ...textAndImageReferenceIncludes,
        ...teaserReferenceIncludes,
        ...imageCardsReferenceIncludes
    ]
    const jsonRtePaths = [
        ...textJSONRtePaths
    ]
    
    return getEntryByUrl('landing_page',locale, `${cmsUrlPath}`, refUids, jsonRtePaths)  
}
