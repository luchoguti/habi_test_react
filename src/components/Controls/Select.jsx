import React, {useEffect, useState} from "react";

const Select = ({
                    max,
                    description,
                    change,
                    name,
                    error = {error: false, message: ""},
                    value = ""
                }) => {
    const [dataOption, setDataOption] = useState([]);
    const options = (max) => {
        let arr_opt = [];
        for (let i = 1; i <= max; i++) {
            arr_opt.push(i);
        }
        setDataOption(arr_opt);
    }
    useEffect(() => {
        options(max);
    }, [])
    return (
        <div className="input-label">
            <label>{description}</label>
            <select name={name} onChange={change} value={value}>
                <option value="">Elija una opción</option>
                {
                    dataOption.map((values, index) => {
                        return <option
                            key={index}
                            value={values}
                        >{values}</option>
                    })
                }
            </select>
            {
                (error.error && (
                    <div className="error">{error.message}.</div>
                ))
            }
        </div>
    )
}
export default Select;