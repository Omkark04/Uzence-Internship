import React, { useState } from 'react';
import InputField from './components/InputField/InputField';
import DataTable from './components/DataTable/DataTable';
import type { Column } from './components/DataTable/DataTable';
import "tailwindcss";

// ✅ Fix: Extend Record<string, unknown> to satisfy DataTable generic
interface Person extends Record<string, unknown> {
  id: number;
  name: string;
  age: number;
  city: string;
  email: string;
}

const sampleData: Person[] = [
  { id: 1, name: 'Ketan Dhembre', age: 21, city: 'Beed', email: 'ketan123@gmail.com' },
  { id: 2, name: 'Omkar Kangule', age: 20, city: 'Latur', email: 'omkar23@gmail.com' },
  { id: 3, name: 'Kiran Jadhav', age: 19, city: 'Pune', email: 'kiran12@gmail.com' },
  { id: 4, name: 'Rahul Bhatambare', age: 20, city: 'Bangalore', email: 'rahul@gmail.com' },
];

const columns: Column<Person>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
  { key: 'city', title: 'City', dataIndex: 'city', sortable: true },
  { key: 'email', title: 'Email', dataIndex: 'email' },
];

const App: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', search: '' });
  const [selectedRows, setSelectedRows] = useState<Person[]>([]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <div className="min-h-screen bg-red-50 flex flex-col items-center justify-start p-6 md:p-8">
      <div className="w-full max-w-6xl space-y-12">
        {/* InputField Section */}
        <section className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">
            InputField Examples
          </h2>

          <div className="space-y-6">
            {/* First row of inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Full Name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange('name')}
                helperText="First and last name"
                showClear
                required
              />

              <InputField
                label="Email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange('email')}
                invalid={!!formData.email && !validateEmail(formData.email)} // ✅ fixed boolean conversion
                errorMessage={
                  formData.email && !validateEmail(formData.email)
                    ? 'Please enter a valid email address'
                    : undefined
                }
                required
              />
            </div>

            {/* Second row of inputs */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange('password')}
                helperText="Must be at least 8 characters"
                showPasswordToggle
                required
              />
              <InputField
                label="Search"
                placeholder="Search people..."
                value={formData.search}
                onChange={handleInputChange('search')}
                showClear
                variant="filled"
              />
            </div>
          </div>
        </section>

        {/* DataTable Section */}
        <section className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">
            DataTable Example
          </h2>

          <DataTable<Person>
            data={sampleData.filter(person =>
              [person.name, person.city, person.email]
                .some(value => value.toLowerCase().includes(formData.search.toLowerCase()))
            )}
            columns={columns}
            selectable
            onRowSelect={setSelectedRows}
          />

          {selectedRows.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-800 mb-2">
                Selected {selectedRows.length} row{selectedRows.length > 1 ? 's' : ''}:
              </h3>
              <p className="text-blue-700">{selectedRows.map(p => p.name).join(', ')}</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
