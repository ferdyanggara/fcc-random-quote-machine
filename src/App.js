import React, { useEffect, useState } from 'react';
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

function App({ classes }) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     quotes: [],
  //     selectedQuoteIndex: null,
  //   };
  //   this.assignNewQuoteIndex = this.assignNewQuoteIndex.bind(this);
  //   this.selectQuoteIndex = this.generateNewQuoteIndex.bind(this);
  // }
  const [quotes, setQuotes] = useState([]);
  const [selectedQuoteIndex, setSelectedQuoteIndex] = useState(null);

  useEffect(async () => {
    const data = await fetch(
      'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json'
    );
    const quotes = await data.json();
    setQuotes(quotes);
    setSelectedQuoteIndex(random(0, quotes.length - 1));
  }, []);

  // componentDidMount() {
  //   fetch(
  //     'https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json'
  //   )
  //     .then((data) => data.json())
  //     .then((quotes) => this.setState({ quotes }, this.assignNewQuoteIndex));
  // }

  function getSelectedQuote() {
    if (!quotes.length || !Number.isInteger(selectedQuoteIndex)) {
      return 'error';
    }
    return quotes[selectedQuoteIndex];
  }
  // returns an integer representing an index in state.quotes
  // if state quotes is empty, it returns error
  function generateNewQuoteIndex() {
    if (!quotes.length) {
      return;
    }
    return random(0, quotes.length - 1);
  }

  function assignNewQuoteIndex() {
    setSelectedQuoteIndex(generateNewQuoteIndex());
  }

  return (
    <Grid
      className={classes.container}
      id='quote-box'
      container
      justify='center'
    >
      <Grid xs={11} lg={8} item>
        {getSelectedQuote() ? (
          <QuoteMachine
            selectedQuote={getSelectedQuote()}
            assignNewQuoteIndex={assignNewQuoteIndex}
          />
        ) : null}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(App);
