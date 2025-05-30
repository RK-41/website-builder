// A basic dashboard to view and manage pages built with puck editor
// We can remove this if it's not required

'use client'
import React, { useState } from "react";
import { Tabs, Tab, Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import initialDatabase from '../../database.json';
import { Client } from "../[...puckPath]/client";

interface ComponentProps {
  [key: string]: any; // You can further specify this if you know the structure of props for each component
}

interface Component {
  type: string;
  props: ComponentProps;
}

interface Page {
  root: {
    props: {
      title: string;
    };
  };
  content: Component[];
}

interface Database {
  [key: string]: Page;
}

const Dashboard = () => {
  const [database, setDatabase] = useState<Database>(initialDatabase);
  const [tabIndex, setTabIndex] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, route: "" });

  const routes = Object.keys(database);

  const handleDelete = (route: string) => {
    const newDb = { ...database };
    delete newDb[route];
    setDatabase(newDb);
    setTabIndex(0);
    setDeleteDialog({ open: false, route: "" });
    console.log(newDb)
    // TODO: Persist newDb to backend or file
  };

  const handleView = (route: string) => {
    const hostUrl = window.location.origin;
    window.open(`${hostUrl}${route}`, "_blank");
  };

  const handleEdit = (route: string) => {
    const hostUrl = window.location.origin;
    window.open(`${hostUrl}${route}/edit`, "_blank");
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Dashboard
      </Typography>
      <Tabs
        value={tabIndex}
        onChange={(_, idx) => setTabIndex(idx)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="Page Tabs"
      >
        {routes.map((route: string) => (
          <Tab label={route} key={route} />
        ))}
      </Tabs>
      <Box sx={{ p: 3 }}>
        {routes.length > 0 ? (
          <>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleView(routes[tabIndex])}
              >
                View
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleEdit(routes[tabIndex])}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  setDeleteDialog({ open: true, route: routes[tabIndex] })
                }
              >
                Delete
              </Button>
            </Box>
            {/* <Typography variant="h6">Route: {routes[tabIndex]}</Typography> */}
            <Box
              sx={{
                bgcolor: "#f5f5f5",
                borderRadius: 2,
                p: 2,
                mb: 2,
                maxHeight: 400,
                overflow: "auto",
                fontFamily: "monospace",
                fontSize: 14
              }}
            >
              <Client data={database[routes[tabIndex]]} />

              {/* <pre>{JSON.stringify(database[routes[tabIndex]], null, 2)}</pre> */}
            </Box>
          </>
        ) : (
          <Typography>No pages found.</Typography>
        )}
      </Box>
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, route: "" })}
      >
        <DialogTitle>Delete Page</DialogTitle>
        <DialogContent>
          Are you sure you want to delete the page <b>{deleteDialog.route}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, route: "" })}>
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() => handleDelete(deleteDialog.route)}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
