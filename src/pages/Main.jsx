import React, {useEffect, useState} from "react";
import BaseConfig from "../data/config.json";
import {useDispatch} from "react-redux";
import {
    setStepNext,
    setStepNow,
    setStepPrev,
    findStep,
    setAllDataSteps,
    resetAllDataSteps, setStepComplete
} from "../redux/actions/stepAction";
import {useHistory} from 'react-router-dom';
import {BtnHome, CasitaHome, DivHome} from "../styles_components/GeneralStyles";

const Main = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [firstStepPath, setFirstStepPath] = useState("");

    const handleClick = async () => {
        await dispatch(resetAllDataSteps());
        await dispatch(setStepComplete([]));
        history.push(`${firstStepPath.path}`);
    }
    const StartSteps = () => {
        dispatch(setStepNow(1));
        dispatch(setStepNext(2));
        let min_step = Object.values(BaseConfig.config).reduce(function (prev, curr) {
            return prev.order < curr.order ? prev : curr;
        });
        dispatch(setStepPrev(-1));
        setFirstStepPath({
            ...min_step
        });
    }
    useEffect(() => {
        StartSteps();
    }, []);
    return (
        <DivHome>
            <CasitaHome>
                <img src="casita.png"/>
            </CasitaHome>
            <BtnHome onClick={handleClick}>Quiero Vender</BtnHome>
        </DivHome>
    )
}
export default Main;