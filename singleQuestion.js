import React from 'react'
import { connect } from 'react-redux';
import Alert from '../../common/alert';
import apis from '../../../services/Apis';
import { Post } from '../../../services/axiosCall';
import { Icon,Button,Row,Col,Radio,Checkbox,Tooltip } from 'antd';
import { switchQuestion,updateIsMarked, fetchTestdata } from '../../../actions/traineeAction';
import './portal.css';
import './Diksha.css';

class SingleQuestion extends React.Component{
    constructor(props){
        super(props);
        if(this.props.trainee.answers[this.props.trainee.activeQuestionIndex].chosenOption.length===this.props.trainee.questions[this.props.trainee.activeQuestionIndex].anscount){
            this.state={
                AnswerSelected:true,
                options:this.props.trainee.questions[this.props.trainee.activeQuestionIndex].options,
                answers:this.props.trainee.answers[this.props.trainee.activeQuestionIndex].chosenOption,
                ticked:0
            }
        }
        else{
            this.state={
                AnswerSelected:false,
                options:this.props.trainee.questions[this.props.trainee.activeQuestionIndex].options,
                answers:this.props.trainee.answers[this.props.trainee.activeQuestionIndex].chosenOption,
                ticked:0
            }
        }
        
    }
    componentWillMount(){
        this.setState((PState,Pprops)=>{
            let t=0;
            var s = PState.options.map((d,i)=>{
                for(var ii=0;ii<PState.answers.length;ii++){
                    if(PState.answers[ii]===d._id){
                        t+=1;
                        return({
                            ...d,
                            checked:true
                        })
                    }
                }
                return({
                    ...d,
                    checked:false
                })
            })
            return({
                ticked:t,
                options :s
            })
        })
    }

    SaveTocloud=()=>{
        Post({
            url:`${apis.UPDATE_ANSWERS}`,
            data:{
                testid : this.props.trainee.testid,
                userid:this.props.trainee.traineeid,
                qid:this.props.trainee.questions[this.props.trainee.activeQuestionIndex]._id,
                newAnswer:this.state.answers
            }
        }).then((response)=>{
            if(response.data.success){
                console.log(response.data)
                var t = [...this.props.trainee.answers];
                t[this.props.trainee.activeQuestionIndex]={
                    ...t[this.props.trainee.activeQuestionIndex],
                    chosenOption:this.state.answers,
                    isAnswered:true
                }
                this.props.updateIsMarked(t);
            }
            else{
                this.props.fetchTestdata(this.props.trainee.testid,this.props.trainee.traineeid);
                return Alert('error','Error!',response.data.message);
                
            }
        }).catch((err)=>{
            return Alert('error','Error!','Server Error');
        })
        //save to cloud then
         
    }

    previous=()=>{
        if(this.props.trainee.activeQuestionIndex>0){
            this.props.switchQuestion(this.props.trainee.activeQuestionIndex-1)
        }
    }
    next = ()=>{
        if(this.state.AnswerSelected){
            this.SaveTocloud();
            if(this.props.trainee.activeQuestionIndex<this.props.trainee.questions.length-1){
                this.props.switchQuestion(this.props.trainee.activeQuestionIndex+1)
            } 
        }
        else{
            if(this.props.trainee.activeQuestionIndex<this.props.trainee.questions.length-1){
                this.props.switchQuestion(this.props.trainee.activeQuestionIndex+1)
            } 
        }
    }
    mark=()=>{
        let aa=[...this.props.trainee.answers];
        let c= aa[this.props.trainee.activeQuestionIndex];
        c.isMarked=!this.props.trainee.answers[this.props.trainee.activeQuestionIndex].isMarked;
        aa[this.props.trainee.activeQuestionIndex]=c
        this.props.updateIsMarked(aa);
    }
    onAnswerChange=(d1,d2,d3)=>{
        var ansCount=this.props.trainee.questions[this.props.trainee.activeQuestionIndex].anscount;
        if(d2){
            if(this.state.ticked===ansCount){
                return Alert('error','Error!','Clear selected options to select other option')
            }
            else{
                var op1 = [...this.state.options];
                op1[d1]={
                    ...op1[d1],
                    checked:true
                }
                var op2 = [...this.state.answers]
                op2.push(d3);
                if(this.state.ticked===ansCount-1){
                    this.setState((PState,Pprops)=>{
                        return({
                            AnswerSelected:true,
                            ticked :PState.ticked+1,
                            options : op1,
                            answers : op2
                        })
                    })
                }
                else{
                    this.setState((PState,Pprops)=>{
                        return({
                            ticked :PState.ticked+1,
                            options : op1,
                            answers : op2
                        })
                    })
                }
                
            }
        }
        else{
            op1 = [...this.state.options];
            op1[d1]={
                ...op1[d1],
                checked:false
            }
            op2 = [...this.state.answers]
            var index=op2.indexOf(d3);
            op2.splice(index, 1)
            this.setState((PState,Pprops)=>{
                return({
                    AnswerSelected:false,
                    ticked :PState.ticked-1,
                    options : op1,
                    answers : op2
                })
            })
        }
    }

