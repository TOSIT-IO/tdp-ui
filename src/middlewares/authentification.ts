import type { FetchParams, Middleware } from 'src/clients'
import { getUser } from 'src/utils'

export const authenticationMiddleware: Middleware = {
  pre: async (ctx): Promise<FetchParams | void> => {
    const user = getUser()
    return {
      ...ctx,
      init: {
        ...ctx.init,
        headers: new Headers({
          ...ctx.init.headers,
          Authorization: `Bearer ${user.access_token}`,
        }),
      },
    }
  },
  post(ctx): Promise<Response | void> {
    return Promise.resolve(ctx.response)
  },
}
