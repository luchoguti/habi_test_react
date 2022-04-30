import Input from "../Controls/Input";
import React from "react";

const StepRadioBox = (props) => {
    const {data, change, error, value} = props;
    return (
        <div className="input-label">
            <label>{data.description}:</label>
            <div>
                {
                    data.options.map((values, index) => {
                        return (
                            <Input
                                key={index}
                                description={values.name}
                                type={data.type}
                                name={data.name_back}
                                value={values.value}
                                {...value[`${data.name_back}`] === values.value ? {checked: true} : {}}
                                onChange={change}
                            />
                        )
                    })
                }
                {
                    (error[data.name_back].error && (
                        <div className="error">{error[data.name_back].message}.</div>
                    ))
                }
            </div>
        </div>
    )
}
export default StepRadioBox;