import FormField from "./FormField";

export default function FormSelect({
  label,
  id,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = "",
  children,
  ...props
}) {
  return (
    <FormField
      label={label}
      htmlFor={id}
      error={error}
      required={required}
    >
      <select
        id={id}
        value={value ?? ""}
        onChange={onChange}
        disabled={disabled}
        className={`form-select ${error ? "is-invalid" : ""} ${className}`}
        {...props}
      >
        {children}
      </select>
    </FormField>
  );
}