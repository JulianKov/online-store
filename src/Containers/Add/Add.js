import React, {Component} from 'react';
import classes from './Add.css'
import Product from "../../Components/Product/Product";
import Input from "../../UI/Input/Input";
import axios from "axios";

class Add extends Component {

  getInitialState() {
    return {
      isFormValid: false,
      isImageValid: false,
      imgNotFoundSrc: "https://www.gemblouxomnisport.be/wp-content/plugins/lightbox/images/No-image-found.jpg",
      src: "https://www.gemblouxomnisport.be/wp-content/plugins/lightbox/images/No-image-found.jpg",
      price: 0,
      name: 'Название',
      formControls: {
        name: {
          value: '',
          type: 'text',
          label: 'Название предмета',
          errorMessage: "Введите корректное название",
          valid: false,
          touched: false,
          validation: {
            required: true,
          }
        },
        src: {
          value: '',
          type: 'text',
          label: 'Ссылка на изображение',
          errorMessage: "Введите корректную ссылку",
          valid: false,
          touched: false,
          validation: {
            required: true,
          }
        },
        price: {
          value: 0,
          type: 'number',
          label: 'Цена товара',
          errorMessage: "Введите корректную цену",
          valid: false,
          touched: false,
          validation: {
            required: true,
            positive: true
          }
        }
      },
      fieldSet: {
        checked: false,
        type: null
      }
    }
  }

  state = this.getInitialState();

  submitHandler = (e) => {
    e.preventDefault();
    // axios.post(`https://mishop-85ae6.firebaseio.com/${this.state.fieldSet.type}.json`, {
    //   name: this.state.name,
    //   src: this.state.src,
    //   price: this.state.price
    // }).then(()=>{
    //   this.setState(this.getInitialState())
    // })
    console.log('post to server is disabled');
    this.setState(this.getInitialState());
  };

  validateControl(value, validation) {
    if (!validation) {
      return true;
    }
    let isValid = true;
    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (validation.positive) {
      isValid = value > 0;
    }

    return isValid;
  }

  onChangeHandler(event, controlName) {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};
    const imgNotFoundSrc = this.state.imgNotFoundSrc;
    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);
    let isFormValid = controlName !== 'src';
    formControls[controlName]=control;
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid && this.state.fieldSet.checked ;
    });
    this.setState({
      formControls,
      isFormValid,
      [controlName]: controlName === 'src' ? imgNotFoundSrc : control.value
    })
  }

  onCheckImage() {
    const formControls = {...this.state.formControls};
    const notFoundImg = this.state.imgNotFoundSrc;
    let isFormValid = true;
    const checked = this.state.fieldSet.checked;
    const img = new Image();
    img.onload = ()=> {
      Object.keys(formControls).forEach(name => {
        isFormValid = formControls[name].valid && isFormValid && checked;
      });
      this.setState({
        isImageValid: true,
        src: this.state.formControls.src.value,
        isFormValid
      })
    };
    img.onerror = (e) => {
      formControls.src.valid = false;
      this.setState({
        src: notFoundImg,
        formControls,
        isFormValid: false
      })
    };
    img.src = this.state.formControls.src.value;
  }

  onCheckHandler(checkBoxName) {
    const formControls = {...this.state.formControls};
    let isFormValid = true;
    const checked = true;
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid && checked && this.state.isImageValid;
    });
    this.setState({
      isFormValid,
      fieldSet: {
        checked,
        type: checkBoxName
      }
    });
  }


  renderInputs() {
    return Object.keys(this.state.formControls)
      .map((controlName, index) => {
        const control = this.state.formControls[controlName];
        return (
          <Input
            key={controlName + index}
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            errorMessage={control.errorMessage}
            shouldValidate={true}
            onChange={event => this.onChangeHandler(event, controlName)}
            onBlur={event => this.onChangeHandler(event, controlName)}
          />
        )
      })
  }

  render() {
    return (
      <div className={classes.Add}>
        <h1>Add items</h1>
        <div className={classes.divider}>
          <div>
            <Product
              data={{
                src: this.state.src,
                name: this.state.name,
                price: this.state.price}}
            />
          </div>
          <form onSubmit={this.submitHandler}>
            {this.renderInputs()}
            <fieldset> <legend><b>Выберите категорию</b></legend>
              <label><input
                onChange={() => {this.onCheckHandler('phones')}}
                checked={this.state.fieldSet.type === 'phones'}
                type="radio"
                value="phones"
                name='choose'
              />Смартфоны</label>
              <label><input
                onChange={() => {this.onCheckHandler('cameras')}}
                checked={this.state.fieldSet.type === 'cameras'}
                type="radio"
                value="cameras"
                name='choose'
              />Камеры</label>
              <label><input
                onChange={() => {this.onCheckHandler('devices')}}
                checked={this.state.fieldSet.type === 'devices'}
                type="radio"
                value="devices"
                name='choose'
              />Устрйоства</label>
            </fieldset>
            <div className={classes.buttons}>
              <button
                className={classes.button}
                type='button'
                onClick={() => {this.onCheckImage()}}
              >Проверить изображение</button>
              <button
                disabled={!this.state.isFormValid}
                className={classes.button}
                type='button'
                onClick={(e) => {this.submitHandler(e)}}
              >Добавить товар</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}


export default Add;