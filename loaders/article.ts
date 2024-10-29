import _ from 'lodash'
import { getEntries, getEntryByUrl } from '@/services/contentstack'
import { Taxonomy } from '@/types/pages'
import { articleJSONRtePathIncludes } from './loaders.helper'

export const getArticle = (cmsUrlPath: string | undefined, locale: string | undefined) => {
    const jsonRtePaths = [...articleJSONRtePathIncludes]
    return getEntryByUrl('article', locale, `${cmsUrlPath}`, [], jsonRtePaths)  
}

export const getArticles = (locale?: string , taxonomies?:Taxonomy[], limit?: number) => {
    const groupedData = _.groupBy(taxonomies, 'taxonomy_uid')
    const outputData:any = _.map(groupedData, (terms:string, taxonomy_uid:string) : {taxonomy_uid:string, term_uids:string[]}=> ({
        'taxonomy_uid': taxonomy_uid,
        'term_uids': _.map(terms, 'term_uid')
    }))

    const filterQuery = outputData?.length && outputData?.map((dt :  {taxonomy_uid:string, term_uids:string[]}) => ({[`taxonomies.${dt.taxonomy_uid}`]: dt.term_uids }))

    return getEntries('article', locale, [], [], {
        queryOperator: 'or',
        filterQuery
    },limit)  
}

export const getArticlesByTaxonomy = async (taxonomyPath: string , locale?: string) => {
    const pathArray = taxonomyPath.split('/')
    const uid = pathArray?.[2]
    const term = pathArray?.[3]?.replaceAll('-', '_')

    if (!term) { //check if term exist in url
        throw new Error('Invalid parameters. Valid pageUrl format is /articles/taxonomy_uid/term')
    }

    const filterQuery = { key: `taxonomies.${uid}`, value: term }
    return getEntries('article', locale, [], [], { filterQuery })

}