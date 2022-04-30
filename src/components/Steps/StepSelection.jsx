import React, {useEffect, useState} from 'react';
import Select from "../Controls/Select";
import StepPrevNext from "./StepPrevNext";
import {useDispatch, useSelector} from "react-redux";
import {updateSteps, validateRequiredTag} from "../../utils/FuntUtils";
import NumberSteps from "./NumberSteps";
import SummarySteps from "../Summary/SummarySteps";
import {ContainerBtnSummary, ContainerGeneral, ContainerSectionHmtl} from "../../styles_components/GeneralStyles";
import {Button} from "../../styles_components/NumberStepsStyles";
import SummaryModal from "../Modals/SummaryModal";

const StepSelection = (props) => {
    const {
        stepsActions
    } = useSelector(
        state => ({
            stepsActions: state.stepsActions
        })
    );
    const [valueOpt, setValueOpt] = useState(stepsActions.all_data_steps[`${props.data.name_back}`]);
    const [errors, setErrors] = useState({
        error: false,
        message: ""
    });
    const [openStateModal,setOpenStateModal] = useState(false);

    const handleChange = (event) => {
        setValueOpt(event.target.value);
    };
    const validateInput = () => {
        let validate = validateRequiredTag(valueOpt, props.data.required);
        setErrors({
            ...validate
        });
        return validate;
    }
    const dispatch = useDispatch();
    let data = props.data;
    const openModal = ()=>{
        setOpenStateModal(!openStateModal);
    }
    useEffect(async () => {
        await updateSteps(props.data.order, dispatch);
    }, []);
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
                        value={valueOpt}
                        name_value={data.name_back}
                    />
                    <Select
                        description={data.description}
                        name={data.name_back}
                        max={data.option_max}
                        change={handleChange}
                        error={errors}
                        value={valueOpt}
                    />
                    <StepPrevNext
                        name="Siguiente"
                        step={stepsActions.step_next}
                        step_now={props.data.order}
                        onClickValid={validateInput}
                        value={valueOpt}
                        name_value={data.name_back}
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
export default StepSelection;