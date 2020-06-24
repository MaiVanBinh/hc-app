import React from 'react';
import classes from './AddMeal.module.css';
import axios from '../../../axiosInstance';
import { Editor } from '@tinymce/tinymce-react';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';
import imageExample from '../../../assets/ytlink-example.png';

class AddMeal extends React.Component {
  state = {
    showImage: false,
    addMealForm: {
      title: '',
      file: null,
      ytLink: '',
      ingredients: '',
      recipe: '',
    },
    loading: false,
  };

  showImageHandler = () => {
    this.setState((preState) => ({ showImage: !preState.showImage }));
  };

  handleEditorChangeIngredients = (content, editor) => {
    const updateForm = {
      ...this.state.addMealForm,
    };
    updateForm.ingredients = content;
    this.setState({ addMealForm: updateForm });
  };

  handleEditorChangeRecipe = (content, editor) => {
    const updateForm = {
      ...this.state.addMealForm,
    };
    updateForm.recipe = content;
    this.setState({ addMealForm: updateForm });
  };

  onFormSubmit = (e) => {
    e.preventDefault(); // Stop form submit
    this.fileUpload(this.state.file)
      .then((response) => {
        if (this.props.isAddNew) {
          this.props.onAddNewMealSuccess(response.data);
        } else {
          this.props.onUpdateMealSuccess(response.data);
        }
        alert(
          'Món ăn của bạn sẽ được chúng tôi kiểm duyệt trước khi có thể được tìm kiếm bởi người khác.'
        );
        const refreshForm = {
          title: '',
          file: null,
          ytLink: '',
          ingredients: '',
          recipe: '',
        };
        this.setState({ addMealForm: refreshForm });
      })
      .catch((e) => {
        return alert(e.response.data.message);
      });
  };

  onChangeFile = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  inputChangeHandler = (event) => {
    const updateForm = {
      ...this.state.addMealForm,
    };
    updateForm[event.target.name] = event.target.value;
    this.setState({ addMealForm: updateForm });
  };

  fileUpload = (file) => {
    const url = '/meals/owner-meal';
    const formData = new FormData();
    if (this.props.mealUpdate) {
      formData.append('mealId', this.props.mealUpdate._id);
    }
    formData.append('title', this.state.addMealForm.title);
    formData.append('image', file);
    formData.append('ytLink', this.state.addMealForm.ytLink);
    formData.append(
      'ingredients',
      this.state.addMealForm.ingredients.replace(/\n/g, '<br />')
    );
    formData.append(
      'recipe',
      this.state.addMealForm.recipe.replace(/\n/g, '<br />')
    );
    const config = {
      headers: {
        Authorization: 'Bearer ' + this.props.token,
        'content-type': 'multipart/form-data',
      },
    };
    if (this.props.isAddNew) {
      return axios.post(url, formData, config);
    }
    return axios.put(url, formData, config);
  };

  componentDidUpdate(preProps) {
    if(this.props.show !== preProps.show){
      const formCancel = {
        title: '',
        file: null,
        ytLink: '',
        ingredients: '',
        recipe: '',
      };
      this.setState({ addMealForm: formCancel, showImage: false });
    }
    if (preProps.mealUpdate !== this.props.mealUpdate && this.props.mealUpdate) {
      if (!this.props.isAddNew && this.props.mealUpdate) {
        const formCancel = {
          title: this.props.mealUpdate.title,
          file: null,
          ytLink:
            'https://www.youtube.com/watch?v=' + this.props.mealUpdate.ytId,
          ingredients: this.props.mealUpdate.ingredients,
          recipe: this.props.mealUpdate.recipe,
        };
        this.setState({ addMealForm: formCancel, showImage: false });
      }
    }
  }

  render() {
    return (
      <section className={classes.Section}>
        <h1>Thông tin món ăn</h1>
        <form onSubmit={this.onFormSubmit}>
          <div className={classes.Input}>
            <label className={classes.Label}>Tên món ăn</label>
            <input
              className={classes.InputElement}
              type='text'
              name='title'
              value={this.state.addMealForm.title}
              onChange={this.inputChangeHandler}
            />
          </div>
          <div className={classes.Input}>
            <label className={classes.Label}>Hình ảnh</label>
            <input
              type='file'
              ref={this.fileInput}
              className={classes.InputElement}
              onChange={this.onChangeFile}
            />
          </div>
          <div className={classes.Input}>
            <label className={classes.Label}>Link Youtube</label>
            <input
              type='text'
              name='ytLink'
              className={classes.InputElement}
              value={this.state.addMealForm.ytLink}
              onChange={this.inputChangeHandler}
            />
            <button onClick={this.showImageHandler}>Hình ảnh ví dụ</button>{' '}
            <br />
            {this.state.showImage ? (
              <img
                src={imageExample}
                alt='Mẫu link youtube'
                style={{ width: '700px', marginTop: '7px' }}
              />
            ) : null}
          </div>
          <div className={classes.Input}>
            <label className={classes.Label}>Ingredients</label>
            <Editor
              apiKey='0dvov6kfqu61g0tppobt4fn6281shc7645qvg5gvtg48wuw2'
              initialValue={this.state.addMealForm.ingredients}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar: `undo redo | formatselect | bold italic backcolor | 
                                alignleft aligncenter alignright alignjustify | 
                                bullist numlist outdent indent | removeformat | help`,
              }}
              className={classes.InputElement}
              onEditorChange={this.handleEditorChangeIngredients}
            />
          </div>
          <div className={classes.Input}>
            <label className={classes.Label} style={{ margin: '8px 0' }}>
              Công thức
            </label>
            <Editor
              apiKey='0dvov6kfqu61g0tppobt4fn6281shc7645qvg5gvtg48wuw2'
              initialValue={this.state.addMealForm.recipe}
              init={{
                height: 400,
                menubar: false,
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code | fullscreen',
                  'insertdatetime media table paste code help wordcount',
                ],
                toolbar: `undo redo | formatselect | bold italic backcolor | 
                                alignleft aligncenter alignright alignjustify | 
                                bullist numlist outdent indent | removeformat | help`,
              }}
              className={classes.InputElement}
              onEditorChange={this.handleEditorChangeRecipe}
            />
          </div>
          <Button btnType='Success' type='submit'>
            Gửi
          </Button>
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
const mapDispatchToProps = (dispatch) => {
  return {
    onAddNewMealSuccess: (meal) => dispatch(action.addNewMealSuccess(meal)),
    onUpdateMealSuccess: (meal) => dispatch(action.updateMealSuccess(meal)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddMeal);
