import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";

type User = {
  id: number;
  name: string;
  email: string;
};

const sampleData: User[] = [
  { id: 1, name: "John Doe", email: "john@mail.com" },
  { id: 2, name: "Jane Smith", email: "jane@mail.com" },
];

const columns = [
  { key: "name", title: "Name", dataIndex: "name" as keyof User, sortable: true },
  { key: "email", title: "Email", dataIndex: "email" as keyof User },
];

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
};
export default meta;

type Story = StoryObj<typeof DataTable>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
  },
};
