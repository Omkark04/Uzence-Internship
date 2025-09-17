import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";

interface User {
  id: number;
  name: string;
  email: string;
}

const sampleData: User[] = [
  { id: 1, name: "John Doe", email: "john@mail.com" },
  { id: 2, name: "Jane Smith", email: "jane@mail.com" },
];

const columns: { key: string; title: string; dataIndex: keyof User; sortable?: boolean }[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Components/DataTable",
  component: DataTable<User>,
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
  },
};
