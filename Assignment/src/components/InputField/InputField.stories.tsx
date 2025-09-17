import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    helperText: "This is a helper text",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    invalid: true,
    errorMessage: "Password is required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Password",
    placeholder: "Disabled",
    disabled: true,
  },
};
