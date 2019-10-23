import React from 'react';
import { connect } from 'react-redux';
import { Row,Col,Button, } from 'antd';
import {SecurePost} from '../../../services/axiosCall';
import apis from '../../../services/Apis';
import Alert from '../../common/alert';
import { Redirect } from 'react-router-dom';
class FinalQuestionView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            testid:null
        }
    }

    createtest =()=>{
        SecurePost({
            url :apis.CREATE_TEST,
            data : {
                type : this.props.test.newtestFormData.testType,
                title : this.props.test.newtestFormData.testTitle,
                questions : this.props.test.newtestFormData.testQuestions,
                duration : this.props.test.newtestFormData.testDuration,
                subjects : this.props.test.newtestFormData.testSubject,
                organisation : this.props.test.newtestFormData.OrganisationName
            }
        }).then((response)=>{
            console.log(response.data);
            if(response.data.success){
                Alert('success','Test paper Created Successfully!','Please wait, you will automatically be redirected to conduct test page.');
                setTimeout(()=>{
                    this.setState({
                        testid : response.data.testid
                    })
                },3000);
            }
            else{
                Alert('error','Error!',response.data.message);
            }
        }).catch((err)=>{
            console.log(err);
            Alert('error','Error!','Server Error');
        })
    }

    render(){
        if(this.state.testid){
            return <Redirect to={`/user/conducttest?testid=${this.state.testid}`} />
        }
        else{
            return (
                <div>
                    {this.props.test.newtestFormData.testQuestions.map((d,i)=>{
                        return <Q key={i+1} _id={d} no={i+1}/>
                    })}
                    <div style={{width:'100%',padding:'10px'}}>
                        <Button style={{float:'right'}} type="primary" onClick={this.createtest}>
                            Create Test
                        </Button>
                    </div>
                    
                </div>
            )
        }
    }
}

const mapStateToProps = state => ({
    test : state.test
});

export default connect(mapStateToProps,null)(FinalQuestionView);



function QuestionView(props) {
    var _id=props._id;
    var no = props.no;
    var obj = props.test.questionsAvailablebasedonSubject.filter((hero)=>{
        return hero._id==_id;
    })
    console.log(obj[0].weightage);
    var oo = ['A','B','C','D','E'];
    return (
        <div style={{marginBottom:'20px'}}>
            <div>
                <div style={{width:'100%'}}>
                    <b style={{float:'left'}}>Question No. {no})</b>
                    <b style={{float:'right'}}>Marks. {obj[0].weightage}</b>
                </div>
                <div style={{padding:'5px 20px'}}>
                    <br/>
                    {obj[0].body}
                    {obj[0].quesimg? <img alt="Question" src={obj[0].quesimg} /> : null}
                </div>
            </div>
            <Row>
                {obj[0].options.map((d,i)=>{
                    return(
                        <Col key={i} span={12} style={{padding:'5px 20px'}}>
                            <b>{oo[i]} ) </b> {d.optbody}
                            {d.optimg? <img alt="Option" src={d.optimg} /> : null}
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

var Q = connect(mapStateToProps,null)(QuestionView);