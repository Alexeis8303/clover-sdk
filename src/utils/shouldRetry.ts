export function shouldRetry(status: number): boolean {

  if (status === 429) return true

  if (status >= 500 && status <= 599) return true

  return false
}