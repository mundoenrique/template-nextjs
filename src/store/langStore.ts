import Cookies from 'js-cookie';
import { create } from 'zustand';

type LangState = {
  lang: string;
  changeLang: (lang: string) => void;
};

const defaultLang = Cookies.get('i18Next') || 'es';

export const useLangStore = create<LangState>((set) => ({
  lang: defaultLang,
  changeLang: (lang) => {
    Cookies.set('i18Next', lang);
    set({ lang });
  },
}));
