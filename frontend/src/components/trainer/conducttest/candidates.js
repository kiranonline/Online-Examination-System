import React, { Component } from 'react'
import { changeConducttestId, updateCandidatesTest } from '../../../actions/conductTest';
import { connect } from 'react-redux';
import apis from '../../../services/Apis';
import { SecurePost } from '../../../services/axiosCall';
import Alert from '../../common/alert';
import { Table,Input,Button,Icon,message,Typography } from 'antd';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Highlighter from 'react-highlight-words';
import './conducttes.css';

const { Title } = Typography;


class Candidates extends Component {

    constructor(props){
        super(props);
        this.state={
            loading:false,
            searchText: '',
            mainlink:''
        }
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              ref={node => {
                this.searchInput = node;
              }}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm)}
              icon="search"
              size="small"
              style={{ width: 90, marginRight: 8 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </div>
        ),
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
          record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => this.searchInput.select());
          }
        },
        render: text => (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text.toString()}
          />
        ),
    });


    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };
    
    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };




    componentDidMount(){
      var link = window.location.href.split('/').splice(0,3);
      var mainlink="";
      link.forEach((d,i)=>{
          mainlink=mainlink+d+"/"
      });
      this.setState({mainlink});
      this.refreshUserList(); 
    }


    refreshUserList =()=>{
        this.setState({
            loading:true
        })
        SecurePost({
            url:`${apis.GET_TEST_CANDIDATES}`,
            data:{
                id:this.props.conduct.id
            }
        }).then((response)=>{
            console.log(response);
            if(response.data.success){
                this.props.updateCandidatesTest(response.data.data);
            }
            else{
                Alert('error','Error!',response.data.message)
            }
            this.setState({
                loading:false
            })
        }).catch((error)=>{
            console.log(error);
            Alert('error','Error!','Server Error')
            this.setState({
                loading:false
            })
        }) 
    }

    render() {
        const columns = [
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
              ...this.getColumnSearchProps('name'),
            },
            {
              title: 'Email Id',
              dataIndex: 'emailid',
              key: 'emailid',
              ...this.getColumnSearchProps('emailid'),
            },
            {
                title: 'Contact No',
                dataIndex: 'contact',
                key: 'contact',
                ...this.getColumnSearchProps('contact'),
            },
            {
                title: 'Links',
                key: '_id',
                dataIndex: '_id',
                render: id => (
                  <Input disabled={true} value={`${this.state.mainlink}trainee/taketest?testid=${this.props.conduct.id}&traineeid=${id}`} addonAfter={<CopyToClipboard text={`${this.state.mainlink}trainee/taketest?testid=${this.props.conduct.id}&traineeid=${id}`} onCopy={()=>message.success('Link Copied to clipboard')}><Icon type="copy"/></CopyToClipboard>}/>
                ),
            }
        ];

        return (
            <div className="candidate-list-header-container"> 
                <Button className="reload-button" type="primary" icon="reload" loading={this.state.loading} onClick={this.refreshUserList}>Reload!</Button>
                <div className="register-trainer-form-header">
                    <Title level={4} style={{color:'#fff',textAlign:'center'}}>List of Registered Candidates</Title>
                </div> 
                <Table 
                columns={columns} 
                bordered={true} 
                dataSource={this.props.conduct.registeredCandidates}
                rowKey="_id"
                loading={this.state.loading}
                />
            </div>
        )
    }
}



const mapStateToProps = state => ({
    conduct : state.conduct
});

export default connect(mapStateToProps,{
    changeConducttestId,
    updateCandidatesTest
})(Candidates);