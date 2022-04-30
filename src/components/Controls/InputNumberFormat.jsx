import NumberFormat from 'react-number-format';
import React from "react";

const InputNumberFormat = (props) => {
    return (
        <div className="input-label">
            <label>{props.description}</label>
            <NumberFormat
                {...props}
                thousandsGroupStyle="thousand"
                prefix="$"
                decimalSeparator="."
                displayType="input"
                type="text"
                onValueChange={(values) => {
                    props.onChange({target: {value: values.formattedValue}})
                }
                }
                thousandSeparator={true}
                allowNegative={false}
            />
            {
                (props.error.error && (
                    <div className="error">{props.error.message}.</div>
                ))
            }
        </div>
    )
}
export default InputNumberFormat;