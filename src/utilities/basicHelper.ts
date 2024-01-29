export const getPathname = (path: string, index: number): string => {
  return path.split("/")[index]
}
export const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()
export const parseClone = (data: any) => {
  return JSON.parse(JSON.stringify(data))
}
