export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minut = date.getMinutes()

  return `${hour}:${minut} ${day}.${month}.${year}`
}
