import type { ConfigFile } from '@rtk-query/codegen-openapi'
import { resolve } from 'path'

const config: ConfigFile = {
  schemaFile: resolve(__dirname, '../schemas/tdp-server_0.1.0_openapi.json'),
  apiFile: '../src/services/emptyApi.ts',
  apiImport: 'emptyApi',
  outputFile: '../src/services/tdpApi.ts',
  exportName: 'tdpApi',
  tag: true,
  hooks: {
    queries: true,
    lazyQueries: true,
    mutations: true,
  },
}

export default config
