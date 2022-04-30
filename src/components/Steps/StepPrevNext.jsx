import {useHistory} from "react-router-dom";
import {findStep, getCountSteps, setAllDataSteps, setStepComplete} from "../../redux/actions/stepAction";
import {useDispatch, useSelector} from "react-redux";
import {updateSteps} from "../../utils/FuntUtils";
import {forwardRef, useEffect, useState} from "react";
import {ButtonNextPrev} from "../../styles_components/StepPrevNextStyle";


const StepPrevNext = forwardRef((props, ref) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [lastBtnNext, setLastBtnNext] = useState(false);
    const {
        stepsActions
    } = useSelector(
        state => ({
            stepsActions: state.stepsActions
        })
    );
    const hiddenBtn = () => {
        let count_steps = getCountSteps();
        if (props.step_now == count_steps && props.name == "Siguiente") {
            setLastBtnNext({
                ...false
            });
        }
    }
    const updateData = () => {
        if (
            typeof props.value === "object"
            && props.name_value !== "apartament_options"
            && props.name_value !== "client_upload_file"
        ) {
            Object.entries(props.value).map((steps_values) => {
                stepsActions.all_data_steps[steps_values[0]] = steps_values[1];
                dispatch(setAllDataSteps({
                    ...stepsActions.all_data_steps,
                    [steps_values[0]]: steps_values[1]
                }));
            });
        } else {
            dispatch(setAllDataSteps({
                ...stepsActions.all_data_steps,
                [props.name_value]: props.value
            }));
        }
    }
    const completeStep = () => {
        if (props.name == "Siguiente") {
            let complete = stepsActions.step_complete;
            complete.push(stepsActions.step_now);
            dispatch(setStepComplete(complete));
        }
    }
    const handlePrevAndNext = async (number_step) => {
        let validate = await props.onClickValid();
        if (!validate.error) {
            updateSteps(number_step, dispatch, stepsActions);
            completeStep();
            updateData();
            if (number_step == -1) {
                history.push(`/`);
            }else if (props.name == 'Siguiente' && lastBtnNext){
                history.push(`/summary`);

            } else {
                let path_url = findStep(number_step).path;
                history.push(`${path_url}`);
            }
        }
    }
    useEffect(() => {
        hiddenBtn(props.step);
        console.log(stepsActions);
    }, []);
    return (
        <>
            <ButtonNextPrev
                onClick={() => {
                    handlePrevAndNext(props.step);
                }}
                {...props.name == 'Siguiente' && lastBtnNext ? {btnEnd:true}: {}}
            >
                {props.name == 'Anterior' ? "<< " : ""}
                {props.name == 'Siguiente' && lastBtnNext ? "Finalizar": props.name}
                {props.name == 'Siguiente' && !lastBtnNext ? " >> " : ""}
            </ButtonNextPrev>
        </>
    )
});
export default StepPrevNext;