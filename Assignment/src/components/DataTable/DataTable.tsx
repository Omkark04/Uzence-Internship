import { useMemo, useState } from 'react';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  emptyMessage?: string;
}

// Relaxed generic constraint so plain interfaces (Person, User, TestData) are accepted
export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyMessage = 'No data available',
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());

  // Sort data when sortKey or sortDirection changes
  const sortedData = useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];
      if (valueA == null) return 1;
      if (valueB == null) return -1;

      // numeric vs string safe compare
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
      return sortDirection === 'asc'
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });
  }, [data, sortKey, sortDirection]);

  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return;
    const columnKey = column.dataIndex as keyof T;
    if (sortKey === columnKey) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(columnKey);
      setSortDirection('asc');
    }
  };

  const handleRowToggle = (rowIndex: number) => {
    const updatedSelection = new Set(selectedRows);
    if (updatedSelection.has(rowIndex)) {
      updatedSelection.delete(rowIndex);
    } else {
      updatedSelection.add(rowIndex);
    }

    setSelectedRows(updatedSelection);
    if (onRowSelect) {
      const selectedData = Array.from(updatedSelection).map(index => sortedData[index]);
      onRowSelect(selectedData);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-gray-600 font-medium">Loading data...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-12 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-200">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {selectable && (
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Select
              </th>
            )}
            {columns.map(column => (
              <th
                key={column.key}
                className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <button
                  onClick={() => handleSort(column)}
                  className={`flex items-center gap-2 font-medium transition-colors ${
                    column.sortable
                      ? 'hover:text-blue-700 cursor-pointer'
                      : 'cursor-default'
                  } ${sortKey === column.dataIndex ? 'text-blue-700' : 'text-gray-500'}`}
                >
                  {column.title}
                  {column.sortable && (
                    <span className="text-sm" aria-hidden>
                      {sortKey === column.dataIndex
                        ? (sortDirection === 'asc' ? '↑' : '↓')
                        : '↕'}
                    </span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, index) => (
            <tr
              key={index}
              onClick={() => selectable && handleRowToggle(index)}
              className={`transition-colors duration-150 ${
                selectable ? 'cursor-pointer hover:bg-blue-50' : ''
              } ${selectedRows.has(index) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              {selectable && (
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(index)}
                    onChange={() => handleRowToggle(index)}
                    onClick={e => e.stopPropagation()}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    title="Select row"
                    aria-label={`Select row ${index + 1}`}
                  />
                </td>
              )}
              {columns.map(column => (
                <td
                  key={column.key}
                  className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap"
                  role="cell"
                >
                  {String(row[column.dataIndex] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
