import React, { Component } from 'react';
import { random } from 'lodash';
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';
import QuoteMachine from './components/QuoteMachine';
import { Grid } from '@material-ui/core';

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quotes: [],
      selectedQuoteIndex: null,
    };
    this.assignNewQuoteIndex = this.assignNewQuoteIndex.bind(this);
    this.selectQuoteIndex = this.generateNewQuoteIndex.bind(this);
  }

  componentDidMount() {
    fetch(
      'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json'
    )
      .then((data) => data.json())
      .then((quotes) => this.setState({ quotes }, this.assignNewQuoteIndex));
  }

  get selectedQuote() {
    if (
      !this.state.quotes.length ||
      !Number.isInteger(this.state.selectedQuoteIndex)
    ) {
      return 'error';
    }
    return this.state.quotes[this.state.selectedQuoteIndex];
  }
  // returns an integer representing an index in state.quotes
  // if state quotes is empty, it returns error
  generateNewQuoteIndex() {
    if (!this.state.quotes.length) {
      return;
    }
    return random(0, this.state.quotes.length - 1);
  }

  assignNewQuoteIndex() {
    this.setState({ selectedQuoteIndex: this.generateNewQuoteIndex() });
  }

  render() {
    return (
      <Grid
        className={this.props.classes.container}
        id='quote-box'
        container
        justify='center'
      >
        <Grid xs={11} lg={8} item>
          {this.selectedQuote ? (
            <QuoteMachine
              selectedQuote={this.selectedQuote}
              assignNewQuoteIndex={this.assignNewQuoteIndex}
            />
          ) : null}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(App);
