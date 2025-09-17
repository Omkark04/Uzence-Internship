// File: src/components/DataTable/DataTable.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import DataTable, { type DataTableProps, type Column } from './DataTable';
import 'tailwindcss';

interface Person extends Record<string, unknown> {
  id: number;
  name: string;
  age: number;
  city: string;
  email: string;
  department: string;
}

const meta: Meta<DataTableProps<Person>> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<DataTableProps<Person>> = (args) => {
  const [selectedRows, setSelectedRows] = useState<Person[]>([]);

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
        <DataTable<Person>
          {...args}
          onRowSelect={setSelectedRows}
        />
      </div>

      {args.selectable && selectedRows.length > 0 && (
        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
          <h3 className="font-semibold text-gray-700 mb-2">Selected Rows:</h3>
          <pre className="text-sm bg-gray-100 p-3 rounded-md overflow-auto max-h-48">
            {JSON.stringify(selectedRows, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

const sampleData: Person[] = [
  { id: 1, name: 'Alice Johnson', age: 30, city: 'Pune', email: 'alice@example.com', department: 'Engineering' },
  { id: 2, name: 'Bob Smith', age: 25, city: 'Mumbai', email: 'bob@example.com', department: 'Design' },
  { id: 3, name: 'Charlie Brown', age: 28, city: 'Delhi', email: 'charlie@example.com', department: 'Marketing' },
  { id: 4, name: 'Diana Prince', age: 32, city: 'Bangalore', email: 'diana@example.com', department: 'Sales' },
  { id: 5, name: 'Edward Wilson', age: 27, city: 'Chennai', email: 'edward@example.com', department: 'Engineering' },
];

const columns: Column<Person>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  { key: 'city', title: 'City', dataIndex: 'city', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
  { key: 'department', title: 'Department', dataIndex: 'department', sortable: true },
];

export const Default = Template.bind({});
Default.args = {
  data: sampleData,
  columns: columns.slice(0, 3),
  selectable: false,
};

export const WithSelection = Template.bind({});
WithSelection.args = {
  data: sampleData,
  columns: columns,
  selectable: true,
};

export const Loading = Template.bind({});
Loading.args = {
  data: [],
  columns: columns,
  loading: true,
};

export const Empty = Template.bind({});
Empty.args = {
  data: [],
  columns: columns,
  emptyMessage: 'No employees found',
};

export const MinimalColumns = Template.bind({});
MinimalColumns.args = {
  data: sampleData,
  columns: [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'city', title: 'City', dataIndex: 'city' },
  ],
  selectable: true,
};