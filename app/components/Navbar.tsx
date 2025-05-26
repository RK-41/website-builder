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

const navItems = [
  { label: "Join Slack", href: "#" },
  { label: "Browse Topics", href: "#" },
  { label: "Random Item", href: "#" },
  { label: "Experts", href: "#" },
];

export const ResponsiveNavbar: React.FC = () => {
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
              src="https://merakiui.com/images/full-logo.svg"
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
            {navItems.map((item) => (
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
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=334&q=80"
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
            {navItems.map((item) => (
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
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=334&q=80"
                alt="avatar"
              />
              <Typography variant="body2" ml={1}>
                Alpha Num Erik
              </Typography>
            </Box>
          </Box>
        </Collapse>
      )}
    </AppBar>
  );
};

export const NavbarConfig = {
  label: "Responsive Navbar",
  fields: {
    logoUrl: {
      type: "text",
      label: "Logo Image URL",
      defaultValue: "https://merakiui.com/images/full-logo.svg",
    },
    links: {
      type: "array",
      label: "Navigation Links",
      defaultValue: [
        { label: "Join Slack", href: "#" },
        { label: "Browse Topics", href: "#" },
        { label: "Random Item", href: "#" },
        { label: "Experts", href: "#" },
      ],
      item: {
        type: "object",
        label: "Link",
        fields: {
          label: { type: "text", label: "Label" },
          href: { type: "text", label: "URL" },
        },
      },
    },
    avatarUrl: {
      type: "text",
      label: "Avatar Image URL",
      defaultValue:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=334&q=80",
    },
    username: {
      type: "text",
      label: "Username (Mobile Only)",
      defaultValue: "Alpha Num Erik",
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
  render: (props) => <ResponsiveNavbar {...props} />,
};


// import React, { useState } from 'react';
// import { AppBar, Toolbar, IconButton, Container } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
// import PublicIcon from '@mui/icons-material/Public';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { CustomLink, CustomLinkProps } from './CustomLink';

// export interface NavbarProps {
//   title?: string; // Optional title prop
//   color?: 'default' | 'inherit' | 'primary' | 'secondary' | 'transparent' | 'error' | 'info' | 'success' | 'warning'; // AppBar color options
//   position?: 'absolute' | 'fixed' | 'relative' | 'static' | 'sticky'; // AppBar position options
//   elevation?: number; // Elevation for AppBar
//   links?: CustomLinkProps[];
// }

// export const Navbar: React.FC<NavbarProps> = ({
//   title,
//   color = 'default',
//   position = 'fixed',
//   elevation = 1,
//   links = [],
// }) => {
//   console.log('🍀🍀🍀🍀', links)
//   const theme = useTheme();
//   const isDarkMode = theme.palette.mode === 'dark';
//   const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

//   const linkStyle = {
//     mx: isSmUp ? 3 : 1,
//     borderBottom: '2px solid transparent',
//     color: isDarkMode ? 'grey.300' : 'grey.700',
//     textTransform: 'capitalize',
//     '&:hover': {
//       color: isDarkMode ? 'grey.100' : 'grey.900',
//       borderBottomColor: 'primary.main',
//       transition: 'color 0.3s, border-bottom 0.3s',
//     },
//   };

//   return (
//     <AppBar position={position} color={color} elevation={elevation}>
//       <Toolbar
//         sx={{
//           justifyContent: 'center',
//           py: 2,
//           color: 'text.secondary',
//           bgcolor: isDarkMode ? 'grey.900' : 'common.white',
//         }}
//       >
//         {title && (
//           <CustomLink
//             href="#"
//             variant="text"
//             color={isDarkMode ? 'grey.100' : 'grey.900'}
//             underline="hover"
//             sx={{ ...linkStyle, borderBottomColor: 'primary.main' }}
//           >
//             {title}
//           </CustomLink>
//         )}


//         <Container
//           style={{
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             maxWidth: '30%'
//           }}
//         >
//           {links.map((link, index) => (
//             <CustomLink
//               key={index}
//               href={link.href}
//               variant={link.variant}
//               color={link.color}
//               underline={link.underline}
//               sx={link.sx}
//             >
//               {link.children}
//             </CustomLink>
//           ))}
//         </Container>

//         <IconButton href="#" sx={linkStyle}>
//           <PublicIcon fontSize="small" />
//         </IconButton>
//         <IconButton href="#" sx={linkStyle}>
//           <PictureAsPdfIcon fontSize="small" />
//         </IconButton>
//       </Toolbar>
//     </AppBar>
//   );
// };


// export const NavbarConfig = {
//   label: 'Navbar',
//   fields: {
//     title: {
//       label: 'Navbar Title',
//       type: 'text',
//     },
//     position: {
//       label: 'Position',
//       type: 'select',
//       options: [
//         { value: 'static', label: 'Static' },
//         { value: 'fixed', label: 'Fixed' },
//         { value: 'absolute', label: 'Absolute' },
//         { value: 'relative', label: 'Relative' },
//         { value: 'sticky', label: 'Sticky' },
//       ],
//     },
//     elevation: {
//       label: 'Elevation',
//       type: 'number',
//       min: 0,
//       max: 24,
//       step: 1,
//     },
//     color: {
//       label: 'Color',
//       type: 'select',
//       options: [
//         { value: 'default', label: 'Default' },
//         { value: 'primary', label: 'Primary' },
//         { value: 'secondary', label: 'Secondary' },
//         { value: 'error', label: 'Error' },
//         { value: 'info', label: 'Info' },
//         { value: 'success', label: 'Success' },
//         { value: 'warning', label: 'Warning' },
//         { value: 'inherit', label: 'Inherit' },
//       ]
//     },
//     links: {
//       label: 'Links',
//       type: 'array',
//       getItemSummary: (link, id = -1) => `${link.children}`,
//       arrayFields: {
//         href: {
//           label: 'URL',
//           type: 'text',
//         },
//         children: {
//           label: 'Text',
//           type: 'text',
//         },
//         variant: {
//           label: 'Variant',
//           type: 'radio',
//           options: [
//             { value: 'body1', label: 'Body 1' },
//             { value: 'body2', label: 'Body 2' },
//             { value: 'button', label: 'Button' },
//             { value: 'caption', label: 'Caption' },
//             { value: 'h1', label: 'H1' },
//             { value: 'h2', label: 'H2' },
//             { value: 'h3', label: 'H3' },
//             { value: 'h4', label: 'H4' },
//             { value: 'h5', label: 'H5' },
//             { value: 'h6', label: 'H6' },
//             { value: 'inherit', label: 'Inherit' },
//             { value: 'overline', label: 'Overline' },
//             { value: 'subtitle1', label: 'Subtitle 1' },
//             { value: 'subtitle2', label: 'Subtitle 2' },
//             { value: 'text', label: 'Text' },
//             { value: 'outlined', label: 'Outlined' },
//             { value: 'contained', label: 'Contained' },
//           ],
//         },
//         color: {
//           label: 'Color',
//           type: 'select',
//           options: [
//             { value: 'default', label: 'Default' },
//             { value: 'primary', label: 'Primary' },
//             { value: 'secondary', label: 'Secondary' },
//             { value: 'success', label: 'Success' },
//             { value: 'error', label: 'Error' },
//             { value: 'info', label: 'Info' },
//             { value: 'warning', label: 'Warning' },
//             { value: 'textPrimary', label: 'Text Primary' },
//             { value: 'textSecondary', label: 'Text Secondary' },
//             { value: 'textDisabled', label: 'Text Disabled' },
//           ],
//         },
//         underline: {
//           label: 'Underline',
//           type: 'radio',
//           options: [
//             { value: 'always', label: 'Always' },
//             { value: 'hover', label: 'Hover' },
//             { value: 'none', label: 'None' },
//           ],
//         },
//         sx: {
//           label: 'Custom Styles',
//           type: 'text',
//         },
//       },
//     },
//   },
//   defaultProps: {
//     title: 'My Navbar',
//     position: 'static',
//     elevation: 0,
//     links: [
//       {
//         href: '#',
//         children: 'Features',
//         variant: 'text',
//         color: 'primary',
//         underline: 'hover',
//         sx: {},
//       },
//       {
//         href: '#',
//         children: 'Pricing',
//         variant: 'text',
//         color: 'primary',
//         underline: 'hover',
//         sx: {},
//       },
//       {
//         href: '#',
//         children: 'Blog',
//         variant: 'text',
//         color: 'primary',
//         underline: 'hover',
//         sx: {},
//       },
//     ],
//   },

//   render: (props: NavbarProps) => <Navbar {...props} />
// };

// export default NavbarConfig;



// // export const NavbarConfig = {
// //   label: 'Navbar',
// //   fields: {
// //     title: {
// //       label: 'Navbar Title',
// //       type: 'text',
// //     },
// //     position: {
// //       label: 'Position',
// //       type: 'select',
// //       options: [
// //         { value: 'static', label: 'Static' },
// //         { value: 'fixed', label: 'Fixed' },
// //         { value: 'absolute', label: 'Absolute' },
// //         { value: 'relative', label: 'Relative' },
// //         { value: 'sticky', label: 'Sticky' },
// //       ],
// //     },
// //     elevation: {
// //       label: 'Elevation',
// //       type: 'number',
// //       min: 0,
// //       max: 24,
// //       step: 1,
// //     },
// //     links: {
// //       label: 'Links',
// //       type: 'array',
// //       item: {
// //         fields: {
// //           href: {
// //             label: 'URL',
// //             type: 'text',
// //           },
// //           children: {
// //             label: 'Text',
// //             type: 'text',
// //           },
// //           variant: {
// //             label: 'Variant',
// //             type: 'radio',
// //             options: [
// //               { value: 'body1', label: 'Body 1' },
// //               { value: 'body2', label: 'Body 2' },
// //               { value: 'button', label: 'Button' },
// //               { value: 'caption', label: 'Caption' },
// //               { value: 'h1', label: 'H1' },
// //               { value: 'h2', label: 'H2' },
// //               { value: 'h3', label: 'H3' },
// //               { value: 'h4', label: 'H4' },
// //               { value: 'h5', label: 'H5' },
// //               { value: 'h6', label: 'H6' },
// //               { value: 'inherit', label: 'Inherit' },
// //               { value: 'overline', label: 'Overline' },
// //               { value: 'subtitle1', label: 'Subtitle 1' },
// //               { value: 'subtitle2', label: 'Subtitle 2' },
// //               { value: 'text', label: 'Text' },
// //               { value: 'outlined', label: 'Outlined' },
// //               { value: 'contained', label: 'Contained' },
// //             ],
// //           },
// //           color: {
// //             label: 'Color',
// //             type: 'select',
// //             options: [
// //               { value: 'default', label: 'Default' },
// //               { value: 'primary', label: 'Primary' },
// //               { value: 'secondary', label: 'Secondary' },
// //               { value: 'success', label: 'Success' },
// //               { value: 'error', label: 'Error' },
// //               { value: 'info', label: 'Info' },
// //               { value: 'warning', label: 'Warning' },
// //               { value: 'textPrimary', label: 'Text Primary' },
// //               { value: 'textSecondary', label: 'Text Secondary' },
// //               { value: 'textDisabled', label: 'Text Disabled' },
// //             ],
// //           },
// //           underline: {
// //             label: 'Underline',
// //             type: 'radio',
// //             options: [
// //               { value: 'always', label: 'Always' },
// //               { value: 'hover', label: 'Hover' },
// //               { value: 'none', label: 'None' },
// //             ],
// //           },
// //           sx: {
// //             label: 'Custom Styles',
// //             type: 'text',
// //           },
// //         },
// //         defaultProps: {
// //           href: '#',
// //           children: 'Link',
// //           variant: 'text',
// //           color: 'primary',
// //           underline: 'hover',
// //           sx: {}
// //         },
// //         render: (props: CustomLinkProps) => <CustomLink {...props} />
// //       },
// //     },
// //   },
// //   defaultProps: {
// //     title: 'My Navbar',
// //     position: 'relative',
// //     elevation: 0,
// //     links: [
// //       {
// //         href: '#',
// //         children: 'Features',
// //         variant: 'text',
// //         color: 'primary',
// //         underline: 'hover',
// //         sx: {},
// //       },
// //       {
// //         href: '#',
// //         children: 'Pricing',
// //         variant: 'text',
// //         color: 'primary',
// //         underline: 'hover',
// //         sx: {},
// //       },
// //       {
// //         href: '#',
// //         children: 'Blog',
// //         variant: 'text',
// //         color: 'primary',
// //         underline: 'hover',
// //         sx: {},
// //       },
// //     ],
// //   } as NavbarProps,

// //   render: (props: NavbarProps) => <Navbar {...props} />
// // };

// // Component configuration
// // export const NavbarConfig = {
// //   label: 'Navbar',
// //   fields: {
// //     title: {
// //       label: 'Navbar Title',
// //       type: 'text',
// //     },
// //     color: {
// //       label: 'Color',
// //       type: 'select',
// //       options: [
// //         { value: 'default', label: 'Default' },
// //         { value: 'inherit', label: 'Inherit' },
// //         { value: 'primary', label: 'Primary' },
// //         { value: 'secondary', label: 'Secondary' },
// //         { value: 'transparent', label: 'Transparent' },
// //         { value: 'error', label: 'Error' },
// //         { value: 'info', label: 'Info' },
// //         { value: 'success', label: 'Success' },
// //         { value: 'warning', label: 'Warning' },
// //       ],
// //     },
// //     position: {
// //       label: 'Position',
// //       type: 'select',
// //       options: [
// //         { value: 'absolute', label: 'Absolute' },
// //         { value: 'fixed', label: 'Fixed' },
// //         { value: 'relative', label: 'Relative' },
// //         { value: 'static', label: 'Static' },
// //         { value: 'sticky', label: 'Sticky' },
// //       ],
// //     },
// //     elevation: {
// //       label: 'Elevation',
// //       type: 'number',
// //       default: 1,
// //     },
// //   },
// //   defaultProps: {
// //     title: 'Navbar',
// //     color: 'default' as NavbarProps['color'],
// //     position: 'relative' as NavbarProps['position'],
// //     elevation: 1,
// //   } as NavbarProps,
// //   render: ({ title, color, position, elevation }: NavbarProps) => ( // Use the props here
// //     <Navbar title={title} color={color} position={position} elevation={elevation} />
// //   )
// // };

// // export default NavbarConfig;
