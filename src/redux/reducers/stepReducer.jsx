import {ALL_DATA_STEPS, STEP_NEXT, STEP_NOW, STEP_PREV, STEPS_COMPLETE} from "../types";
import {startDataSteps} from "../../utils/FuntUtils";

const start_vars_steps = startDataSteps();
const initialState = {
    step_now:0,
    step_next:0,
    step_prev:0,
    step_complete:[],
    all_data_steps:start_vars_steps
}

export default (state = initialState,action)=>{
    switch (action.type){
        case STEP_NOW:{
            return {
                ...state,
                step_now: action.payload
            }
        }
        case STEP_NEXT:{
            return {
                ...state,
                step_next: action.payload
            }
        }
        case STEPS_COMPLETE:{
            return {
                ...state,
                step_complete: action.payload
            }
        }
        case STEP_PREV:{
            return {
                ...state,
                step_prev: action.payload
            }
        }
        case ALL_DATA_STEPS:{
            return {
                ...state,
                all_data_steps:action.payload
            }
        }
        default: return state;
    }
}