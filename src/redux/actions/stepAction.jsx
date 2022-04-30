import {ALL_DATA_STEPS, STEP_NEXT, STEP_NOW, STEP_PREV, STEPS_COMPLETE} from "../types";
import BaseConfig from "../../data/config.json";
import {startDataSteps} from "../../utils/FuntUtils";


export const setStepNow = (step) => async dispatch => {
    dispatch({
        type: STEP_NOW,
        payload: step
    });
}
export const setStepNext = (step) => async dispatch => {
    dispatch({
        type: STEP_NEXT,
        payload: step
    });
}
export const setStepPrev = (step) => async dispatch => {
    dispatch({
        type: STEP_PREV,
        payload: step
    });
}
export const setAllDataSteps = (data) => async dispatch => {
    await dispatch({
        type: ALL_DATA_STEPS,
        payload: data
    });
}
export const resetAllDataSteps = () => async dispatch => {
    let start = startDataSteps();
    await dispatch({
        type: ALL_DATA_STEPS,
        payload: start
    });
}
export const findStep = (order) => {
    return Object.values(BaseConfig.config).find((find_step)=>{
        return find_step.order === order
    })
}
export const getCountSteps = ()=>{
    return Object.values(BaseConfig.config).length;
}
export const setStepComplete = (step) => async dispatch => {
    dispatch({
        type: STEPS_COMPLETE,
        payload: step
    });
}