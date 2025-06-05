import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Modal,
  Box,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Client } from '../../[...puckPath]/client';
import { signOut } from 'next-auth/react';

interface Page {
  title: string;
  path: string;
}

interface CustomHeaderActionsProps {
  onPublish: () => void;
  data: any;
  pages: Page[];
  currentPage: Page;
  onSelectPage: (selectedPage: Page) => void;
  onCreatePage: () => void;
}

const CustomHeaderActions: React.FC<CustomHeaderActionsProps> = ({
  onPublish,
  data,
  pages = [],
  currentPage = { title: '', path: '' },
  onSelectPage,
  onCreatePage,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleMenuOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handlePageSelect = (page: Page) => {
    handleMenuClose();
    if (onSelectPage) onSelectPage(page);
  };

  const handleCreatePage = () => {
    handleMenuClose();
    if (onCreatePage) onCreatePage();
  };

  const handlePreview = () => {
    setModalOpen(true);
    console.log(currentPage, data);
  };
  const handleLogOut = async () => {
    // Implement logout logic here
    await signOut({ redirect: false });
    window.location.href = '/auth/login'; // Redirect to login page after logout
  };

  return (
    <>
      <Button
        color="primary"
        variant="outlined"
        endIcon={<ArrowDropDownIcon />}
        onClick={handleMenuOpen}
        sx={{ mr: 1, width: 'auto', textWrap: 'nowrap' }}
      >
        {currentPage?.title || 'Select Page'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {pages.length > 0 ? (
          pages.map((page) => (
            <MenuItem
              key={page.path}
              selected={page.path === currentPage.path}
              onClick={() => handlePageSelect(page)}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Typography>{page.title}</Typography>
              <Typography sx={{ fontSize: 12 }}>{page.path}</Typography>
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>No pages found</MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleCreatePage}>
          <ListItemIcon sx={{ width: 'max-content' }}>
            <AddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Create New Page" />
        </MenuItem>
      </Menu>
      <Button onClick={handlePreview}>Preview</Button>
      <Button onClick={onPublish} sx={{ mr: 1 }}>
        Publish
      </Button>
      <Button onClick={handleLogOut}>Log Out</Button>
      {/* <Button
        onClick={() => {
          console.log(data);
        }}
        sx={{ mr: 1 }}
      >
        Save
      </Button> */}

      {/* Preview Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} sx={{ m: 1 }}>
        <Box
          sx={{
            width: 'full',
            bgcolor: '#f5f5f5',
            borderRadius: 2,
            p: 1,
            minHeight: '95dvh',
            overflow: 'auto',
            fontFamily: 'monospace',
            fontSize: 14,
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setModalOpen(false)}
          >
            Back to editing
          </Button>
          <Box
            sx={{
              // bgcolor: "#000",
              borderRadius: 2,
              mt: 2,
              maxHeight: '85dvh',
              overflow: 'auto',
              fontFamily: 'monospace',
              fontSize: 14,
            }}
          >
            <Client data={data} />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CustomHeaderActions;
