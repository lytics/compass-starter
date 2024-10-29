'use client'
import React, { useEffect, useState } from 'react'
import { SEO } from '@/components'
import { SeoProps } from '@/types/pages'
import { getJsonCookie } from '@/utils'
import { localeCookieName } from '@/config'


const PageWrapper:React.FC<SeoProps & React.PropsWithChildren> = ({ locale, title, summary, url, seo, children}: SeoProps & React.PropsWithChildren) => {
    const [locales, setLocales] = useState<SeoProps['locales']>([])

    useEffect(() => {
        const localesArray = getJsonCookie(localeCookieName)
        localesArray?.length > 0 && setLocales(localesArray)
    },[])

    return <>
        <SEO
            url={url}
            locale={locale}
            title={title}
            seo={seo}
            summary={summary}
            locales={locales}
        />
        {children}
    </>
}

export { PageWrapper }