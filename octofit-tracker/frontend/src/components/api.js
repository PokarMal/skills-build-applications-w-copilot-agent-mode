const codespaceName = (import.meta.env.VITE_CODESPACE_NAME || '').trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const candidateKeys = ['results', 'items', 'data', 'docs']
  for (const key of candidateKeys) {
    if (Array.isArray(payload[key])) {
      return payload[key]
    }
  }

  return []
}

export async function fetchCollection(resourcePath) {
  const response = await fetch(`${apiBaseUrl}/${resourcePath}/`)
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }

  const payload = await response.json()
  return normalizeCollection(payload)
}
