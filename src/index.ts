import { Hono } from 'hono'
import userRouter from './router/user-route'
import { ZodError } from 'zod'
import { HTTPException } from 'hono/http-exception'

const app = new Hono().basePath('/api')

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', userRouter)

app.onError(async (err, c) => {
  if (err instanceof HTTPException) {
      c.status(err.status)
      return c.json({
          errors: err.message
      })
  } else if (err instanceof ZodError) {
      c.status(400)
      return c.json({
          errors: err.message
      })
  } else {
      c.status(500)
      return c.json({
          errors: err.message
      })
  }
})
export default { 
  port: 3001, 
  fetch: app.fetch, 
} 