export default function FormField({
  label,
  error,
  required = false,
  htmlFor,
  children,
  className = "",
}) {
  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={htmlFor} className="form-label">
          {label}
          {required && <span className="text-danger"> *</span>}
        </label>
      )}

      {children}

      {error && (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      )}
    </div>
  );
}