import { PARAMS, RESPONSE } from '../sharedTypes/types'
import { getUrls } from '../urls'
import axios from 'axios' // axios

/**
 *
 * @param queryString
 * @return Promise<RESPONSE>
 */
export const _search = async (queryString: string): Promise<RESPONSE> => {
  let params: PARAMS | null = null
  const axiosPromises: Promise<any>[] = [] // will contain apis response data
  const URLs = getUrls()
  URLs.forEach((url) => {
    // check url to set the parameters for calling the api.
    if (url.hel) {
      params = {
        format: 'json',
        q: queryString
      }
      axiosPromises.push(getPromise(url.hel, params))
    } else if (url.fina) {
      params = {
        lookfor: queryString
      }
      axiosPromises.push(getPromise(url.fina, params))
    }
  })
  /**
     * @todo create type for api responses
     * call all the promises, here we need to check the response structure for instance
     * response[0] has response[0].data.data array for the records
     * response[1] has response[0].data.records array for the records
     */
  return axios.all(axiosPromises)
    .then(axios.spread((...responses: any[]) => {
      const mergedResponses = []
      if (typeof responses[0].data.data !== 'undefined' && responses[0].data.data.length > 0) {
        responses[0].data.data.forEach((item) => {
          if (verifyObjectProp(item, 'id') && verifyObjectProp(item.short_description, 'fi')) {
            // es6 way of object destruction.
            const subSet = ((name, short_description, apiUrl) => ({ name, short_description, apiUrl }))(item.id, item.short_description.fi, 'Hel.fi')
            mergedResponses.push(subSet)
          }
        })
      }
      if (typeof responses[1].data.records !== 'undefined' && responses[1].data.records.length > 0) {
        responses[1].data.records.forEach((item) => {
          if (verifyObjectProp(item, 'title') && verifyObjectProp(item, 'subjects')) {
            const subSet = ((name, short_description, apiUrl) => ({ name, short_description, apiUrl }))(item.title, item.subjects, 'Finna.fi')
            mergedResponses.push(subSet)
          }
        })
      }
      return {
        success: true,
        totalCount: mergedResponses.length,
        records: mergedResponses,
        status: 200
      }
    }))
    .catch((error: RESPONSE) => {
      const response: RESPONSE = {
        name: error.name,
        message: error.message,
        success: false
      }
      return response
    })
}

/**
 *
 * @param url
 * @param params
 * @return Promise<any>
 */
const getPromise = async (url: string, params: PARAMS): Promise<any> => {
  return await axios.get(`${url}/search`, {
    params
  })
}

/**
 * Recursive function , for nested object property is not undefined or null
 * @param object
 * @param name
 * @return {boolean}
 */
const verifyObjectProp = (object: any, name: string): boolean => {
  let bol = true
  const recursion = (object: any, current?: string) => {
    if (object) {
      for (const key in object) {
        if (key === name) {
          const value = object[key]
          if (value !== 'undefined') {
            if (value && typeof value === 'object') {
              recursion(value, name)
            } else {
              bol = true
            }
          } else {
            bol = false
          }
        }
      }
    } else {
      bol = false
    }
  }
  recursion(object)
  return bol
}
