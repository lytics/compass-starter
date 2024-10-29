import { FunctionComponent } from 'react'
import parse from 'html-react-parser'

import { Text as TextType } from '@/types/components'

const Text: FunctionComponent<TextType> = (props: TextType) => {
    const { $, content, styles, id } = props

    return (
        content && typeof content === 'string'
            ? <div 
                id={id?.toString()} 
                className={`my-16 px-8 ${styles?.background_color === 'secondary' ? 'bg-background-secondary' : 'bg-background-primary'} dark:bg-transparent`}> 
                <div className='text max-w-7xl mx-auto' {...$?.content}>{parse(content)}</div>
            </div> 
            : <></>
    )
}

export { Text }