import { User } from 'oidc-client-ts'
import config from 'src/config'

/**
 * Get user infos stored by react-oidc-context in local storage
 * outside of the `AuthProvider`
 * @returns authenticated user infos
 * @see {@link https://github.com/authts/react-oidc-context}
 */
export function getUser() {
  const oidcStorage = localStorage.getItem(
    `oidc.user:${config.oidcConfig.authority}:${config.oidcConfig.oidcClientId}`
  )
  console.log(
    `oidc.user:${config.oidcConfig.authority}:${config.oidcConfig.oidcClientId}`
  )
  console.log('oidcStorage', oidcStorage)
  if (!oidcStorage) {
    return null
  }

  return User.fromStorageString(oidcStorage)
}
