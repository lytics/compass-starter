'use server'
import { Generic } from '@/types'

const ErrorHandler = ({ error, resetErrorBoundary, componentStack }: Generic.ErrorHandlerType) => (
    <div>
        <h1>An error occurred</h1>
        <pre>{error.message}</pre>
        <pre>{componentStack}</pre>
        <button onClick={resetErrorBoundary}>Try again</button>
    </div>
)

export {ErrorHandler}