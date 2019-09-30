import React from 'react'
import { connect } from 'react-redux';
import { Button } from 'antd';
import {ProceedtoTest,fetchTestdata} from '../../../actions/traineeAction';
import './portal.css';

function Instruction(props) {
    return (
        <div>
            <div className="instaruction-page-wrapper">
                <div className="instruction-page-inner">
                    <h2>General Instructions:</h2>
                    <h4>1. All questions are compulsory.</h4>
                    <h4>2. You can bookmark any question.</h4>
                    <h4>3. Answers can be updated anytime before the time limit.</h4>
                    <h4>4. This test is time bound,there's a timer on the right panel.</h4>
                    <h4>5. Click on 'End Test' button to submit test before time limit. </h4>
                    <h4>6. The test will be automatically submitted when the clock reads 0:0.</h4>
                <h4><b>NOTE :</b>To save answers,click on the 'Save & Next' button.</h4>
                    <div className="proceed-to-test-button">
                        <Button style={{float:'right'}} type="primary" icon="caret-right" onClick={()=>{props.ProceedtoTest(props.trainee.testid,props.trainee.traineeid,()=>{props.fetchTestdata(props.trainee.testid,props.trainee.traineeid)})}}  loading={props.trainee.proceedingToTest}>
                            Proceed To Test
                        </Button>
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    trainee : state.trainee
});




export default connect(mapStateToProps,{
    ProceedtoTest,
    fetchTestdata
})(Instruction);