import { Suspense } from 'react';
import AuthProvider from './components/providers/AuthProvider';
import './styles.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Toaster } from 'react-hot-toast';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster
          toastOptions={{
            duration: 5000,
            className: '',
            style: {
              borderRadius: '5px',
              background: '#F9E5E5',
              color: '#222222',
              fontSize: '15px',
              lineHeight: '20px',
              boxShadow: '0px 4px 4px 0px #0000001A',
              maxWidth: '360px',
            },
          }}
        />
        <Suspense
          fallback={
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
              }}
            >
              {/* loader ui  html inline css*/}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#222222"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-loader"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="6" x2="12" y2="12" />
                <line x1="12" y1="12" x2="16" y2="12" />
              </svg>
            </div>
          }
        >
          <AuthProvider>
            <AppRouterCacheProvider options={{ enableCssLayer: true }}>
              {children}
            </AppRouterCacheProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
