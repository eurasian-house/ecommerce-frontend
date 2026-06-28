import FormField from "./FormField";

export default function FormTextarea({
  label,
  id,
  value,
  onChange,
  error,
  rows = 4,
  placeholder = "",
  required = false,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <FormField
      label={label}
      htmlFor={id}
      error={error}
      required={required}
    >
      <textarea
        id={id}
        value={value ?? ""}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        className={`form-control ${error ? "is-invalid" : ""} ${className}`}
        {...props}
      />
    </FormField>
  );
}