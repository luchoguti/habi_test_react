import {useSelector} from "react-redux";
import BaseConfig from "../../data/config.json";
import React, {useEffect} from "react";
import {BtnSteps, Container, ContainerTwo, Li} from "../../styles_components/SummaryStepsStyles";
import {BtnHome} from "../../styles_components/GeneralStyles";
import {useHistory} from "react-router-dom";

const SummarySteps = (props) => {
    const {
        stepsActions
    } = useSelector(
        state => ({
            stepsActions: state.stepsActions
        })
    );
    const history = useHistory();
    const changeValueString = (value) => {
        if (value) {
            return 'Si';
        } else {
            return 'No';
        }
    }
    const validateData = (step) => {
        if (typeof stepsActions.all_data_steps[`${step.name_back}`] === "string") {
            return (
                <p>{stepsActions.all_data_steps[`${step.name_back}`]}</p>
            );
        } else if (step.name_back === "apartament_options") {
            return (
                <ul>
                    {
                        Object.values(stepsActions.all_data_steps[`${step.name_back}`]).map((opts, key) => {
                            return (
                                <Li key={key}>
                                    <p>{opts.name}: </p>
                                    <p>{changeValueString(opts.checked)}</p>
                                </Li>
                            )
                        })
                    }
                </ul>
            )
        } else if (typeof stepsActions.all_data_steps[`${step.name_back}`] === "boolean") {
            if (step.name_back === "apartment_options_parking") {
                return (
                    <>
                        <p>{changeValueString(stepsActions.all_data_steps[`${step.name_back}`])}</p>
                        <ul>
                            <Li>
                                <p>{step.actions.sub_option_one.description}: </p>
                                <p>{changeValueString(stepsActions.all_data_steps['apartment_options_parking_covered'])}</p>
                            </Li>
                        </ul>
                    </>
                )
            } else {
                return (
                    <p>{changeValueString(stepsActions.all_data_steps[`${step.name_back}`])}</p>
                )
            }
        }else if (step.name_back == "client_upload_file"){
            return (
                <p>{stepsActions.all_data_steps[`${step.name_back}`].name}</p>
            )
        } else {
            return "";
        }
    }
    const handleClick = ()=>{
        history.push(`/`);
    }
    return (
        <Container {...props.home? {page_summary:true} : {}} {...props.display? {display_summary:true} : {}}>
            <h2>Resumen</h2>
            {
                Object.values(BaseConfig.config).sort((a, b) => {
                    if (a.order < b.order) {
                        return -1;
                    }
                    if (a.order > b.order) {
                        return 1;
                    }
                    return 0;
                }).map((steps, key) => {
                    return (
                        <div key={key}>
                            <ContainerTwo  {...(steps.type === 'checkbox' || steps.type === 'radio') && !props.home? {display_table:true} : {}}>
                                <BtnSteps>{steps.order}</BtnSteps>
                                <p>{steps.description}:</p>
                                {
                                    validateData(steps)
                                }
                            </ContainerTwo>
                        </div>
                    )
                })
            }
            {
                ((props.home && !props.modal)  && (
                    <BtnHome onClick={handleClick}>Ir a Home</BtnHome>
                ))
            }
        </Container>
    )
}
export default SummarySteps;