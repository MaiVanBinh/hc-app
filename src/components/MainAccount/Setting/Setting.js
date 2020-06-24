import React from 'react';
import classes from './Setting.module.css';
import Button from '../../UI/Button/Button';
import axios from '../../../axiosInstance';
import {connect} from 'react-redux';
import * as action from '../../../store/actions/index';
import Heading from '../../UI/Heading/Heading';

class Setting extends React.Component {
    state = {
        file: null,
        imageUrl: null,
        loading: false,
        inputKey: '',
    }
    onChangeFile = (event) => {
        this.setState({ file: event.target.files[0], imageUrl: URL.createObjectURL(event.target.files[0])});
        console.log(event.target.files[0]);
      };
    uploadUserAvatarHandler = (event) => {
      event.preventDefault();
      this.fileUpload(this.state.file)
      .then((response) => {
        if(response.data) {
          this.props.onChangeAvatarHandler(response.data.imageUrl)
        }
        this.setState({ inputKey: Date.now(), file: '' });
        
      })
      .catch((e) => {
        return console.log(e);
      });
    }
    fileUpload = (file) => {
      const formData = new FormData();
      formData.append('image', file);
      const config = {
        headers: {
          Authorization: 'Bearer ' + this.props.token,
          'content-type': 'multipart/form-data',
        },
      };
      return axios.patch('/users/avatar', formData, config);
    };
    render() {
        return (
            <section className={classes.Section}>
              <Heading>Thông tin cá nhân</Heading>
              <form onSubmit={this.uploadUserAvatarHandler} className={classes.Form}>
                <div className={classes.Input}>
                    <label className={classes.Label}>Thay đổi avatar</label>
                    <input
                        type='file'
                        key={this.state.inputKey}
                        ref={this.fileInput}
                        className={classes.InputElement}
                        onChange={this.onChangeFile}
                    />
                </div>
                {this.state.file ? <div className={classes.ImgBx}>
                    <img src={this.state.imageUrl} alt="avatar" /> 
                </div>: null }
                <Button btnType="Success" type="submit">Gửi</Button>
              </form>
            </section>
        );
    }
}
const mapStateToProps = (state) => {
    return {
      token: state.auth.token,
    };
  };
const mapDispatchToProps = dispatch => {
  return {
    onChangeAvatarHandler: (imageUrl) => dispatch(action.changeAvatarHandler(imageUrl))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Setting);