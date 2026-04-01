export async function* autoPaginate<T>(
  fetchPage: (offset: number, limit: number) => Promise<{ elements: T[] }>,
  limit: number = 100
): AsyncGenerator<T> {

  let offset = 0

  while (true) {

    const page = await fetchPage(offset, limit)

    const items = page.elements || []

    if (items.length === 0) {
      return
    }

    for (const item of items) {
      yield item
    }

    offset += items.length
  }
}