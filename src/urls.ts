import { URL } from './sharedTypes/types'

/**
 * Return apis, you can add as many as you want but the response structure needs to be
 * consider.
 */
export const getUrls = (): Array<URL> => {
  return [
    { hel: 'http://api.hel.fi/linkedevents/v1' },
    { fina: 'https://api.finna.fi/api/v1' }
  ]
}


