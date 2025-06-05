'use client';

import { useEffect, useState } from 'react';

export function useDomain() {
  const [domainName, setDomainName] = useState('');

  useEffect(() => {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');

    if (parts?.length > 2) {
      setDomainName(parts[0]);
    } else {
      setDomainName(parts?.length === 2 ? parts[0] : '');
    }
  }, []);

  return domainName;
}
