import React, {Component} from 'react';
import classes from './Categories.css';
import axios from 'axios';
import Product from "../Product/Product";

export default class Categories extends Component {

  state = {
    items: []
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.type !== this.props.type) {
      axios.get(`https://mishop-85ae6.firebaseio.com/${this.props.type}.json`)
        .then(request=> {
          if (request.data) {
            const itemKeys = Object.keys(request.data);
            const data = itemKeys.map((key) => {
              const item = request.data[key];
              item.type = this.props.type;
              item.id = key;
              return item;
            });
            this.setState({items: data})
          } else {
            this.setState({items: []});
          }
        })
    }
  }

  componentDidMount() {
    axios.get(`https://mishop-85ae6.firebaseio.com/${this.props.type}.json`)
      .then(request=> {
        if (request.data) {
          const itemKeys = Object.keys(request.data);
          const data = itemKeys.map((key) => {
            const item = request.data[key];
            item.type = this.props.type;
            item.id = key;
            return item;
          });
          this.setState({items: data})
        }
      })
  }

  render() {
    return (
      <div className={classes.Categories}>
        <span>{this.props.name} Xiaomi</span>
        <div>
          {this.state.items.map((item, index) => {
            return (
              <Product data={item} action={true} key={index}/>
            )
          })}
        </div>
      </div>
    )
  }
}