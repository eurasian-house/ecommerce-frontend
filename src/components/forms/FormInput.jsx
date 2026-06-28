import FormField from "./FormField";

export default function FormInput({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
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
      <input
        id={id}
        type={type}
        value={value ?? ""}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`form-control ${error ? "is-invalid" : ""} ${className}`}
        {...props}
      />
    </FormField>
  );
}