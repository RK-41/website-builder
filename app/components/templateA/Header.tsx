import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  useTheme,
  useMediaQuery,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import { MuiColorInput } from 'mui-color-input';
import Image from 'next/image';
// import Link from "next/link";

export interface HeaderProps {
  logo: LogoProps;
  backgroundColor: string;
  navItems: NavItem[];
}

interface LogoProps {
  label: string;
  image?: string;
  href: string;
  width: number;
  height: number;
  color?: string;
}

interface NavItem {
  text: string;
  href: string;
  textColor?: string;
  color?: string;
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disableElevation?: boolean;
}

export const defaultLogo: LogoProps = {
  label: 'LOGO',
  href: '/',
  image: undefined,
  width: 50,
  height: 20,
  color: '#000000',
};

export const defaultNavItems: NavItem[] = [
  {
    text: 'Courses',
    href: '/courses',
    textColor: '#000000',
    color: '#1976d2',
    variant: 'text',
    size: 'medium',
    fullWidth: false,
    disableElevation: false,
  },
  {
    text: 'Contact Us',
    href: '#',
    textColor: '#000000',
    color: '#1976d2',
    variant: 'text',
    size: 'medium',
    fullWidth: false,
    disableElevation: false,
  },
  {
    text: 'Login',
    href: '/auth/login',
    textColor: '#1976d2',
    color: '#1976d2',
    variant: 'outlined',
    size: 'medium',
    fullWidth: false,
    disableElevation: false,
  },
  {
    text: 'Sign Up',
    href: '/auth/sign-up',
    textColor: '#ffffff',
    color: '#1976d2',
    variant: 'contained',
    size: 'medium',
    fullWidth: false,
    disableElevation: false,
  },
];

export const Header: React.FC<HeaderProps> = ({
  logo = defaultLogo,
  backgroundColor = '#ffffff',
  navItems = defaultNavItems,
}) => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // const router = useRouter();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNavClick = (href: string) => {
    handleCloseNavMenu();
    // router.push(href);
  };

  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: backgroundColor }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo for desktop */}
          <Box
            component="a"
            href={logo.href}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            {logo.image ? (
              <Image
                src={logo.image}
                alt={logo.label}
                width={logo.width}
                height={logo.height}
                style={{ marginRight: 8 }}
              />
            ) : (
              <Typography
                variant="h6"
                noWrap
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: logo.color || 'inherit',
                }}
              >
                {logo.label}
              </Typography>
            )}
          </Box>

          {/* Logo for mobile */}
          <Box
            component="a"
            href={logo.href}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            {logo.image ? (
              <Image
                src={logo.image}
                alt={logo.label}
                width={logo.width}
                height={logo.height}
                style={{ marginRight: 8 }}
              />
            ) : (
              <Typography
                variant="h5"
                noWrap
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: logo.color || 'inherit',
                }}
              >
                {logo.label}
              </Typography>
            )}
          </Box>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="primary"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.text}
                  onClick={() => handleNavClick(item.href)}
                >
                  <Typography textAlign="center" sx={{ color: item.textColor }}>
                    {item.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                sx={{ textDecoration: 'none' }}
              >
                <Button
                  key={item.text}
                  // onClick={() => handleNavClick(item.href)}
                  sx={{
                    my: 2,
                    ml: 2,
                    display: 'block',
                    ...(item.color
                      ? item.variant === 'contained'
                        ? {
                            bgcolor: item.color,
                            color: item.textColor || 'white',
                          }
                        : { color: item.color, borderColor: item.color }
                      : {}),
                    ...(item.textColor && item.variant !== 'contained'
                      ? { color: item.textColor }
                      : {}),
                  }}
                  variant={item.variant}
                  size={item.size}
                  fullWidth={item.fullWidth}
                  disableElevation={item.disableElevation}
                >
                  {item.text}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export const HeaderConfig = {
  label: 'Header',
  fields: {
    logo: {
      type: 'object',
      label: 'Logo',
      objectFields: {
        label: { type: 'text', label: 'Label' },
        image: { type: 'text', label: 'Image URL' },
        href: { type: 'text', label: 'URL' },
        width: { type: 'number', label: 'Width' },
        height: { type: 'number', label: 'Height' },
        color: {
          type: 'custom',
          label: 'Color',
          render: ({ value, onChange }: { value: any; onChange: any }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Logo Color"
            />
          ),
        } as any,
      },
    },
    backgroundColor: {
      type: 'custom',
      label: 'Background Color',
      render: ({ value, onChange }: { value: any; onChange: any }) => (
        <MuiColorInput
          value={value}
          onChange={onChange}
          label="Background Color"
        />
      ),
    } as any,
    navItems: {
      type: 'array',
      label: 'Navigation Items',
      getItemSummary: (item: any) => item.text,
      arrayFields: {
        text: { type: 'text', label: 'Label' },
        href: { type: 'text', label: 'URL' },
        variant: {
          type: 'radio',
          label: 'Variant',
          options: [
            { value: 'contained', label: 'Contained' },
            { value: 'outlined', label: 'Outlined' },
            { value: 'text', label: 'Text' },
          ],
        },
        textColor: {
          type: 'custom',
          label: 'Text Color',
          render: ({ value, onChange }: { value: any; onChange: any }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Text Color"
            />
          ),
        } as any,
        color: {
          type: 'custom',
          label: 'Button Color',
          render: ({ value, onChange }: { value: any; onChange: any }) => (
            <MuiColorInput
              value={value}
              onChange={onChange}
              label="Button Color"
            />
          ),
        } as any,
        size: {
          type: 'radio',
          label: 'Size',
          options: [
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
          ],
        },
        fullWidth: {
          type: 'select',
          label: 'Full Width',
          options: [
            { value: true, label: 'True' },
            { value: false, label: 'False' },
          ],
        },
        disableElevation: {
          type: 'select',
          label: 'Disable Elevation',
          options: [
            { value: true, label: 'True' },
            { value: false, label: 'False' },
          ],
        },
      },
    },
  },
  defaultProps: {
    logo: defaultLogo,
    backgroundColor: '#ffffff',
    navItems: defaultNavItems,
  },
  render: (props: HeaderProps) => <Header {...props} />,
};
