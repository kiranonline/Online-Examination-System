import React, { Component } from 'react';
import { Skeleton,Row, Col, Icon, Tabs,Descriptions,Button    } from 'antd';
import './questiondetails.css';
import apis from '../../../services/Apis';
import { SecureGet } from '../../../services/axiosCall';
import moment from 'moment';
const { TabPane } = Tabs;

export default class QuestionDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            loading : true,
            details:null
        }
    }

    tabChange = (key)=>{
        console.log(key)
    }

    componentDidMount(){
        var ID = this.props.id;
        SecureGet({
            url: `${apis.FETCH_SINGLE_QUESTION}/${ID}`,
        }).then((response)=>{
            console.log(response.data.data[0]);
            this.setState({
                details : response.data.data[0],
                loading:false
            })
        }).catch((error)=>{
            console.log(error);
        })
    }

    render() {
        return (
            <div>
                <Skeleton loading={this.state.loading} active avatar>
                    <Tabs defaultActiveKey="1" onChange={ (e)=>this.tabChange(e)}>
                        <TabPane tab={ <span><Icon type="home" />Basic Info</span> } key="1">
                            <Tab1 id={this.props.id} details={this.state.details}/>
                        </TabPane>
                        <TabPane tab={ <span><Icon type="question-circle" />Question</span> } key="2">
                            <Tab2 details={this.state.details} />
                        </TabPane>
                    </Tabs>    
                </Skeleton>                
            </div>
        )
    }
}







function Tab1(props) {
    return (
        <div>
            <Descriptions bordered title="" border size="small" column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                <Descriptions.Item label="Question Id">{props.id}</Descriptions.Item>
                <Descriptions.Item label="Subject">{props.details.subject.topic}</Descriptions.Item>
                <Descriptions.Item label="Difficulty">{props.details.difficulty}</Descriptions.Item>
                <Descriptions.Item label="No of Right Answers">{props.details.anscount}</Descriptions.Item>
                <Descriptions.Item label="Weightage">{props.details.weightage}</Descriptions.Item>
                <Descriptions.Item label="Created By">{props.details.createdBy.name}</Descriptions.Item>
                <Descriptions.Item label="Created on">{moment(props.details.createdAt).format("DD/ MM/YYYY , hh:mm:ss")}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}


function Tab2(props){
    const optn =['A','B','C','D','E']
    const Optiondata = props.details;
    console.log(`details : ${Optiondata}`);
    return(
        <div className="mainQuestionDetailsContaine">
            <div className="questionDetailsBody">
                {Optiondata.body}
            </div>
            {Optiondata.quesimg?
                <div className="questionDetailsImageContainer">
                    <img alt="unable to load" className="questionDetailsImage" src={Optiondata.quesimg} />  
                </div>
                : null
            }
            <div>
                {Optiondata.options.map((d,i)=>{
                    return(
                        <div key={i}>
                            <Row type="flex" justify="center" className="QuestionDetailsOptions">
                                <Col span={2}>
                                    {
                                        d.isAnswer?<Button className="green" shape="circle">{optn[i]}</Button>:<Button type="primary" shape="circle">{optn[i]}</Button>
                                    }
                                    
                                </Col>
                                {d.optimg?
                                    <Col span={6} style={{padding:'5px'}}>
                                        <img alt="unable to load" className="questionDetailsImage" src={d.optimg} />
                                    </Col>
                                :
                                    null
                                }
                                {d.optimg?
                                    <Col span={14}>{d.optbody}</Col>
                                :
                                    <Col span={20}>{d.optbody}</Col>
                                }
                            </Row>
                           
                        </div>
                    )
                })}
            </div>
        </div>
        )
}

