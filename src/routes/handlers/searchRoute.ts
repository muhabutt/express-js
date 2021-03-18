import { Request, Response } from 'express'
import { _search } from '../../controllers/searchController'
import { RESPONSE } from '../../sharedTypes/types'

export const handleSearch = (request: Request, response: Response) => {
  // Holds value of the query param 'search query'.
  const searchQuery: string | any = typeof request.query !== 'undefined' ? request.query.q : null

  if (searchQuery !== null) {
    _search(searchQuery).then((res) => {
      if (res && typeof res.name !== 'undefined' && res.name === 'Error') {
        const errorResponse: RESPONSE = {
          success: false,
          message: res.message,
          status: 400
        }
        response.status(400)
        response.json(errorResponse)
      } else if (res) {
        const jsonResponse: RESPONSE = {
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
    response.end()
  }
}
