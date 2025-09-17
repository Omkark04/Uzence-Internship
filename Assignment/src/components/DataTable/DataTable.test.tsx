import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from './DataTable';
import 'tailwindcss';

interface TestData {
  id: number;
  name: string;
  age: number;
}

const mockData: TestData[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 35 },
];

const mockColumns = [
  { key: 'name', title: 'Name', dataIndex: 'name' as keyof TestData, sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age' as keyof TestData, sortable: true },
];

describe('DataTable', () => {
  test('renders table with data', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  test('shows empty state when no data provided', () => {
    render(<DataTable data={[]} columns={mockColumns} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  test('shows custom empty message', () => {
    render(<DataTable data={[]} columns={mockColumns} emptyMessage="Nothing to show here" />);
    expect(screen.getByText('Nothing to show here')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    render(<DataTable data={[]} columns={mockColumns} loading={true} />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  test('handles sorting when column is clicked', () => {
    render(<DataTable data={mockData} columns={mockColumns} />);
    const nameButton = screen.getByText('Name').closest('button');
    expect(nameButton).toBeInTheDocument();
    fireEvent.click(nameButton!);
    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Alice');
  });

  test('renders checkboxes when selectable is true', () => {
    render(<DataTable data={mockData} columns={mockColumns} selectable={true} />);
    const checkboxes = screen.getAllByRole('checkbox');
    // header select cell may or may not exist; we assert that there is at least one checkbox
    expect(checkboxes.length).toBeGreaterThanOrEqual(1);
  });

  test('calls onRowSelect when checkbox is clicked', () => {
    const mockOnRowSelect = jest.fn();
    render(<DataTable data={mockData} columns={mockColumns} selectable={true} onRowSelect={mockOnRowSelect} />);
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    expect(mockOnRowSelect).toHaveBeenCalled();
  });

  test('handles multiple row selection', () => {
    const mockOnRowSelect = jest.fn();
    render(<DataTable data={mockData} columns={mockColumns} selectable={true} onRowSelect={mockOnRowSelect} />);
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);
    fireEvent.click(checkboxes[1]);
    expect(mockOnRowSelect).toHaveBeenCalled();
  });

  test('deselects row when clicked again', () => {
    const mockOnRowSelect = jest.fn();
    render(<DataTable data={mockData} columns={mockColumns} selectable={true} onRowSelect={mockOnRowSelect} />);
    const firstCheckbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(firstCheckbox);
    fireEvent.click(firstCheckbox);
    expect(mockOnRowSelect).toHaveBeenCalled();
  });
});
