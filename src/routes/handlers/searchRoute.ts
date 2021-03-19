import { Request, Response } from 'express'
import { _search } from '../../controllers/searchController'
import { RESPONSE } from '../../sharedTypes/types'

export const handleSearch = (request: Request, response: Response) => {
  // Holds value of the query param 'search query'.
  const searchQuery: string | any = typeof request.query !== 'undefined' ? request.query : null
  const queryStringSize = verifyQueryParameters(searchQuery)
  let jsonResponse: RESPONSE = null

  if (queryStringSize > 1) {
    jsonResponse = {
      success: false,
      message: 'Sorry we can not find what you are looking. Please try with only q query parameter',
      status: 404
    }
    response.status(404)
    response.json(jsonResponse)
  } else if (searchQuery && typeof searchQuery.q !== 'undefined') {
    _search(encodeURIComponent(searchQuery.q)).then((res) => {
      if (res && typeof res.name !== 'undefined' && res.name === 'Error') {
        jsonResponse = {
          success: false,
          message: res.message,
          status: 404
        }
        response.status(400)
        response.json(jsonResponse)
      } else if (res) {
        jsonResponse = {
          success: true,
          totalCount: res.totalCount,
          records: res.records.length > 0 ? res.records : null,
          status: 200
        }
        response.status(200)
        response.json(jsonResponse)
      }
    })
  } else {
    jsonResponse = {
      success: false,
      message: 'Sorry we can not find what you are looking. Please try with only q query parameter',
      status: 400
    }
    response.status(400)
    response.json(jsonResponse)
  }
}

/**
 * Get request Parameters size
 * @param queryStrings
 */
const verifyQueryParameters = (queryStrings: any) => {
  let size = 0
  let key
  for (key in queryStrings) {
    // eslint-disable-next-line no-prototype-builtins
    if (queryStrings && queryStrings.hasOwnProperty(key)) size++
  }
  return size
}
