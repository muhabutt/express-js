/**
 * Type for api's currently we are using two apis
 */
export type URL = {
    hel?: string,
    fina?: string
};

/**
 * Types for hel api and fina api
 */
export type PARAMS = {
    format?: string,
    q?: string,
    lookfor?: string
}

export type RESPONSE = {
    success?: boolean,
    totalCount?: number,
    records?: any[] | null,
    name?: string | null,
    message?: string | null,
    status?: number
}
