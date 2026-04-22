export type EmailPolicyProps = {
  enabled: boolean
  mode: 'whitelist' | 'blacklist'
  domains: string[]
}