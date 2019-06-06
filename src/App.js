import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import SimpleExpansionPanel from './ExpansionPanel';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      hasMore: true,
      curPage: 1,
      pageNum: 1,
      pageSize: 10
    };
  }

  componentDidMount() {
    let { pageNum, pageSize } = this.state;
    axios({
      url: `/walmart-oa/${pageNum}/${pageSize}`,
      method: 'GET'
    })
      .then(({ data }) => {
        if (data.products.length > 0) {
          this.setState({
            products: this.state.products.concat(data.products),
            pageNum: this.state.pageNum + 1
          });
        } else {
          this.setState({ hasMore: false });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  fetchMoreData = () => {
    let { pageNum, pageSize } = this.state;
    axios({
      url: `/walmart-oa/${pageNum}/${pageSize}`,
      method: 'GET'
    })
      .then(({ data }) => {
        if (data.products.length > 0) {
          this.setState({
            products: this.state.products.concat(data.products),
            pageNum: this.state.pageNum + 1
          });
        } else {
          this.setState({ hasMore: false });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    return (
      <div>
        <div>rWeb Client</div>
        <InfiniteScroll
          dataLength={this.state.products.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading Data...</h4>}
        >
          {this.state.products.map((product, index) => (
            <SimpleExpansionPanel key={index} {...product} />
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

export default App;
