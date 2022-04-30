import React, {useEffect, useState} from "react";
import Input from "../Controls/Input";
import InputNumberFormat from "../Controls/InputNumberFormat";
import StepPrevNext from "./StepPrevNext";
import {useDispatch, useSelector} from "react-redux";
import {updateSteps, validateRequiredTag} from "../../utils/FuntUtils";
import NumberSteps from "./NumberSteps";
import SummarySteps from "../Summary/SummarySteps";
import {ContainerBtnSummary, ContainerGeneral, ContainerSectionHmtl} from "../../styles_components/GeneralStyles";
import {Button} from "../../styles_components/NumberStepsStyles";
import SummaryModal from "../Modals/SummaryModal";

const StepTextField = (props) => {
    const {
        stepsActions
    } = useSelector(
        state => ({
            stepsActions: state.stepsActions
        })
    );
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState(stepsActions.all_data_steps[`${props.data.name_back}`]);
    const [errors, setErrors] = useState({
        error: false,
        message: ""
    });
    const [openStateModal,setOpenStateModal] = useState(false);
    let data = props.data;

    const handleChange = (event) => {
        if (event.target.type !== "file") {
            setInputValue(event.target.value);
        } else {
            let file = event.target.files[0];
            let object_file = {
                name: file.name,
                lastModified: file.lastModified,
                lastModifiedDate: file.lastModifiedDate,
                size: file.size,
                type: file.type,
                webkitRelativePath: file.webkitRelativePath
            }
            setInputValue(object_file);
        }
    };
    const validateInput = () => {
        let validate = validateRequiredTag(inputValue, props.data.required);
        setErrors({
            ...validate
        });
        return validate;
    }
    const openModal = ()=>{
        setOpenStateModal(!openStateModal);
    }
    useEffect(async () => {
        await updateSteps(props.data.order, dispatch);
    }, [])
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
                        error={errors}
                        value={inputValue}
                        name_value={data.name_back}
                    />
                    {
                        ((
                            data.type == "text" || data.type == "file" || data.type == "email") && (
                            <Input
                                description={data.description}
                                type={data.type}
                                {...data.type === 'file' ? {accept: "image/png, image/jpeg, image/gif"} : {}}
                                name={data.name_back}
                                onChange={handleChange}
                                error={errors}
                                value={inputValue}
                            />
                        ))
                    }
                    {
                        (data.type == "number" && (
                            <InputNumberFormat
                                description={data.description}
                                type={data.type}
                                name={data.name_back}
                                onChange={handleChange}
                                error={errors}
                                value={inputValue}
                            />
                        ))
                    }
                    <StepPrevNext
                        name="Siguiente"
                        step={stepsActions.step_next}
                        step_now={props.data.order}
                        onClickValid={validateInput}
                        error={errors}
                        value={inputValue}
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
export default StepTextField;