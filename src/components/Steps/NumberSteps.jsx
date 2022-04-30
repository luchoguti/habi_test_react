import {useEffect, useState} from "react";
import BaseConfig from "../../data/config.json";
import {Button, Container} from "../../styles_components/NumberStepsStyles";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";

const NumberSteps = (props) => {
    const {
        stepsActions
    } = useSelector(
        state => ({
            stepsActions : state.stepsActions
        })
    );
    const [allSteps,steAll] = useState([]);
    const history = useHistory();
    const allStepsOrder = ()=>{
        let all_steps =Object.values(BaseConfig.config).map((steps)=>{
          return steps.order;
        }).sort();
        steAll({
            ...all_steps
        })
    };
    const handleCLick = (step)=>{
        let find_sp = Object.values(BaseConfig.config).find((step_find)=>{
            return step_find.order === step;
        });
        history.push(`${find_sp.path}`);
    }
    const btnComplete = (step) => {
        return (stepsActions.step_complete.findIndex((element)=>element === step)!== -1 && step !== stepsActions.step_now);
    }
    useEffect(()=>{
        allStepsOrder();
    },[]);
    return(
      <Container>
          {
              Object.values(allSteps).map((value_state, key)=>{
                  return (
                      <Button
                          onClick={()=>{handleCLick(value_state)}}
                          key={key}
                          {...value_state == stepsActions.step_now?{active_step:true}:{}}
                          {...btnComplete(value_state)?{complete_step:true}:{} }
                      >
                          {
                              value_state
                          }
                      </Button>
                  )
              })
          }
      </Container>
  )
}
export default NumberSteps;