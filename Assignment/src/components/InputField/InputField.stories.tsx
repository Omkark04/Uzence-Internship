import React, { useState } from 'react';
import type { Meta, StoryFn } from '@storybook/react';
import InputField, { type InputFieldProps } from './InputField';

const meta: Meta<InputFieldProps> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
  },
  tags: ['autodocs'],
};

export default meta;

const Template: StoryFn<InputFieldProps> = (args) => {
  const [value, setValue] = useState(args.value || '');
  
  return (
    <div className="max-w-md">
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mb-6"
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  label: 'Full Name',
  placeholder: 'Enter your full name',
  helperText: 'Please provide your first and last name',
};

export const WithClearButton = Template.bind({});
WithClearButton.args = {
  label: 'Search',
  placeholder: 'Type to search...',
  showClear: true,
  value: 'Sample text',
};

export const Password = Template.bind({});
Password.args = {
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  showPasswordToggle: true,
  helperText: 'Must be at least 8 characters long',
};

export const WithError = Template.bind({});
WithError.args = {
  label: 'Email Address',
  type: 'email',
  placeholder: 'Enter your email',
  invalid: true,
  errorMessage: 'Please enter a valid email address',
  value: 'invalid-email',
};

export const Required = Template.bind({});
Required.args = {
  label: 'Username',
  placeholder: 'Choose a username',
  required: true,
  helperText: 'Username must be unique',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Account Type',
  value: 'Premium User',
  disabled: true,
  helperText: 'Contact support to change account type',
};

export const FilledVariant = Template.bind({});
FilledVariant.args = {
  label: 'Company Name',
  placeholder: 'Enter company name',
  variant: 'filled',
};

export const GhostVariant = Template.bind({});
GhostVariant.args = {
  label: 'Notes',
  placeholder: 'Add your notes here...',
  variant: 'ghost',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  label: 'Code',
  placeholder: 'Enter code',
  size: 'sm',
  maxLength: 6,
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  label: 'Title',
  placeholder: 'Enter title',
  size: 'lg',
};

export const AllFeatures: StoryFn<InputFieldProps> = () => {
  const [basicValue, setBasicValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [searchValue, setSearchValue] = useState('Sample search');
  const [emailValue, setEmailValue] = useState('invalid-email');

  return (
    <div className="space-y-6 max-w-md bg-gray-50 p-6 rounded-xl shadow">
      <InputField
        label="Basic Input"
        placeholder="Type something..."
        value={basicValue}
        onChange={(e) => setBasicValue(e.target.value)}
        helperText="This is a standard input field"
        className="mb-4"
      />
      
      <InputField
        label="Password"
        type="password"
        placeholder="Enter password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        showPasswordToggle={true}
        required={true}
        className="mb-4"
      />
      
      <InputField
        label="Search"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        showClear={true}
        variant="filled"
        className="mb-4"
      />
      
      <InputField
        label="Email"
        type="email"
        placeholder="Enter email"
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        invalid={true}
        errorMessage="Please enter a valid email address"
        required={true}
        className="mb-4"
      />
    </div>
  );
};