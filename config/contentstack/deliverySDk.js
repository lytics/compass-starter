import Contentstack from 'contentstack'
import ContentstackLivePreview from '@contentstack/live-preview-utils'

export const Stack = (process.env.CONTENTSTACK_API_KEY && process.env.CONTENTSTACK_DELIVERY_TOKEN) && Contentstack.Stack({
    api_key: process.env.CONTENTSTACK_API_KEY,
    delivery_token: process.env.CONTENTSTACK_DELIVERY_TOKEN,
    environment: process.env.CONTENTSTACK_ENVIRONMENT,
    branch: process.env.CONTENTSTACK_BRANCH,
    live_preview: {
        enable: true,
        host: process.env.CONTENTSTACK_PREVIEW_HOST,
        preview_token: process.env.CONTENTSTACK_PREVIEW_TOKEN
    }
})

process.env.CONTENTSTACK_HOST && Stack.setHost(process.env.CONTENTSTACK_HOST)

ContentstackLivePreview.init({
    clientUrlParams: { host: process.env.CONTENTSTACK_APP_HOST },
    stackDetails: {
        apiKey: process.env.CONTENTSTACK_API_KEY,
        environment: process.env.CONTENTSTACK_ENVIRONMENT,
        branch: process.env.CONTENTSTACK_BRANCH
    },
    stackSdk: Stack,
    ssr: false
})

export const onEntryChange = ContentstackLivePreview.onEntryChange
export const isLivePreviewEnabled= process.env.isLivePreviewEnabled === 'true'
export const isEditButtonsEnabled= process.env.isEditButtonsEnabled === 'true'
