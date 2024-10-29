import { Link } from '@/components'
import { CallToAction } from '@/types/components'
import { classNames } from '@/utils'

const CTAGroup = (cta_group: { call_to_action?: CallToAction[] }) => (<>
    {cta_group && <div className='absolute bottom-0 bg-gray-50 w-[90%] lg:relative lg:w-full'>
        <div className='mx-auto xl:max-w-[1350px] mx-auto max-w-7xl sm:px-4 sm:pb-8 lg:px-8 lg:py-0'>
            <div className={classNames(
                'grid', 
                `${cta_group?.call_to_action?.length && cta_group?.call_to_action?.length < 3 ? `lg:grid-cols-${cta_group?.call_to_action?.length}`: 'lg:grid-cols-3'}`,
                'divide-x divide-gray-900/5 border-x border-gray-900/5 border-r-0 border-l-0 sm:grid-cols-1'
            )}>
                {cta_group?.call_to_action?.map((ctaItem:CallToAction) => (
                    <Link
                        key={ctaItem.text}
                        url={ctaItem?.internal_link?.[0] ? ctaItem?.internal_link?.[0]?.url : ctaItem?.external_link || ''}
                        className='flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold font-montserrat leading-6 text-gray-900 hover:bg-gray-100'
                        $={ctaItem?.$?.text}
                    >
                        {/*  eslint-disable-next-line @next/next/no-img-element */}
                        {ctaItem?.icon?.url && <img
                            src={ctaItem.icon.url}
                            alt={ctaItem.icon.title}
                            className='h-5 w-5 flex-none text-gray-400'
                            aria-hidden='true' />}
                        {ctaItem.text}
                    </Link>

                ))}
            </div>
        </div>
    </div>}
</>)

export {CTAGroup}