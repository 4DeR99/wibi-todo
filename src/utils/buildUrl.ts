import urlJoin from 'url-join'

interface IParam {
  key: string
  value: string
}

export const buildUrl = (
  baseUrl: string,
  urlExtention: string,
  paramList: IParam[],
) => {
  const joinedUrl = urlJoin(baseUrl, urlExtention)
  const url = new URL(joinedUrl)

  const params = new URLSearchParams(url.search)

  paramList.forEach((param) => {
    params.append(param.key, param.value)
  })

  url.search = params.toString()

  return url.toString()
}
