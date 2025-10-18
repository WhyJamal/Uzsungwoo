export function formatDate(isoString: string, withTime = true): string {
    if (!isoString) return ''
  
    const date = new Date(isoString)
    if (isNaN(date.getTime())) return isoString
  
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
  
    if (!withTime) return `${day}.${month}.${year}`
  
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
  
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`
  }
  