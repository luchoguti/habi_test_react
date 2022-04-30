import React, {useEffect, useState} from "react";
import StepRadioBox from "./StepRadioBox";
import {useDispatch, useSelector} from "react-redux";
import StepPrevNext from "./StepPrevNext";
import {setStepNext, setStepNow, setStepPrev} from "../../redux/actions/stepAction";
import {updateSteps, validateRequiredTag} from "../../utils/FuntUtils";
import NumberSteps from "./NumberSteps";
import SummarySteps from "../Summary/SummarySteps";
import {ContainerBtnSummary, ContainerGeneral, ContainerSectionHmtl} from "../../styles_components/GeneralStyles";
import {Button} from "../../styles_components/NumberStepsStyles";
import SummaryModal from "../Modals/SummaryModal";

const StepRadioBoxes = (props) => {
    const {
        stepsActions
    } = useSelector(
        state => ({
            stepsActions: state.stepsActions
        })
    );
    const dispatch = useDispatch();

    const [checked, setChecked] = useState({
        apartment_options_parking: stepsActions.all_data_steps['apartment_options_parking'],
        apartment_options_parking_covered: stepsActions.all_data_steps['apartment_options_parking_covered'],
        apartment_have_lift: stepsActions.all_data_steps['apartment_have_lift']
    });
    const [errors, setErrors] = useState({
        apartment_options_parking: {
            error: false,
            message: ""
        },
        apartment_options_parking_covered: {
            error: false,
            message: ""
        },
        apartment_have_lift: {
            error: false,
            message: ""
        }
    });
    const [openStateModal,setOpenStateModal] = useState(false);

    const handleChange = (event) => {
        let value = (event.target.value === 'true');
        setChecked({
            ...checked,
            [event.target.name]: value
        });
    };
    const validateInput = () => {
        let input_name = props.data.name_back;
        let validate = validateRequiredTag(checked[input_name], props.data.required);
        errors[input_name] = validate;
        setErrors({
            ...errors
        });
        return validate;
    }
    const openModal = ()=>{
        setOpenStateModal(!openStateModal);
    }
    useEffect(async () => {
        await updateSteps(props.data.order, dispatch);
    }, [errors]);
    return (
        <>
            <NumberSteps/>
            <ContainerGeneral>
                <ContainerSectionHmtl>
                    <StepPrevNext
                        name="Anterior"
                        step={stepsActions.step_prev}
                        step_now={props.data.order}
                        onClickValid={validateInput}
                        value={checked}
                        name_value={props.data.name_back}
                    />
                    {
                        <StepRadioBox
                            data={props.data}
                            change={handleChange}
                            error={errors}
                            value={checked}
                        />
                    }
                    {
                        ((typeof props.data.actions['sub_option_one'] !== "undefined")
                            && (checked.apartment_options_parking) && (
                                <StepRadioBox
                                    data={props.data.actions['sub_option_one']}
                                    change={handleChange}
                                    error={errors}
                                    value={checked}
                                />
                            ))
                    }
                    <StepPrevNext
                        name="Siguiente"
                        step={stepsActions.step_next}
                        step_now={props.data.order}
                        onClickValid={validateInput}
                        value={checked}
                        name_value={props.data.name_back}
                    />
                </ContainerSectionHmtl>
                <SummarySteps/>
            </ContainerGeneral>
            <ContainerBtnSummary>
                <Button view_summary onClick={openModal}>
                    Ver Resumen
                </Button>
                <SummaryModal
                    open={openStateModal}
                    setOpenStateModal={setOpenStateModal}
                />
            </ContainerBtnSummary>

        </>
    )
}
export default StepRadioBoxes;