import React from 'react';

const Input = ({
                   description,
                   type,
                   name,
                   checked = false,
                   value = "",
                   accept = "",
                   onChange = (() => {
                   }),
                   error = {error: false, message: ""}
               }) => {
    return (
        <div className="input-label">
            <label>
                {description}:
            </label>
            <input
                type={type}
                name={name}
                {...type !== 'file' && type !== 'checkbox' ? {value} : {}}
                {...type === 'checkbox' ? {checked} : {}}
                {...type === 'file' ? {accept} : {}}
                {...type === 'radio' && checked ? {checked: true} : {}}
                onChange={onChange}
            />
            {
                (error.error && (
                    <div className="error">{error.message}.</div>
                ))
            }
        </div>
    )
}
export default Input;