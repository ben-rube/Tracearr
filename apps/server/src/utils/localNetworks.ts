/**
 * Extra CIDR ranges to treat as local, for LANs that use non-RFC1918 addresses.
 * LOCAL_NETWORKS=172.6.0.0/24,100.64.0.0/10
 */

import { isIpInCidr } from './ip.js';

const localNetworks = (process.env.LOCAL_NETWORKS ?? '')
  .split(',')
  .map((entry) => entry.trim())
  .filter(Boolean);

for (const cidr of localNetworks) {
  // A valid CIDR always contains its own base address
  if (!isIpInCidr(cidr.split('/')[0] ?? '', cidr)) {
    console.warn(`LOCAL_NETWORKS: ignoring invalid CIDR "${cidr}"`);
  }
}

export function isInLocalNetworks(ip: string): boolean {
  return localNetworks.some((cidr) => isIpInCidr(ip, cidr));
}
