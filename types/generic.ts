import { ReactNode } from 'react'
import { FallbackProps } from 'react-error-boundary'

import { Asset } from './common'


export interface serverSideProps  {
  resolvedUrl: string,
  query: {
      live_preview?:string;
      content_type_uid?:string;
      entry_uid?:string;
  }
  locale: string
}

export interface ErrorHandlerType extends FallbackProps {
  componentStack?:ReactNode
}

export interface StackProps {
  live_preview: {
    [key: string]: any
  }
  headers: {
    api_key: any
  },
  environment: any
}
export interface IsoLangs {
  [key: string]: {
    name: string
    nativeName: string
  }
}

export type ChildrenProps = {
  children: ReactNode;
};


export type LanguageSelector = {
  background_image: Asset
}
export interface Market {
  code: string
  description: string
  locales: Locale[]
}

export interface Locale{
  locale_name:string
  allow_fallback:boolean
}
export interface ContentstackContextType {
  lpTs: number
}
export interface RoutingContextType {
  cmsPageUrl: string
  currentLocale:Intl.Locale
  currentlocaleName:string
}
export interface MyErrorContextType {
  error: string | null
  updateError: (value: string) => void
}
export interface Localization {
  defaultLocale: Intl.Locale
  defaultLocaleName: string
  currentLocale: Intl.Locale
  currentlocaleName: string
}
