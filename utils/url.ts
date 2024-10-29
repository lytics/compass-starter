'use client'

import _, { isString } from 'lodash'
import { Cta, InternalLink } from '@/types/components'

export const resolveCardCta = (cta?: string | Cta) => {
    if(!cta) return
    if(isString(cta) ) return cta
    if(cta?.link && cta?.link?.length >= 0) return cta.link
}

export const resolveCta = (cta?:Cta[]) => {
    if(!cta) return
    if(cta?.length > 0 && cta?.[0]?.link && cta?.[0]?.link?.length > 0) return cta[0].link as InternalLink[]
    if(cta?.[0]?.external_url) return cta?.[0]?.external_url as string
}

export const buildLinkUrl = (internalLink?: InternalLink[], url?: string, locale?: string) => {
    let result = ''

    if (internalLink && internalLink.length) {
        if (internalLink[0].url) {
            result = internalLink[0].url
            if (url) {
                if (url.startsWith('?')) {
                    result = result.concat(url)
                } else {
                    if (!_.isEmpty(url)) {
                        console.debug('URL field information not used - no valid Query Parameters found', url)
                    }
                }
            }
        } else {
            console.error('Internal link not resolved', internalLink)
        }
        if (locale) {
            result = `/${locale}${result}`
        }
    } else if (url && (url.startsWith('https://') || url.startsWith('http://') || url.startsWith('/'))) {
        result = url
    } else if (url && url.startsWith('www.')) {
        result = 'https://'.concat(url)
    } else {
        if (!_.isEmpty(url)) {
            console.debug('Static URL is not valid', url)
        }
    }

    if(url && !(url.startsWith('https://') || url.startsWith('http://')) && !url.startsWith('www.')) {

        if (locale) {

            result = `/${locale}${result}`

        }

    } 

    return result

}
export const getUnlocalizedRelativePath = (path: string, locale?: string): string => {
    if (locale) {
        return path.substring(path.lastIndexOf(locale) + locale.length)
    } else {
        return path
    }
}