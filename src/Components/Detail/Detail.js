import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import classes from './Detail.css';
import axios from 'axios';
import BuyBtn from "../../UI/BuyBtn/BuyBtn";

class Detail extends Component {
  state = {
    src: '',
    name: '',
    price: '',
  };

  componentDidMount() {
    axios.get(`https://mishop-85ae6.firebaseio.com${this.props.match.url}.json`)
      .then(response=> {
        const data = response.data;
        this.setState({...data})
      })
  }

  render() {
    return (
      <div className={classes.Detail}>
        <div className={classes.Image}>
          <img src={this.state.src} width={400} height={400} alt=""/>
        </div>
        <div className={classes.Description}>
          <h2>{this.state.name}</h2>
          <span>{this.state.price} руб</span>
          <BuyBtn
            data={{...this.state,
              type: this.props.match.params.type,
              id: this.props.match.params.id
            }}
            action='true'
          />
        </div>
      </div>
    )
  }
}

export default withRouter(Detail)