import { CardCollectionHeader as CardCollectionHeaderType} from '@/types/components'
// import { Header as HeaderProps } from '@/types/components'

const CardCollectionHeader: React.FC<CardCollectionHeaderType> = (props: CardCollectionHeaderType) => {
    const { $, heading, sub_heading } = props

    return (
        <div className='relative mx-auto flex max-w-4xl flex-col items-center text-center my-24'>
            {heading && <h2
                data-id='h2-text'
                {...$?.heading}
                className='text-[32px] font-montserrat font-semibold text-black dark:text-white leading-[48px]'
            >
                {heading}
            </h2>}
            {sub_heading && <p
                data-id='paragraph-text'
                className='mt-7 uppercase text-sm font-semibold tracking-wider text-black/50 !leading-[20px]'
                {...$?.sub_heading}
            >
                {sub_heading}
            </p>}
        </div>
    )
}


export { CardCollectionHeader }