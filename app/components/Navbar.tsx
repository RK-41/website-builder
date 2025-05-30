import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Link,
  useTheme,
  useMediaQuery,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Image from "next/image";
import { ComponentConfig, DefaultComponentProps } from "@measured/puck";

interface NavItem {
  label: string;
  href: string;
}

interface ResponsiveNavbarProps {
  logoUrl: string;
  links: NavItem[];
  avatarUrl: string;
  username: string;
}

// Extend the ResponsiveNavbarProps with DefaultComponentProps
// type NavbarProps = ResponsiveNavbarProps & DefaultComponentProps;

export const ResponsiveNavbar: React.FC<ResponsiveNavbarProps> = ({
  logoUrl,
  links,
  avatarUrl,
  username,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar
      position="static"
      elevation={1}
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "nowrap" }}>
        {/* Logo and Toggle */}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Link href="#">
            <Image
              src={logoUrl}
              alt="Logo"
              width={100}
              height={28}
            />
          </Link>

          {isMobile && (
            <IconButton
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ ml: 1 }}
              color="inherit"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Box>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box display="flex" alignItems="center">
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                underline="none"
                sx={{
                  mx: 1.5,
                  px: 1.5,
                  py: 1,
                  borderRadius: 1,
                  color: "text.primary",
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                {item.label}
              </Link>
            ))}

            <IconButton sx={{ mx: 2 }} color="inherit">
              <NotificationsIcon />
            </IconButton>

            <Avatar
              src={avatarUrl}
              alt="avatar"
              sx={{ width: 36, height: 36 }}
            />
          </Box>
        )}
      </Toolbar>

      {/* Mobile Menu */}
      {isMobile && (
        <Collapse in={mobileOpen} timeout="auto" unmountOnExit>
          <Box
            px={2}
            py={2}
            display="flex"
            flexDirection="column"
            bgcolor={theme.palette.background.paper}
            sx={{ borderTop: `1px solid ${theme.palette.divider}` }}
          >
            {links.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                underline="none"
                sx={{
                  px: 2,
                  py: 1,
                  borderRadius: 1,
                  color: "text.primary",
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                {item.label}
              </Link>
            ))}

            <Box display="flex" alignItems="center" mt={2} gap={2}>
              <IconButton color="inherit">
                <NotificationsIcon />
              </IconButton>
              <Avatar
                src={avatarUrl}
                alt="avatar"
              />
              <Typography variant="body2" ml={1}>
                {username}
              </Typography>
            </Box>
          </Box>
        </Collapse>
      )}
    </AppBar>
  );
};

export interface NavbarProps {
  logoUrl: string;
  links: { label: string; href: string }[];
  avatarUrl: string;
  username: string;
}

export const NavbarConfig: ComponentConfig<NavbarProps> = {
  label: "Navbar",
  fields: {
    logoUrl: {
      type: "text",
      label: "Logo Image URL",
    },
    links: {
      type: "array",
      label: "Navigation Links",
      arrayFields: {
        label: { type: "text", label: "Label" },
        href: { type: "text", label: "URL" },
      },
    },
    avatarUrl: {
      type: "text",
      label: "Avatar Image URL",
    },
    username: {
      type: "text",
      label: "Username (Mobile Only)",
    },
  },
  defaultProps: {
    logoUrl: "https://merakiui.com/images/full-logo.svg",
    avatarUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=334&q=80",
    username: "Alpha Num Erik",
    links: [
      { label: "Join Slack", href: "#" },
      { label: "Browse Topics", href: "#" },
      { label: "Random Item", href: "#" },
      { label: "Experts", href: "#" },
    ],
  },
  render: (props: NavbarProps) => <ResponsiveNavbar {...props} />,
};
