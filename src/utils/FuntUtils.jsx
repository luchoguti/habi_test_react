import {setAllDataSteps, setStepNext, setStepNow, setStepPrev} from "../redux/actions/stepAction";
import BaseConfig from "../data/config.json";

export const updateSteps = async (number_step, dispatch) => {
    let next = number_step + 1;
    let prev = (number_step - 1 == 0) ? -1 : number_step - 1;
    await dispatch(setStepNow(number_step));
    await dispatch(setStepNext(next));
    await dispatch(setStepPrev(prev));

}
export const validateRequiredTag = (value_tag, required) => {
    if (value_tag === "" && required) {
        return {
            error: true,
            message: "Campo obligatorio, no puede estar vacio"
        }
    } else {
        return {
            error: false,
            message: ""
        }
    }
}
export const startDataSteps = () => {
    let start_vars = [];
    Object.values(BaseConfig.config).map((steps) => {
        return steps.name_back;
    }).map((steps) => {
        start_vars[steps] = "";
    });
    start_vars["apartment_options_parking_covered"] = "";
    return start_vars;
}