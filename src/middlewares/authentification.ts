import { User } from 'oidc-client-ts'
import type { FetchParams, Middleware } from 'src/clients'

export function authenticationMiddleware(user: User): Middleware {
  return {
    pre: async (ctx): Promise<FetchParams | void> => {
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
  }
}
