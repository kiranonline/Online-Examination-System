import React from 'react';
import './backbone.css';
import { connect } from 'react-redux';
import AllTrainer from '../admin/allTrainer/alltrainer';
import AllTopics from '../admin/allTopics/alltopics.js';
import AllQuestions from '../trainer/allquestions/allquestion';
import AllTests from '../trainer/alltests/alltest';
import ConductTest from '../trainer/conducttest/conducttest';
import NewTest from '../trainer/newtest/newtest';
import auth from '../../services/AuthServices';
import Welcome from './welcome';
import ErrorPage from './errorPage';
import { login, logout } from '../../actions/loginAction';
import { changeActiveRoute } from '../../actions/useraction';
import Alert from '../common/alert';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { Layout, Menu,Button, Icon, Tooltip } from 'antd';
import main from './main.jpg';
const { Header, Sider, Content } = Layout;

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={
            LocalIsLoggedIn : this.props.user.isLoggedIn,
            collapsed: true
        }
    }

    toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
    };

    logOut =()=>{
        auth.deleteToken();
        window.location.href='/';
    }

    componentWillMount(){
        console.log(this.state.LocalIsLoggedIn);
        var t = auth.retriveToken();
        if(this.state.LocalIsLoggedIn){
            
        }
        else if(t && t!=='undefined'){
            auth.FetchAuth(t).then((response)=>{
                console.log(response.data);
                this.props.login(response.data.user);
                this.setState({
                    LocalIsLoggedIn : true
                })
                var subUrl = this.props.match.params.options;
                console.log(subUrl);
                var obj = this.props.user.userOptions.find((o,i)=>{
                    if(o.link ===`/user/${subUrl}`){
                        return o
                    }
                });
                var tt=this.props.user.userOptions.indexOf(obj);
                if(tt===-1){
                    window.location.href=`${this.props.user.userOptions[0].link}`;
                }
                else{
                    this.props.changeActiveRoute(String(tt));
                }
            }).catch((error)=>{
                Alert('warning','Warning!','Server Error.');
                auth.deleteToken();
                window.location.href='/';
                
            })
        }
        else{
            window.location='/';
        }
        
    }



    render(){
        let torender = null;
        if(this.props.match.params.options==='listtrainers'){
            torender = <AllTrainer/>;
        }
        else if(this.props.match.params.options==='listsubjects'){
            torender = <AllTopics/>
        }
        else if(this.props.match.params.options==='listquestions'){
            torender = <AllQuestions/>
        }
        else if(this.props.match.params.options==='listtests'){
            torender = <AllTests/>
        }
        else if(this.props.match.params.options==='home'){
            torender=<Welcome />
        }
        else if(this.props.match.params.options==='newtest'){
            torender=<NewTest />
        }
        else if(this.props.match.params.options==='conducttest'){
            let params = queryString.parse(this.props.location.search)
            console.log(params)
            torender=<ConductTest {...params}/>
        }
        else{
            torender=<ErrorPage />
        }
        return (
            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}
                    style={{
                        overflow: 'hidden',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        zIndex:5
                      }}
                    >
                    <div className="logo11" />
                    <Menu 
                        defaultSelectedKeys={[this.props.user.activeRoute]}
                        mode="inline"
                        theme="dark"
                        >
                        {
                            this.props.user.userOptions.map((d,i)=>{
                                return(
                                    <Menu.Item key={i}>
                                        <Icon type={d.icon} />
                                        <span>{d.display}</span>
                                        <Link to={d.link}></Link>
                                    </Menu.Item>
                                )
                            })
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header theme="dark" style={{ position:'fixed',width:'100vw',paddingLeft: '10px',zIndex:'1000' }}>
                    
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                            style={{color:'#fff',fontSize:'20px'}}
                            />
                        <ul className="user-options-list">
                            <li>
                                <Tooltip placement="bottom" title="Log Out">
                                    <Button type="primary" size="large" shape="circle" onClick={this.logOut} className="logout-button">
                                        <Icon type="logout" />
                                    </Button>
                                </Tooltip>
                            </li>
                            <li>
                                <img src={main} alt="company logo" className="d-logo" />
                            </li>
                        </ul>
                            
                    </Header>
                    <Content
                        style={{
                        margin: '24px 16px',
                        padding: 24,
                        marginTop:'80px',
                        background: 'rgb(205,217,225)',
                        minHeight: '100vh',
                        marginLeft:'95px'
                        }}
                    >
                        <div style={{ width:'100%', }}>
                            {torender}
                        </div>
                    </Content>
                </Layout>
            </Layout> 
        );
    }
   
}

const mapStateToProps = state => ({
    user : state.user
});




export default connect(mapStateToProps,{
    changeActiveRoute,
    login, 
    logout
})(Dashboard);
