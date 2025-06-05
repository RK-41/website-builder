export const URLS = {
  PUBLIC_API_URL: (isApi = true, endpoint) =>
    `https://${process.env.NEXT_PUBLIC_API_ENDPOINT}/${isApi ? 'api/' : ''}${
      endpoint ? endpoint : ''
    }`,
  DYNAMIC_DOMAIN: (domain) =>
    `https://${domain}.${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/`,
  UI_DYNAMIC_DOMAIN: (domain, website_url) => `http://${domain}.${website_url}`,
  UI_DYNAMIC_LOCAL: (domain, website_url) => `http://${domain}.${website_url}`,
  LOGIN: 'login',
  VERIFY_TOKEN: 'user',
  VERIFY_DOMAIN: `check-tenant`,
};
