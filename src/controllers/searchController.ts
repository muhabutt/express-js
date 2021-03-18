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
      let mergedResponses = []
      if (typeof responses[0].data.data !== 'undefined' && responses[0].data.data.length > 0) {
        mergedResponses = responses[0].data.data
      }
      if (typeof responses[1].data.records !== 'undefined' && responses[1].data.records.length > 0) {
        mergedResponses = mergedResponses.concat(responses[1].data.records)
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
