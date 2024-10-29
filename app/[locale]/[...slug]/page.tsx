'use client'
import { useEffect, useState } from 'react'
import {isNull}  from 'lodash'
import { getLandingPage } from '@/loaders'
import { RenderComponents } from '@/components'
import { Page } from '@/types'
import { isDataInLiveEdit } from '@/utils'
import { NotFoundComponent, PageWrapper } from '@/components'
import { onEntryChange } from '@/config'
import useRouterHook from '@/hooks/useRouterHook'
import { setDataForChromeExtension } from '@/utils'

export default function LandingPage () {

    const [data, setData] = useState<Page.LandingPage['entry'] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const {path, locale} = useRouterHook()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getLandingPage(path, locale)
                setData(res)
                setDataForChromeExtension({ entryUid: res?.uid, contenttype: 'landing_page', locale: locale })
                if (!res && !isNull(res)) {
                    throw '404'
                }
            }
            catch (err) {
                console.error('Error while fetching Landing page : ', err)
                setLoading(false)
            }
        }
        onEntryChange(fetchData)
    }, [path])


    return (<>
        {data
            ? <PageWrapper {...data} contentType='landing_page'>
                {data?.components && Object.keys(data.components)?.length
                    ? <RenderComponents
                        components={data?.components}
                    /> : ''}
            </PageWrapper>
            : <>
                {!loading && !isDataInLiveEdit() && <NotFoundComponent />}
            </>}
    </>
    )
}
