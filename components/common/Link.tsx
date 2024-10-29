import { buildLinkUrl } from '@/utils'
import { LinkComponent as LinkComponentType } from '@/types/components'
import { useLocaleContext } from '@/context'

const LinkComponent: React.FC<LinkComponentType> = (props: LinkComponentType) => {
    const { url, children, className, target,  $ } = props
    const elemattr = {className, target: target || '_self', ['data-title']: props?.['data-title'], ...$ }

    const { currentLocale } = useLocaleContext()
    
    let internal_link, external_link
    if ( typeof url !== 'string') {
        internal_link = url
    } else {
        external_link = url
    }
    
    const href = buildLinkUrl(internal_link, external_link, currentLocale)
    
    const LinkWrapper = () => <a data-id='link-href' href={`${href}`} {...elemattr}>
        {children}
    </a>

    const LinkPlaceholder = () => {
        
        elemattr.className = className + '!cursor-default hover:!no-underline hover:!border-transparent'

        return(
            <span data-id='link-placeholder' {...elemattr}>
                {children}
            </span>
        )

    }

    return (<>{href ? <LinkWrapper /> : <LinkPlaceholder />}</>)
}
export { LinkComponent }