    render(){
        console.log(this.state)
        let opts=['A','B','C','D','E']
        return (
            <div>
                <div className="Question-single-container">
                    <Row>
                        <Col span={2}>
                            <Button style={{background:'#009999',color:'#fff'}} shape="circle">{this.props.trainee.activeQuestionIndex+1}</Button>
                        </Col>
                        <Col span={22}>
                            <Radio.Group  style={{float:'right'}}>
                                <Radio.Button style={{background:'#009999',color:'#fff'}}>{this.props.trainee.questions[this.props.trainee.activeQuestionIndex].anscount===1?"Single answer type":"Multiple answer type"}</Radio.Button>
                                <Radio.Button style={{background:'#009999',color:'#fff'}}>Marks : {this.props.trainee.questions[this.props.trainee.activeQuestionIndex].weightage}</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>                   
                    {
                             this.props.mode==='mobile'?
                             <Button onClick={this.props.triggerSidebar}  style={{background:'#009999',color:'#fff',display: "flex" , marginLeft: "50px"}}>Question panel</Button>
                            :null
               
                    }
                    
                    <div className="Question-single-body-holder">
                        <div>
                            <h3 style={{fontFamily:"'Montserrat', sans-serif"}}>{this.props.trainee.questions[this.props.trainee.activeQuestionIndex].body}</h3>
                        </div>
                        
                        {this.props.trainee.questions[this.props.trainee.activeQuestionIndex].quesimg?
                            <div className="Single-question-body-image-container">
                                <img alt="Unable to load" src={this.props.trainee.questions[this.props.trainee.activeQuestionIndex].quesimg} className="Single-question-body-image"/>
                            </div>:null
                        }
                    </div>
                    <div className="Question-single-option-panel">
                        <Row>
                            {this.state.options.map((d,i)=>{
                                return(
                                    <Col span={12} key={i} className="Single-option">
                                        <Row>
                                            <Col span={2} style={{textAlign:'center'}}>
                                                <Button style={{background:'#009999',color:'#fff'}} shape="circle">{opts[i]}</Button>
                                                <Checkbox checked={d.checked} onChange={(e)=>{this.onAnswerChange(i,e.target.checked,d._id)}} />
                                            </Col>
                                            <Col span={22} style={{padding:'10px'}}>
                                                <h3 style={{fontFamily:"'Montserrat', sans-serif"}}>{d.optbody}</h3>
                                                <div className="option-image-in-exam-panel-holder">
                                                    {d.optimg?<img alt="Unable to load" className="option-image-in-exam-panel" src={d.optimg}/>:null}
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                </div>
                <div className="control-button-in-exam-portal">
                    <Button.Group>
                        {this.props.trainee.activeQuestionIndex===0?
                            null
                            :
                            <Button style={{background:'#009999',color:'#fff'}} onClick={this.previous}>
                                <Icon type="left" />
                                Previous
                            </Button>
                        }
                        <Button type="default" onClick={this.mark}>
                                <Icon type="flag" />
                                {!this.props.trainee.answers[this.props.trainee.activeQuestionIndex].isMarked?"Mark Question":"Unmark Question"}
                        </Button>
                        {this.props.trainee.activeQuestionIndex===this.props.trainee.questions.length-1?
                            null
                            :
                            <Button style={{background:'#009999',color:'#fff'}} onClick={this.next}>
                                {this.state.AnswerSelected?"Save & Next": "Next"}
                                <Icon type="right" />
                            </Button>
                        }
                        {this.props.trainee.activeQuestionIndex===this.props.trainee.questions.length-1 && this.state.AnswerSelected?
                            <Button style={{background:'#009999',color:'#fff'}} onClick={()=>{this.SaveTocloud()}}>
                                Save
                                <Icon type="right" />
                            </Button>:null
                        }
                    </Button.Group>
                </div>
            </div>
        )
    }   
}


const mapStateToProps = state => ({
    trainee : state.trainee
});

export default connect(mapStateToProps,{
    switchQuestion,
    updateIsMarked,
    fetchTestdata
})(SingleQuestion);