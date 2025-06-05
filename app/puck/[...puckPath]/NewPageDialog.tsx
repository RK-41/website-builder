import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material';

// Define the interface for the component props
interface NewPageDialogProps {
  open: boolean; // Indicates if the dialog is open
  onClose: () => void; // Function to call when the dialog is closed
  onCreate: (data: { title: string; path: string }) => void; // Function to call when a new page is created
  existingPaths: string[]; // Array of existing paths to check for duplicates
}

function slugify(text: string) {
  return (
    '/' +
    text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  );
}

const NewPageDialog: React.FC<NewPageDialogProps> = ({
  open,
  onClose,
  onCreate,
  existingPaths,
}) => {
  const [title, setTitle] = useState<string>('');
  const [path, setPath] = useState<string>('');
  const [pathTouched, setPathTouched] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Auto-generate path from title unless path was manually edited
  useEffect(() => {
    if (!pathTouched) {
      setPath(title ? slugify(title) : '');
    }
  }, [title, pathTouched]);

  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPath(e.target.value);
    setPathTouched(true);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (!pathTouched) setPath(slugify(e.target.value));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!path.trim() || !path.startsWith('/')) {
      setError("Path must start with '/'");
      return;
    }
    if (existingPaths.includes(path)) {
      setError('A page with this path already exists');
      return;
    }
    setError('');
    onCreate({ title: title.trim(), path: path.trim() });
    setTitle('');
    setPath('');
    setPathTouched(false);
  };

  const handleDialogClose = () => {
    setTitle('');
    setPath('');
    setPathTouched(false);
    setError('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="xs" fullWidth>
      <DialogTitle>Create New Page</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            value={title}
            onChange={handleTitleChange}
            autoFocus
            fullWidth
          />
          <TextField
            label="Path"
            value={path}
            onChange={handlePathChange}
            fullWidth
            helperText="e.g. /user-profile"
          />
          {error && (
            <Box sx={{ color: 'error.main', fontSize: 14 }}>{error}</Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewPageDialog;
