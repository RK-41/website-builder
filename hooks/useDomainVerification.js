import { useState, useCallback } from 'react';
import { URLS } from '../app/services/ENDPOINTS';
import client from '../app/services/client';
import { notify } from '../lib/helperFunctions';

export const useDomainVerification = () => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const verifyDomain = useCallback(async (domain) => {
    if (!domain) return false;

    setIsVerifying(true);
    try {
      const url = URLS.PUBLIC_API_URL(true, URLS.VERIFY_DOMAIN);
      const { data } = await client.post(url, { domain });
      const isValid = data?.status_code === 200;
      setIsVerified(isValid);
      return isValid;
    } catch (error) {
      notify(error?.errors, 'error');
      return false;
    } finally {
      setIsVerifying(false);
    }
  }, []);

  return { isVerifying, isVerified, verifyDomain };
};
