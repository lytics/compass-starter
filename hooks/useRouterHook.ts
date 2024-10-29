'use client'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getJsonCookie } from '@/utils'
import { localeCookieName } from '@/config'

const useRouterHook = () => {
    const [localesCodeArray, setlocalesCodeArray] = useState<string[]>([])
    const Router = useRouter()
    const Pathname = usePathname()
    const Params = useParams()
    const SearchParams = useSearchParams()

    useEffect(() => {
        const locales = getJsonCookie(localeCookieName)
        locales?.length > 0 && setlocalesCodeArray(locales.map((loc: { code: string }) => loc.code))
    },[])
    
    const getLocale = () => { // returns current locale from params
        return Params?.locale as string
    }

    const getUnlocalizedPath = () => {
        const isHomePage = Pathname?.length === 3 || (Pathname?.length === 6 && Pathname.indexOf('-') === 3)
        const isLocaleInPath = localesCodeArray?.includes(getLocale())

        if (isHomePage && isLocaleInPath) {
            return '/'
        } else if (Pathname?.length && localesCodeArray?.length > 0) {
            return Pathname.split('/').filter(slug => !localesCodeArray?.includes(slug)).join('/')
        } else {
            const startIndex = Pathname?.indexOf('-') === 3 ? 6 : 3
            return Pathname?.length > startIndex ? Pathname.substring(startIndex) : '/'
        }
    }

    const getLocalizedPath = () => {
        return Pathname
    }

    const getStringfiedSearchParams = () => {
        return SearchParams?.toString()?.length ? `?${SearchParams.toString()}` : ''
    }

    return {
        path: getUnlocalizedPath(),
        locale: getLocale(),
        localizedPath: getLocalizedPath(),
        searchParams: SearchParams,
        stringfiedSearchParams: getStringfiedSearchParams(),
        ...Router

    }
}

export default useRouterHook