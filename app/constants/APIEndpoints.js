const ROOT = process.env.MTTRS_API_URL || 'http://localhost:3000' || 'https://api.mtt.rs'
export const CATEGORIES = `${ROOT}/categories.json`
export const PUBLISHERS = `${ROOT}/publishers.json`
export const STORIES = `${ROOT}/stories.json`
export const CATEGORY = (id) => { return `${ROOT}/categories/${id}.json` }
