import { Link } from '@/components'

const NoArticles:React.FC = () => {
    return <div id='no-articles' className='flex flex-col text-sm w-full text-center px-8'>
        <p data-id='paragraph-text' className='mx-auto my-auto py-32 block border-t-2 border-gray-200'>
            0 Article(s) Found &nbsp;
            <Link url='/articles' className='font-semibold'>
                Browse All <span aria-hidden='true'>&rarr;</span>
            </Link>
        </p>
    </div>
}

export { NoArticles }