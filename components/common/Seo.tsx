import React, { useEffect } from 'react'
import { Page } from '@/types'
import { useLocaleContext } from '@/context'
import packageInfo from '@/package.json'

interface LyticsTrackingProps {
    key: string;
    accountId: string;
}

const LyticsTracking: React.FC<LyticsTrackingProps> = ({ accountId }) => {
    const snippet = `!function(){"use strict";var o=window.jstag||(window.jstag={}),r=[];
function n(e){o[e]=function(){for(var n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];
r.push([e,t])}}n("send"),n("mock"),n("identify"),n("pageView"),n("unblock"),n("getid"),
n("setid"),n("loadEntity"),n("getEntity"),n("on"),n("once"),n("call"),o.loadScript=function(n,t,i){
var e=document.createElement("script");e.async=!0,e.src=n,e.onload=t,e.onerror=i;
var o=document.getElementsByTagName("script")[0],r=o&&o.parentNode||document.head||document.body,
c=o||r.lastChild;return null!=c?r.insertBefore(e,c):r.appendChild(e),this},o.init=function n(t){
return this.config=t,this.loadScript(t.src,function(){if(o.init===n)throw new Error("Load error!");
o.init(o.config),function(){for(var n=0;n<r.length;n++){var t=r[n][0],i=r[n][1];o[t].apply(o,i)}
r=void 0}()}),this}}();

// Define config and initialize Lytics tracking tag.
jstag.init({
    src: 'https://c.lytics.io/api/tag/${accountId}/latest.min.js',
    pageAnalysis: {
        dataLayerPull: {
            disabled: true
        }
    },
    contentStack: {
        entityPush: {
            disabled: false,
            personalizeProjectId: '671ff45f9513ea7dd1e6ba8d',
        }
    }
});

// You may need to send a page view, depending on your use-case
jstag.pageView();`
    useEffect(() => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.text = snippet
        document.head.appendChild(script)
        // Clean up the script when the component unmounts
        return () => {
            document.head.removeChild(script)
        }
    }, [])
    return <></>
}

const SEO: React.FC<Page.SeoProps> = (props: Page.SeoProps) => {
    const {
        seo: { no_follow, no_index, description, canonical_url } = {},
        locale,
        summary,
        url,
        locales
    } = props
    const { currentLocale } = useLocaleContext()

    // version attribute is used for internal purpose and we are adding in meta tag to be visible in DOM
    const { version } = packageInfo

    const alternateMetaLinks = locales?.map((lang: { code: string }) => ({
        hrefLang: lang?.code,
        href: `/${lang?.code}${url}`
    }))

    let robots
    if (no_follow
        && no_index) {
        robots = 'noindex,nofollow'
    } else if (no_follow) {
        robots = 'index,nofollow'
    } else if (no_index) {
        robots = 'noindex,follow'
    } else {
        robots = 'index,follow'
    }

    return (
        <>
            {props?.seo?.title ? (
                <title>{props?.seo?.title}</title>
            ) : (
                <title>{props?.title}</title>
            )}
            <meta name='application-name' content='Universal Demo' />
            <meta charSet='utf-8' />
            <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
            <meta
                name='viewport'
                content='width=device-width,initial-scale=1,minimum-scale=1'
            />
            <meta
                name='description'
                content={summary ? summary : description ? description : ''}
            />
            <meta name='version' content={version ? version : ''} />
            <meta name='robots' content={robots} key='robots' />
            <meta property='og:locale' content={locale || 'en'} />
            <meta httpEquiv='content-language' content={locale} />

            {alternateMetaLinks
                && alternateMetaLinks?.length > 0
                && alternateMetaLinks?.map(
                    (li: { hrefLang: string; href: string }) =>
                        li?.href
                        && li?.hrefLang
                        && li?.hrefLang !== currentLocale && (
                            <link rel='alternate' hrefLang={li.hrefLang} href={li.href} />
                        )
                )}
            <link rel='canonical' href={canonical_url ? canonical_url : url} />
            <link rel='icon' href='/favicon.ico' />
            <LyticsTracking
                key='noalerts'
                accountId='735f0433cdd95e0070ad26650e8d2381'
            />
        </>
    )
}

export { SEO }
