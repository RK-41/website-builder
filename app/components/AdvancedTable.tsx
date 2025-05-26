import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Avatar,
  Typography,
  Box,
  Chip,
  Input,
} from "@mui/material";

type TableColumn = {
  label: string;
  field: string;
  sortable?: boolean;
};

type TableRowData = {
  [key: string]: any;
};

type AdvancedTableProps = {
  title?: string;
  description?: string;
  columns: TableColumn[];
  rows: TableRowData[];
  avatarField?: string;
  badgeField?: string;
  badgeColors?: Record<string, string>; // e.g., { "Active": "success", "Pending": "warning" }
  filterPlaceholder?: string;
};

export const AdvancedTable: React.FC<AdvancedTableProps> = ({
  title,
  description,
  columns,
  rows,
  avatarField,
  badgeField,
  badgeColors = {},
  filterPlaceholder = "Search...",
}) => {
  const [search, setSearch] = React.useState("");
  const [sortField, setSortField] = React.useState<string | null>(null);
  const [sortAsc, setSortAsc] = React.useState(true);

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredRows = rows
    .filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const aValue = a[sortField];
      const bValue = b[sortField];
      return sortAsc
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });

  return (
    <Box component="section" p={4}>
      {title && (
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body1" color="text.secondary" mb={2}>
          {description}
        </Typography>
      )}
      <Input
        fullWidth
        placeholder={filterPlaceholder}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.field}
                  onClick={() => col.sortable && handleSort(col.field)}
                  sx={{
                    cursor: col.sortable ? "pointer" : "default",
                    fontWeight: "bold",
                  }}
                >
                  {col.label}
                  {col.sortable &&
                    (sortField === col.field ? (sortAsc ? " ▲" : " ▼") : " ⇅")}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((col) => {
                  const value = row[col.field];
                  if (col.field === avatarField && typeof value === "string") {
                    return (
                      <TableCell key={col.field}>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar src={value} alt="avatar" />
                          <Typography>{row.name || row.username || "—"}</Typography>
                        </Box>
                      </TableCell>
                    );
                  }
                  if (col.field === badgeField && typeof value === "string") {
                    const color = badgeColors[value] || "default";
                    return (
                      <TableCell key={col.field}>
                        <Chip label={value} color={color as any} />
                      </TableCell>
                    );
                  }
                  return <TableCell key={col.field}>{value}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export const AdvancedTablePuckConfig = {
  label: "Advanced Table",
  fields: {
    title: { type: "text", label: "Title" },
    description: { type: "text", label: "Description" },
    filterPlaceholder: {
      type: "text",
      label: "Search Placeholder",
      defaultValue: "Search...",
    },
    columns: {
      type: "array",
      label: "Columns",
      defaultValue: [],
      item: {
        type: "object",
        fields: {
          label: { type: "text", label: "Label" },
          field: { type: "text", label: "Field Name" },
          sortable: { type: "boolean", label: "Sortable", defaultValue: true },
        },
      },
    },
    rows: {
      type: "array",
      label: "Data Rows",
      defaultValue: [],
      item: {
        type: "object",
        label: "Row",
        fields: {
          name: { type: "text", label: "Name" },
          avatar: { type: "text", label: "Avatar URL" },
          email: { type: "text", label: "Email" },
          status: { type: "text", label: "Status" },
        },
      },
    },
    avatarField: {
      type: "text",
      label: "Avatar Field",
      defaultValue: "avatar",
    },
    badgeField: {
      type: "text",
      label: "Badge Field",
      defaultValue: "status",
    },
    badgeColors: {
      type: "object",
      label: "Badge Colors",
      fields: {
        Active: { type: "text", defaultValue: "success" },
        Pending: { type: "text", defaultValue: "warning" },
        Banned: { type: "text", defaultValue: "error" },
      },
    },
  },
  defaultProps: {
    title: "Team Members",
    description: "Manage user access and roles for your project.",
    filterPlaceholder: "Search users...",
    avatarField: "avatar",
    badgeField: "status",
    badgeColors: {
      Active: "success",
      Pending: "warning",
      Banned: "error",
    },
    columns: [
      { label: "Name", field: "avatar", sortable: false },
      { label: "Email", field: "email", sortable: true },
      { label: "Status", field: "status", sortable: true },
    ],
    rows: [
      {
        name: "Jane Doe",
        avatar: "https://i.pravatar.cc/100?img=1",
        email: "jane@example.com",
        status: "Active",
      },
      {
        name: "John Smith",
        avatar: "https://i.pravatar.cc/100?img=2",
        email: "john@example.com",
        status: "Pending",
      },
      {
        name: "Alice Blue",
        avatar: "https://i.pravatar.cc/100?img=3",
        email: "alice@example.com",
        status: "Banned",
      },
    ],
  },
  render: (props: AdvancedTableProps) => <AdvancedTable {...props} />,
};

