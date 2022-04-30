import React, {useEffect, useState} from "react";
import Input from "../Controls/Input";
import {useDispatch, useSelector} from "react-redux";
import {updateSteps} from "../../utils/FuntUtils";
import StepPrevNext from "./StepPrevNext";
import NumberSteps from "./NumberSteps";
import {ContainerBtnSummary, ContainerGeneral, ContainerSectionHmtl} from "../../styles_components/GeneralStyles";
import SummarySteps from "../Summary/SummarySteps";
import {Button} from "../../styles_components/NumberStepsStyles";
import SummaryModal from "../Modals/SummaryModal";

const StepCheckBox = (props) => {
    const {
        stepsActions
    } = useSelector(
        state => ({
            stepsActions: state.stepsActions
        })
    );
    const dispatch = useDispatch();
    const startChecked = typeof stepsActions.all_data_steps[`${props.data.name_back}`] === 'object'
        ? stepsActions.all_data_steps[`${props.data.name_back}`]
        : props.data.options;
    const [checked, setChecked] = useState(startChecked);
    const [openStateModal,setOpenStateModal] = useState(false);

    const handleChange = (id) => {
        let checked_q = !checked[id]['checked'];
        checked[id]['checked'] = checked_q;
        setChecked({
            ...checked
        });
    };
    const validateInput = () => {
        return {
            error: false,
            message: ""
        }
    }
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
                        value={checked}
                        name_value={props.data.name_back}
                    />
                    <div className="input-label">
                        <label>
                            <label>{props.data.description}:</label>
                        </label>
                        <div>
                            {
                                props.data.options.map((value, index) => {
                                    return (
                                        <Input
                                            key={index}
                                            description={value.name}
                                            name={value.value}
                                            type={props.data.type}
                                            checked={checked[index]['checked']}
                                            onChange={() => {
                                                handleChange(index)
                                            }}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
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
export default StepCheckBox;