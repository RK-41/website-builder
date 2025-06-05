'use client';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  Web,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { getSession, signIn, signOut } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDomainVerification } from '../../../hooks/useDomainVerification';
import { notify } from '../../../lib/helperFunctions';
import { useDomain } from '../../hooks/useDomain';
import { URLS } from '../../services/ENDPOINTS';
import client from '../../services/client';

function Login() {
  const router = useRouter();
  const domainName = useDomain();
  const [showPassword, setShowPassword] = useState(false);
  const { isVerifying, isVerified, verifyDomain } = useDomainVerification();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    domain: '',
  });

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleDomainSubmit = async (e) => {
    e.preventDefault();
    if (!formData.domain) return;

    setLoading(true);
    try {
      const isValid = await verifyDomain(formData.domain);
      if (isValid) {
        const redirectUrl = URLS.UI_DYNAMIC_DOMAIN(
          formData.domain,
          process.env.NEXT_PUBLIC_WEBSITE_URL
        );
        window.location.href = `${redirectUrl}/auth/login`;
      }
    } finally {
      setLoading(false);
    }
  };
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  // Token verification effect
  useEffect(() => {
    if (!token) return;

    const verifyToken = async () => {
      setLoading(true);
      try {
        if (!domainName) {
          return;
        }
        const URL = URLS.DYNAMIC_DOMAIN(domainName) + URLS.VERIFY_TOKEN;
        const { data } = await client.get(URL, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data?.status_code === 200) {
          const authResponse = await signIn('credentials', {
            redirect: false,
            token,
            URL,
          });

          if (!authResponse.error) {
            router.push('/edit');
          } else {
            notify(authResponse.error, 'error');
          }
        }
      } catch (error) {
        notify(error?.errors, 'error');
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, domainName, router]);

  // Domain verification effect
  useEffect(() => {
    if (domainName) {
      verifyDomain(domainName).then((isValid) => {
        setFormData((prev) => ({
          ...prev,
          domain: isValid ? domainName : '',
        }));
      });
    }
  }, [domainName, verifyDomain]);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const { email, password } = values;
      const loginField = 'email';
      const loginFieldKey = loginField; // 'email' or 'userId'
      const loginValue = values[loginField]; // gets either email or userId value

      // Initial payload with common fields
      const payload = {
        login: loginValue,
        password: values.password,
      };

      // Add the specific field (email or userId)
      payload[loginFieldKey] = loginValue;

      const URL = URLS.DYNAMIC_DOMAIN(formData.domain) + URLS.LOGIN;
      const response = await client.post(URL, payload);

      if (response?.data?.status_code === 200) {
        // Save tenant_role to localStorage for persistence
        if (response?.data?.data?.tenant_role) {
          localStorage.setItem('tenant_role', response.data.data.tenant_role);
        }
        console.log({
          redirect: false,
          login: loginValue,
          email,
          password,
          LoginURL: URL,
        });
        const authResponse = await signIn('credentials', {
          redirect: false,
          login: loginValue,
          email,
          password,
          LoginURL: URL,
        });
        console.log('🚀 ~ onSubmit ~ authResponse:', authResponse);

        if (!authResponse.error) {
          getSession().then(async () => {
            // Include tenant_role in user details if available

            const redirectUrl =
              URLS.UI_DYNAMIC_DOMAIN(
                formData.domain,
                process.env.NEXT_PUBLIC_WEBSITE_URL
              ) + '/edit';
            router.replace(redirectUrl);
          });
        }
        console.log('🚀 ~ onSubmit ~ response:', response);
        notify(response?.data?.message || response?.data?.error, 'success');
      }
    } catch (error) {
      console.log('🚀 ~ onSubmit ~ error:', error);
      if (error?.data?.is_verified === false) {
        return;
      }
      notify(error?.errors || error?.message, 'error');
      console.log('🚀 ~ onSubmit ~ error?.errors:', error?.errors);
      if (error?.response?.status === 401) {
        signOut({ callbackUrl: '/auth/login' });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          position: 'relative',
          overflow: 'visible',
        }}
      >
        {loading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1,
              borderRadius: 1,
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <CircularProgress />
              <Typography sx={{ mt: 2 }}>Processing...</Typography>
            </Box>
          </Box>
        )}

        <CardContent sx={{ p: 4 }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{ mb: 4, textAlign: 'center' }}
          >
            {!isVerified ? 'Enter Domain' : 'Login'}
          </Typography>

          {!isVerified ? (
            <form onSubmit={handleDomainSubmit}>
              <TextField
                fullWidth
                margin="normal"
                name="domain"
                label="Domain"
                required
                value={formData.domain}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Web />
                    </InputAdornment>
                  ),
                }}
                helperText="Enter your domain name"
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isVerifying || !formData.domain}
                sx={{ mt: 3 }}
              >
                {isVerifying ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Continue'
                )}
              </Button>
            </form>
          ) : (
            <div>
              <TextField
                fullWidth
                margin="normal"
                name="email"
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{ mt: 3 }}
                onClick={() => handleSubmit(formData)}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Log in'
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
