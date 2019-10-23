import React, { Component } from 'react';
import './testdetails.css';
import { Card,Row,Col  } from 'antd';
import { Bar, Doughnut } from 'react-chartjs-2';
import {bgcolor,bordercolor} from '../../../services/bgcolor';



export default class Stats extends Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.id,
            stats:this.props.stats,
            Scorelable:[],
            Scoredata:[],
            bgColor1:[],
            borcolor1:[],
            maxmMarks:this.props.maxmMarks,
            passData:[0,0],
            passLable:['Fail','Pass'],
            stat:['91% to 100%','81% to 90%','71% to 80%','61% to 70%','50% to 60%','Below 50%'],
            statdata:[0,0,0,0,0,0]

        } 
    }
    
    componentWillMount(){
        let {bgColor1,borcolor1}=this.state;
        var maxi=-1;
        let p=0;
        let f=0;
        let p90_100=0;
        let p80_90=0;
        let p70_80=0;
        let p60_70=0;
        let p50_60=0;
        let below50=0;
        var pc=0;
        this.state.stats.map((d,i)=>{
            pc=(d.score/this.state.maxmMarks)*100;
            if(pc>=91){
                p90_100++;
            }
            else if(pc>=81){
                p80_90++;
            }
            else if(pc>=71){
                p70_80++;
            }
            else if(pc>=61){
                p60_70++;
            }
            else if(pc>=50){
                p50_60++;
            }
            else{
                below50++;
            }

            if(d.score>=this.state.maxmMarks/2){
                p++;
            }
            else{
                f++;
            }
            if(d.score>maxi){
                maxi=d.score
            }
        })
        var dp =[];
        var label = [];
        
        for(let i=0;i<=maxi;i++){
            dp.push(0);
            label.push(i);
            bgColor1.push(bgcolor[i]);
            borcolor1.push(bordercolor[i]);

        }
        
        this.state.stats.map((d,i)=>{
            dp[d.score]++;
        })  
        this.setState({
            Scorelable:label,
            Scoredata:dp,
            bgColor1:bgColor1,
            borcolor1:borcolor1,
            passData:[f,p],
            statdata:[p90_100,p80_90,p70_80,p60_70,p50_60,below50]
        })      
    }

    render() {
        let barData={
            labels:this.state.Scorelable,
            datasets:[{
                label: 'Scores',
                data: this.state.Scoredata,
                backgroundColor:this.state.bgColor1,
                borderColor:this.state.borcolor1,
                borderWidth: 1
            }]
        }
        let DoughNutData1={
            labels:this.state.passLable,
            datasets:[{
                label: 'Pass/Fail',
                data: this.state.passData,
                backgroundColor:[bgcolor[0],bgcolor[1]],
                borderColor:[bordercolor[0],bordercolor[1]],
                borderWidth: 1
            }]
        }
        let DoughNutData2={
            labels:this.state.stat,
            datasets:[{
                label: 'Percentage wise category',
                data: this.state.statdata,
                backgroundColor:[bgcolor[0],bgcolor[1],bgcolor[2],bgcolor[3],bgcolor[4],bgcolor[5]],
                borderColor:[bordercolor[0],bordercolor[1],bordercolor[2],bordercolor[3],bordercolor[4],bordercolor[5]],
                borderWidth: 1
            }]
        }
        return (
            <div>
                <div>
                    <Card >
                        <div className="download-section">
                            <b>Download the test result excel sheet.</b>
                            <a href={this.props.file} target="_blank" className="download-xlsx">Download</a>
                        </div>
                    </Card>
                </div> 
                <div style={{marginTop:'10px'}}>
                    <Card >
                        <div style={{padding:'10px 10px 0px 10px'}}>
                            <b>Score vs No of students.</b>
                        </div>
                        <div style={{padding:'0px 10px 10px 10px'}}>
                            <Bar
                                data={barData}
                                options={{ maintainAspectRatio: false }}
                            />
                        </div>
                    </Card>
                </div>
                <div style={{marginTop:'10px'}}>
                    <Card >
                        <Row>
                            <Col span={12}>
                                <div style={{padding:'10px 10px 0px 10px'}}>
                                    <b>Pass/Fail.</b>
                                </div>
                                <div style={{padding:'0px 10px 10px 10px'}}>
                                    <Doughnut data={DoughNutData1} />
                                </div>
                            </Col>
                            <Col span={12}>
                                <div style={{padding:'10px 10px 0px 10px'}}>
                                    <b>Percentage wise category.</b>
                                </div>
                                <div style={{padding:'0px 10px 10px 10px'}}>
                                    <Doughnut data={DoughNutData2} />
                                </div>
                            </Col>
                        </Row>
                        
                    </Card>
                </div>                
            </div>
        )
    }
}
