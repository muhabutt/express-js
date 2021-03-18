import { Router } from 'express'
import { handleSearch } from './handlers/searchRoute'

const searchRouter = Router()

/**
 * Search get route and handler
 */
searchRouter.get('/search', handleSearch)

export default searchRouter
