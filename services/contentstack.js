import _ from 'lodash'
import { addEditableTags, jsonToHTML } from '@contentstack/utils'
import { isEditButtonsEnabled, Stack } from '@/config'

/**
  *
  * fetches all the entries from specific content-type
  * @param {* content-type uid} contentTypeUid
  * @param {* locale} locale
  * @param {* reference field name} referenceFieldPath
  * @param {* Json RTE path} jsonRtePath
  * @param {* containedInQuery} query
  *
  */
export const getEntries = async (contentTypeUid, locale, referenceFieldPath, jsonRtePath, query, limit=0) => {
    try {    
        let result    
        if(!Stack) {
            throw new Error('===== No stack initialization found====== \n check environment variables: \
            CONTENTSTACK_API_KEY, CONTENTSTACK_DELIVERY_TOKEN, CONTENTSTACK_PREVIEW_TOKEN, CONTENTSTACK_PREVIEW_HOST, CONTENTSTACK_ENVIRONMENT')
        }
        const entryQuery = Stack.ContentType(contentTypeUid)
            .Query()
            .language(locale)

        if (entryQuery) {
            if (referenceFieldPath) entryQuery.includeReference(referenceFieldPath)
            if (query?.filterQuery?.length > 0 && query.queryOperator === 'or') { // filterQuery is an array of object consisting key:value pair

                const queries = query?.filterQuery?.map((q) => { 
                    if (typeof Object.values(q)?.[0] === 'string') {
                        return Stack.ContentType(contentTypeUid).Query().where(Object.keys(q)?.[0], Object.values(q)?.[0])
                    }
                    return Stack.ContentType(contentTypeUid).Query().containedIn(Object.keys(q)?.[0], Object.values(q)?.[0])
                })
                entryQuery.or(...queries)
            } 
            if (query?.filterQuery?.key && query?.filterQuery?.value) { // filterQuery is an object consisting key value pair
                entryQuery.where(query.filterQuery.key, query.filterQuery.value)
            }

            // fetching entries based on limit for related articles (not to overload payload)
            if (limit !== 0) entryQuery.limit(limit)

            result = await entryQuery
                .includeFallback()
                .toJSON()
                .includeEmbeddedItems()
                .addParam('include_metadata', 'true')
                .find()
            if (jsonRtePath) {
                jsonToHTML({
                    entry: result,
                    paths: jsonRtePath
                })
            }
            if (result?.length > 0 && _.isEmpty(result[0])) {
                throw '404 | Not found'
            }
            isEditButtonsEnabled && result?.[0]?.forEach((entry) => {
                return addEditableTags(entry, contentTypeUid, true, locale)
            })
            const data = result[0]
            return data
        }
    }
    catch (error) {
        if (error?.error_message) throw new Error(JSON.stringify(error))
        else throw error
    }
}


/**
 *
 * fetches all the entries from specific content-type
 * @param {* content-type uid} contentTypeUid
 * @param {* locale} locale
 * @param {* entryUrl} entryUrl
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 *
 */
export const getEntryByUrl = async (contentTypeUid, locale, entryUrl, referenceFieldPath, jsonRtePath) => {
    try {
        let result
        if (!Stack) {
            throw new Error('===== No stack initialization found====== \n check environment variables: \
            CONTENTSTACK_API_KEY, CONTENTSTACK_DELIVERY_TOKEN, CONTENTSTACK_PREVIEW_TOKEN, CONTENTSTACK_PREVIEW_HOST, CONTENTSTACK_ENVIRONMENT')
        }
        const entryQuery = Stack.ContentType(contentTypeUid)
            .Query()
            .language(locale)

        if (entryQuery) {
            if (referenceFieldPath) entryQuery.includeReference(referenceFieldPath)
            result = await entryQuery
                .includeFallback()
                .where('url', `${entryUrl}`)
                .toJSON()
                .includeEmbeddedItems()
                .addParam('include_metadata', 'true')
                .find()
            if (jsonRtePath) {
                jsonToHTML({
                    entry: result,
                    paths: jsonRtePath
                })
            }
        
            if (result?.length > 0 && _.isEmpty(result[0])) {
                throw '404 | Not found'
            }
        
            isEditButtonsEnabled && addEditableTags(result[0][0], contentTypeUid, true, locale)
            const data = result[0][0]
            return data
        }
    }
    catch (error) {
        if (error?.error_message) throw new Error(JSON.stringify(error))
        else throw error
    }
}


/**
 *
 * fetches all the entries from specific content-type
 * @param {* content-type uid} contentTypeUid
 * @param {* locale} locale
 * @param {* entryUid} entryUid
 * @param {* reference field name} referenceFieldPath
 * @param {* Json RTE path} jsonRtePath
 *
 */
export const getEntryByUID = async (contentTypeUid, locale, entryUid, referenceFieldPath, jsonRtePath) => {
    try {
        let result
        if (!Stack) {
            throw new Error('===== No stack initialization found====== \n check environment variables: \
            CONTENTSTACK_API_KEY, CONTENTSTACK_DELIVERY_TOKEN, CONTENTSTACK_PREVIEW_TOKEN, CONTENTSTACK_PREVIEW_HOST, CONTENTSTACK_ENVIRONMENT')
        }
        const entryQuery = Stack.ContentType(contentTypeUid)
            .Entry(entryUid)
            .language(locale)

        if (entryQuery) {
            if (referenceFieldPath) entryQuery.includeReference(referenceFieldPath)

            result = await entryQuery
                .includeFallback()
                .toJSON()
                .fetch()
                
            if (jsonRtePath) {
                jsonToHTML({
                    entry: result,
                    paths: jsonRtePath
                })
            }

            isEditButtonsEnabled && addEditableTags(result, contentTypeUid, true, locale)
            return result
        }
    }
    catch (error) {
        if (error?.error_message) throw new Error(JSON.stringify(error))
        else throw error
    }
}