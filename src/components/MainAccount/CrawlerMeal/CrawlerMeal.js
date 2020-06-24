import React from 'react';
import classes from './CrawlerMeal.module.css';
import Button from '../../UI/Button/Button';
import axios from '../../../axiosInstance';
import {connect} from 'react-redux';
import ListSearchMeal from '../../ListSearchMeal/ListSearchMeals';
import MethodItem from '../../Methods/MethodItem/MethodItem';
import Modal from '../../UI/Modal/Model';
import Heading from '../../UI/Heading/Heading';

class CrawlerMeal extends React.Component {
    state = {
      title: '',
      file: null,
      imageUrl: null,
      name: '',
      methodId: null,
      showModel: false,
      loading: false,
      listMeal: null,
      inputKey: '',
      methods: null,
      addNew: false
    }

    onChangeInputHandler = (event) => {
      if(event.target.name === 'name'){
        this.setState({name: event.target.value});   
      } else if (event.target.name === 'title') {
        this.setState({title: event.target.value});  
      }
      
    };

    onChangeFile = (event) => {
      this.setState({ file: event.target.files[0], imageUrl: URL.createObjectURL(event.target.files[0])});
      console.log(event.target.files[0]);
    };

    crawlerData = (event) => {
        event.preventDefault();
        let config = {
          headers: {
              Authorization: 'Bearer ' + this.props.token,
              'Content-Type': 'application/json'
          }
        }
        axios.get('/admin/ad/crawler-data?videoTitle=' + this.state.title, config)
          .then(res => this.setState({listMeal: res.data.meals}))
          .catch(e => console.log(e));
    }

    onMethodClickHandler = (data) => {
      if(data === 'add') {
        return this.setState({showModel: true, name: '', imageUrl: '', methodId: '', addNew: true});
      }
      this.setState({showModel: true, name: data.name, imageUrl: data.imageUrl, methodId: data._id});
    }

    cancelAddMealHandler = () => {
      this.setState({showModel: false, inputKey: Date.now()});
    }
    
    componentDidMount() {
      if(this.props.method) {
        this.setState({methods: this.props.method});
      }
    }
    onUpdateMethodHandler = () => {
      let config = {
        headers: {
            Authorization: 'Bearer ' + this.props.token,
            'Content-Type': 'application/json'
        }
      }
      const formData = new FormData();
      if(this.state.file){
        formData.append('image', this.state.file);
      }
      formData.append('name', this.state.name);
      axios.put('/methods/' + this.state.methodId, formData, config)
        .then(res => {
          const methodUpdate = [...this.state.methods];
          const index = methodUpdate.findIndex(method => (method._id === res.data._id));
          methodUpdate[index] = res.data; 
          this.setState({methods: methodUpdate, showModel: false});
        })
        .catch(e => console.log(e));
    }
    onDeleteMethodHandler = () => {
      let config = {
        headers: {
            Authorization: 'Bearer ' + this.props.token,
            'Content-Type': 'application/json'
        }
      }
      axios.delete('/methods/' + this.state.methodId, config)
        .then(res => {
          const methodUpdate = this.state.methods.filter(method => (method._id !== res.data._id));
          this.setState({methods: methodUpdate, showModel: false});
        })
      .catch(e => console.log(e));
    }
    onAddMethodHandler = () => {
      let config = {
        headers: {
            Authorization: 'Bearer ' + this.props.token,
            'Content-Type': 'application/json'
        }
      }
      const formData = new FormData();
      if(this.state.file){
        formData.append('image', this.state.file);
      }
      formData.append('name', this.state.name);
      axios.post('/methods/method', formData, config)
        .then(res => {
          const methodUpdate = [...this.state.methods];
          methodUpdate.unshift(res.data); 
          this.setState({methods: methodUpdate, showModel: false});
        })
        .catch(e => console.log(e));
    }
    render() {
      let listMethods = null;
      if(this.state.methods) {
        listMethods = this.state.methods.map(method => (<MethodItem clicked={this.onMethodClickHandler} data={method} key={method._id}/>));
      }
      return (
        <section className={classes.Section}>
            <Modal show={this.state.showModel} BackdropClicked={this.cancelAddMealHandler}>
            <div>
                <div className={classes.Input}>
                  <label className={classes.Label}>Tên phương pháp nấu</label>
                  <input
                    className={classes.InputElement}
                    type='text'
                    name='name'
                    value={this.state.name}
                    onChange={this.onChangeInputHandler}
                  />
                </div>
                <div className={classes.Input}>
                  <label className={classes.Label}>Hình ảnh</label>
                  <input
                    type='file'
                    key={this.state.inputKey}
                    ref={ref=> this.fileInput = ref} 
                    className={classes.InputElement}
                    onChange={this.onChangeFile}
                  />
                </div>
                <img src={this.state.imageUrl} alt="" style={{display: 'block', width: '100px', height: '100px'}} />
                {this.state.addNew ? <Button btnType="Success" clicked={this.onAddMethodHandler}>Thêm mới</Button> : null}
                {!this.state.addNew ? <Button btnType="Success" clicked={this.onUpdateMethodHandler}>Sửa</Button> : null}
                {!this.state.addNew ? <Button btnType="Danger" clicked={this.onDeleteMethodHandler}>Xóa</Button> : null}
                </div>
            </Modal>
            <div className="container">
              <Heading>Phương pháp chế biến</Heading>
              <div style={{textAlign: 'center'}}>
                <Button btnType="Success" clicked={() => this.onMethodClickHandler('add')}>Thêm phương pháp nấu mới</Button>
              </div>
              <div className="recommend-cuisine-box row10" style={{marginBottom: '300px'}}>
                {listMethods}
              </div>
          </div>
          <Heading>Tìm kiếm món ăn trên Youtube</Heading>
          <form onSubmit={this.crawlerData} className={classes.Form}>
            <div className={classes.Input}>
                <label className={classes.Label}>Tên</label>
                <input
                    type='text'
                    className={classes.InputElement}
                    onChange={this.onChangeInputHandler}
                    value={this.state.title}
                    name="title"
                    placeholder="Nhập tên món ăn cần tìm kiếm"
                />
            </div>
            <Button btnType="Success" type="submit">Gửi</Button>
          </form>
          {this.state.listMeal ? <ListSearchMeal meals={this.state.listMeal} /> : null}
        </section>
      );
    }
}
const mapStateToProps = (state) => {
    return {
      token: state.auth.token,
      method: state.method.method
    };
  };

export default connect(mapStateToProps)(CrawlerMeal);