// get recommended entries from lytics recommendation api

//import _ from 'lodash'

const lyticsGlobalCollectionId = '1e74f3512f34c254e38f421efcfaf323'
const lyticsAccountId = '735f0433cdd95e0070ad26650e8d2381'

// getRecommendation takes a cookie value and executes a recommendation request against a Lytics recommendation API
export const getRecommendations = async (collectionId) => {
// /api/content/recommend/:acctid/user/:fieldName/:fieldVal
    collectionId = collectionId || lyticsGlobalCollectionId
    const url = 'https://api.lytics.io/api/content/recommend/' + lyticsAccountId + '/user/_uids/' + getLyticsCookie() + '?limit=5&contentsegment=' + collectionId
    const headers = {
        'Content-Type': 'application/json'
    }
    const response = await fetch(url, {
        method: 'GET',
        headers
    })
    return response.json()
}

// lyticsUrl: www.domain.com/en/article/tokyo-tower-a-majestic-icon-embracing-the-skyline
// entryUrl: /article/tokyo-tower-a-majestic-icon-embracing-the-skyline
export const lyticsUrlToEntryUrl = (lyticsUrl, locale = 'en') => {
    let parts = lyticsUrl.split('/' + locale)
    return parts[1]
}

export const getLyticsCookie = () => {
    const match = document.cookie.match('(^|;)\\s*seerid\\s*=\\s*([^;]+)')
    return match ? match[2] : null
}