import Cookies from 'js-cookie'
import {create} from 'zustand'
import { log_message } from "@/utils";
interface LangState {
lang: string
changeLang: (lang: string) => void
}

const defaultLang = Cookies.get('i18Next') || 'es';

export const useLangStore = create<LangState>((set) => ({
  lang: defaultLang,
  changeLang: (lang:string) => {
   log_message(`Realiza cambio de idioma - ${lang}`)
    Cookies.set('i18Next', lang)
    set({lang})
  }
}))
