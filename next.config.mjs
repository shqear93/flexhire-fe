import {createRequire} from 'module';

const require = createRequire(import.meta.url);
const relayConfig = require('./relay.config.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ]
  },

  // Relay compiler configuration
  compiler: {
    relay: {
      src: relayConfig.src,
      artifactDirectory: relayConfig.artifactDirectory,
      excludes: relayConfig.excludes,
      language: relayConfig.language,
      eagerEsModules: false,
    },
  },
}

export default nextConfig;
