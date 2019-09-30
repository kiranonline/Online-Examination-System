import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Badge, Icon,Button,Row,Col  } from 'antd';
import './portal.css';
import {switchQuestion} from '../../../actions/traineeAction';

class Operations extends Component {
    render() {
        return (
            <div className="question-list-wrapper">
                <div className="question-list-inner">
                    <Row style={{padding:'5px'}}>
                        {this.props.trainee.answers.map((d,i)=>{
                            return(
                                <Col key={i} span={6} style={{padding:'10px'}}>
                                    <Mark qid={d.questionid} ans={d.isAnswered}  mark={d.isMarked} no={i}/>
                                </Col>
                            )
                        })}
                    </Row>
                    
                </div>
            </div>
        )
    }
}























function mark(props){
    if(props.mark){
        if(props.ans){
            return(
                <Badge className="qb" count={<Icon type="flag"  theme="filled" style={{ color: '#f5222d' }} />}>
                    <Button onClick={()=>props.switchQuestion(props.no)} style={{background:'#0B6623',color:'#fff'}}>{props.no+1}</Button>
                </Badge>  
            )
        }
        else{
            return(
                <Badge className="qb" count={<Icon type="flag"  theme="filled" style={{ color: '#f5222d' }} />}>
                    <Button onClick={()=>props.switchQuestion(props.no)} style={{background:'#999999',color:'#fff'}}>{props.no+1}</Button>
                </Badge>  
            )
        }
        
    }
    else{
        if(props.ans){
            return(
                <Button onClick={()=>props.switchQuestion(props.no)} className="qb" style={{background:'#0B6623',color:'#fff'}}>{props.no+1}</Button>
            )
        }
        else{
            return(
                <Button onClick={()=>props.switchQuestion(props.no)} className="qb" style={{background:'#999999',color:'#fff'}}>{props.no+1}</Button>
            )
        }
        
        
    }    
}







const mapStateToProps = state => ({
    trainee : state.trainee
});



let Mark=connect(mapStateToProps,{
    switchQuestion
})(mark);

export default connect(mapStateToProps,null)(Operations);