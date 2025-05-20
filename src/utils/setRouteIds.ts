export const setRouteIds = (route: string, ids: string[]) => {
  let result = route
  let remainingIds = [...ids]

  // replace the first occurrence of ':id' with the first remaining id
  while (remainingIds.length > 0 && result.includes(':id')) {
    result = result.replace(':id', remainingIds.shift() as string)
  }

  return result
}
