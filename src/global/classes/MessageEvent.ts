export const MessageEvent = (name: string, data: any = null) => {
  return { name, data: data ? data : null }
}
