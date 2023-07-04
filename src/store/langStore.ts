import Cookies from 'js-cookie'
import {create} from 'zustand'

interface LangState {
lang: string
changeLang: (lang: string) => void
}

const defaultLang = Cookies.get('i18Next') || 'es'

export const useLangStore = create<LangState>((set) => ({
  lang: defaultLang,
  changeLang: (lang:string) => {
    Cookies.set('i18Next', lang)
    set({lang})
  }
}))