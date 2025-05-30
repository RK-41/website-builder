'use client'
import React, { useState } from "react";
import { Puck, usePuck } from "@measured/puck";
import type { Data } from "@measured/puck";
import customConfig from "../../../puck.config";
import CustomHeaderActions from "./CustomHeaderActions";
import initialDatabase from '../../../database.json';
import NewPageDialog from "./NewPageDialog";
import { CssBaseline, StyledEngineProvider } from '@mui/material';

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

interface DropdownPage {
  title: string;
  path: string;
}

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  const [database, setDatabase] = useState<Database>(initialDatabase);
  const [currentPage, setCurrentPage] = useState({
    title: data.root?.props?.title || "Page Title",
    path
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  const pages: DropdownPage[] = Object.keys(database).map((key) => ({
    title: database[key]?.root?.props?.title || "Untitled",
    path: key,
  }));

  const handleBuildRequest = async () => {
    const response = await fetch('/api/build', { method: 'POST' });
    const result = await response.json();
    console.log(result);
  };

  const handlePublish = async (newData: any, newPath: string = currentPage.path) => {
    console.log(newPath, newData);
    const res = await fetch("/puck/api", {
      method: "post",
      body: JSON.stringify({ data: newData, path: newPath }),
    });
    const data = await res.json();
    setDatabase(data.data);

    handleBuildRequest();
  };

  const handleSelectPage = (selectedPage: { title: string, path: string }) => {
    setCurrentPage(selectedPage);
    const origin = window.location.origin;
    window.location.href = `${origin}${selectedPage.path}/edit`;
  };

  // Open the dialog
  const handleCreatePage = () => setDialogOpen(true);

  // Handle dialog form submission
  const handleDialogCreate = async ({ title, path: newPageSlug }: { title: string, path: string }) => {
    setDialogOpen(false);
    setCurrentPage({ title, path: newPageSlug });
    const newData = {
      root: { props: { title: title } },
      content: [database['/']?.content?.[0] || {}],
      zones: {},
    };

    const res = await fetch("/puck/api", {
      method: "post",
      body: JSON.stringify({ data: newData, path: newPageSlug }),
    });

    const data = await res.json();
    setDatabase(data.data);

    const origin = window.location.origin;
    window.location.href = `${origin}${newPageSlug}/edit`;
  };

  // Create a new component for header actions
  const HeaderActions = () => {
    const { appState } = usePuck();
    console.log('⌛⌛⌛⌛⌛', appState.data);
    return (
      <CustomHeaderActions
        onPublish={() => handlePublish(appState.data)}
        data={appState.data}
        pages={pages}
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
        onCreatePage={handleCreatePage}
      />
    );
  };

  return (
    <>
      <StyledEngineProvider injectFirst>
        <CssBaseline />
        <Puck
          config={customConfig}
          data={database[currentPage.path] || data}
          onPublish={handlePublish}
          overrides={{
            headerActions: HeaderActions, // Use the new component here
          }}
        />
        <NewPageDialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onCreate={handleDialogCreate}
          existingPaths={pages.map((page) => page.path)}
        />
      </StyledEngineProvider>
    </>
  );
}
