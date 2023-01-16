const apiConfig = {
  apiBasePath: process.env.SERVER_HOST || 'http://localhost:8000',
  oidcDiscoveryUrl:
    process.env.OPENID_CONNECT_DISCOVERY_URL ||
    'http://localhost:8080/auth/realms/tdp_server/.well-known/openid-configuration',
  oidcConfig: {
    oidcClientId: process.env.OPENID_CLIENT_ID || 'tdp_server',
    authority: 'http://localhost:8080/auth/realms/tdp_server',
    redirectUri: 'http://localhost:3000/',
    postLogoutRedirectUri: 'http://localhost:3000/',
    scope: [
      'openid',
      'tdp_server:read',
      'tdp_server:write',
      'tdp_server:execute',
    ].join(' '),
  },
}

export default apiConfig
