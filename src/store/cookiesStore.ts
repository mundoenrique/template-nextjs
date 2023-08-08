import { useState } from 'react';
import Cookies from 'js-cookie'
import {create} from 'zustand'

interface cookiesState {
  necessaryCookies: string,
  analyticsCookies: string,
  onlyNecessary: () => void,
  acceptAll: () => void,
  removeCookies: () => void
}

const nCookies = Cookies.get('necessaryCookies')
const aCookies = Cookies.get('analyticsCookies');

export const useCookiesStore = create<cookiesState>((set) => ({
  necessaryCookies: nCookies,
  analyticsCookies: aCookies,
  onlyNecessary: (necessaryCookies:string) => {
    Cookies.set('necessaryCookies', necessaryCookies)
    set({necessaryCookies: necessaryCookies})
    // showModal(false);
  },
  acceptAll: (allCookies:string) => {
    Cookies.set('necessaryCookies', allCookies)
    Cookies.set('analyticsCookies', allCookies)
    set({necessaryCookies: allCookies, analyticsCookies: allCookies})
    // showModal(false)
  },
  removeCookies: (remove:string) => {
    Cookies.remove('necessaryCookies')
    Cookies.remove('analyticsCookies')
    set({necessaryCookies: remove, analyticsCookies: remove})
  }
}))
