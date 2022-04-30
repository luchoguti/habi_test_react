import React from 'react';
import {Route} from "react-router-dom";
import Main from "../../pages/Main";
import BaseConfig from "../../data/config.json";
import StepTextField from "../Steps/StepTextField";
import StepSelection from "../Steps/StepSelection";
import StepCheckBox from "../Steps/StepCheckBox";
import StepRadioBox from "../Steps/StepRadioBox";
import StepRadioBoxes from "../Steps/StepRadioBoxes";
import Summary from "../../pages/Summary";

const Routers = () => {
    const componentPath = (component) => {
        switch (component) {
            case "StepTextField":
                return StepTextField;
            case "StepSelection":
                return StepSelection;
            case "StepCheckBox":
                return StepCheckBox;
            case "StepRadioBox":
                return StepRadioBox;
            case "StepRadioBoxes":
                return StepRadioBoxes;
            default:
                return StepTextField;
        }
    }
    return (
        <>
            <Route exact path="/">
                <Main/>
            </Route>
            <Route exact path="/summary">
                <Summary/>
            </Route>
            {
                Object.values(BaseConfig.config).map((data, key) => {
                    let Component = componentPath(data.render_component);
                    return (<Route
                        exact
                        key={key}
                        path={data.path}
                        render={(props) => {
                            return (<Component {...props} data={data}/>)
                        }}
                    />)
                })
            }
        </>
    )
}

export default Routers;