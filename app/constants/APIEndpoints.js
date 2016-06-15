const ROOT = process.env.API_URL || 'http://127.0.0.1:4000'
export const CATEGORIES = `${ROOT}/categories.json`
export const PUBLISHERS = `${ROOT}/publishers.json`
export const STORIES = `${ROOT}/stories.json`
export const CATEGORY = (id) => { return `${ROOT}/categories/${id}.json` }
