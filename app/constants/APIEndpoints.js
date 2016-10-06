// const ROOT = process.env.MTTRS_API_URL || 'https://api.mtt.rs'
export const ROOT = process.env.MTTRS_API_URL || 'http://localhost:3000'
export const GRAPHQL = `${ROOT}/graphql`
export const CATEGORIES = `${ROOT}/categories.json`
export const PUBLISHERS = `${ROOT}/publishers.json`
export const STORIES = `${ROOT}/stories.json`
export const CATEGORY = (id) => { return `${ROOT}/categories/${id}.json` }
export const PUBLISHER = (id) => { return `${ROOT}/publishers/${id}.json` }
