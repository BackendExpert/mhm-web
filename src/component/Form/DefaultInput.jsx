import React from 'react';

const DefaultInput = ({
    label,
    type = 'text',
    name,
    value,
    onChange,
    placeholder,
    required = false,
}) => {
    return (
        <div className="w-full mb-5">
            {label && (
                <label
                    htmlFor={name}
                    className="block mb-2 text-xs font-semibold text-indigo-600"
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="
                    w-full
                    px-1 py-2
                    bg-transparent
                    text-gray-800
                    placeholder-indigo-300
                    border-0
                    border-b-2
                    border-indigo-200
                    focus:border-indigo-600
                    focus:outline-none
                    transition-all duration-200
                "
            />
        </div>
    );
};

export default DefaultInput;