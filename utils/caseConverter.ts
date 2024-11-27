export function toCamelCase(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item))
  } else if (obj !== null && typeof obj === 'object') {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase())
      acc[camelKey] = toCamelCase(value)
      return acc
    }, {} as Record<string, any>)
  }
  return obj
}