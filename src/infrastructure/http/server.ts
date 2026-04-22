import chalk from 'chalk'
import { envConfig } from '../config/envConfig.js'
import { app } from './app.js'

export function startHttpServer() {
  const PORT = envConfig.http.port

  app.listen(PORT, () =>
    console.log(chalk.gray(`Running on http://localhost:${PORT}`)),
  )
}
