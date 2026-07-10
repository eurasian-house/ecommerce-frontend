import Select from "react-select";

export default function ProductSelect({
    label,
    name,
    value,
    options,
    onChange,
    placeholder,
    required = false,
    error = false,
    isMulti = false,
}) {

    const selectOptions = options.map(item =>
        typeof item === "string"
            ? {
                value: item,
                label: item,
            }
            : item
    );

    const selectedValue = isMulti
        ? selectOptions.filter(option => value?.includes(option.value))
        : selectOptions.find(option => option.value === value) || null;

    return (
        <div>

            <label className="form-label">
                {label}
                {required && <span className="text-danger"> *</span>}
            </label>

            <Select
                options={selectOptions}
                placeholder={placeholder}
                value={selectedValue}
                isMulti={isMulti}
                isSearchable
                onChange={(selected) => {
                    if (isMulti) {
                        onChange(selected || []);
                    } else {
                        onChange({
                            target: {
                                name,
                                value: selected?.value || "",
                            },
                        });
                    }
                }}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        minHeight: 48,
                        borderRadius: 14,
                        borderColor: error
                            ? "#dc3545"
                            : state.isFocused
                                ? "#212529"
                                : "#dee2e6",
                        boxShadow: state.isFocused
                            ? "0 0 0 .15rem rgba(33,37,41,.12)"
                            : "none",
                        "&:hover": {
                            borderColor: "#212529",
                        },
                        padding: "2px 6px",
                    }),

                    valueContainer: (base) => ({
                        ...base,
                        padding: "2px 8px",
                    }),

                    placeholder: (base) => ({
                        ...base,
                        color: "#6c757d",
                    }),

                    menu: (base) => ({
                        ...base,
                        borderRadius: 14,
                        overflow: "hidden",
                        boxShadow: "0 12px 32px rgba(0,0,0,.12)",
                        zIndex: 9999,
                    }),

                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                            ? "#212529"
                            : state.isFocused
                                ? "#f8f9fa"
                                : "#fff",
                        color: state.isSelected ? "#fff" : "#212529",
                        padding: "12px 16px",
                        cursor: "pointer",
                    }),

                    multiValue: (base) => ({
                        ...base,
                        background: "#f3f4f6",
                        borderRadius: 999,
                    }),

                    multiValueLabel: (base) => ({
                        ...base,
                        fontWeight: 500,
                    }),

                    multiValueRemove: (base) => ({
                        ...base,
                        borderRadius: "0 999px 999px 0",
                        ":hover": {
                            background: "#dc3545",
                            color: "#fff",
                        },
                    }),
                }}
            />

        </div>
    );
}