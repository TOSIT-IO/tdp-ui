import { toast } from 'react-toastify'
import type { Middleware } from 'src/clients'

export const toastErrorMiddleware: Middleware = {
  post: async (ctx) => {
    if (!ctx.response.ok) {
      const res = await ctx.response.json()
      toast.error(res.detail)
    }
  },
}
