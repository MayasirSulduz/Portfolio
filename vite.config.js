import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

import contactHandler from './api/contact.js'

function contactApiPlugin() {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (request, response, next) => {
        if (request.method !== 'POST') {
          next()
          return
        }

        let body = ''
        request.on('data', (chunk) => {
          body += chunk
        })
        request.on('end', async () => {
          try {
            request.body = JSON.parse(body || '{}')
          } catch {
            response.statusCode = 400
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({ error: 'Invalid request body.' }))
            return
          }

          const apiResponse = {
            status(code) {
              response.statusCode = code
              return apiResponse
            },
            json(payload) {
              response.setHeader('Content-Type', 'application/json')
              response.end(JSON.stringify(payload))
            },
          }

          await contactHandler(request, apiResponse)
        })
      })
    },
  }
}

// https://vite.dev/guide/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  if (env.RESEND_API_KEY) {
    process.env.RESEND_API_KEY = env.RESEND_API_KEY
  }
  if (env.RESEND_FROM_EMAIL) {
    process.env.RESEND_FROM_EMAIL = env.RESEND_FROM_EMAIL
  }

  return {
    plugins: [react(), contactApiPlugin()],
  }
})
