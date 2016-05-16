const ROOT = process.env.API_URL || 'http://localhost:3000'
export const CATEGORIES = `${ROOT}/categories.json`
export const STORIES = `${ROOT}/stories.json`
export const CATEGORY = (id) => { return `${ROOT}/categories/${id}.json` }
