type ApiConfigType = {
  apiBasePath: string
  oidcDiscoveryUrl: string
  oidcClientId: string
  redirectUri: string
}

const apiConfig: ApiConfigType = {
  apiBasePath: process.env.SERVER_HOST || 'http://localhost:8000',
  oidcDiscoveryUrl:
    process.env.OPENID_CONNECT_DISCOVERY_URL ||
    'http://localhost:8080/auth/realms/tdp_server_dev/.well-known/openid-configuration',
  oidcClientId: process.env.OPENID_CLIENT_ID || 'tdp_auth',
  redirectUri: 'http://localhost:3000/login',
}

export default apiConfig
