import type { Middleware } from 'src/clients'

export const parseErrorMiddleware: Middleware = {
  post: async (ctx) => {
    if (!ctx.response.ok) {
      return Promise.reject(ctx.response)
    } else {
      return Promise.resolve(ctx.response)
    }
  },
}
