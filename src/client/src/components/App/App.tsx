import React, { Component } from 'react';
import { Router } from '@reach/router';
import { get } from '../../utils/http';
import Subject from '../Subject/Subject';
import Home from '../pages/Home/Home';
import Classify from '../pages/Classify/Classify';
import Vent from '../pages/Vent/Vent';
import About from '../pages/About/About';
import NotFound from '../pages/NotFound/NotFound';
import Header from '../modules/Header/Header';
import Footer from '../modules/Footer/Footer';
import styles from './App.module.scss';

export type Tweet = {
  text: string;
  id: string;
  metadata?: {
    description?: string | null;
    image?: string | null;
    title?: string | null;
    url?: string | null;
  } | null;
};

interface IAppProps {}

interface IAppState {
  tweets: Tweet[] | null;
  currentTweet: number;
}

class App extends Component<IAppProps, IAppState> {
  state = { tweets: null, currentTweet: 0 };

  getTweets = async () => {
    const tweetsRaw = await get('tweets');

    return tweetsRaw.map(tweet => ({
      ...tweet,
      metadata: tweet.metadata,
    }));
  };

  async componentDidMount() {
    const tweets = await this.getTweets();
    console.log("FETCHED TWEETS", tweets.length)
    this.setState({ tweets });
  }

  setCurrentTweet = async () => {
    this.setState(prevState => ({ currentTweet: prevState.currentTweet + 1 }));

    if (this.state.currentTweet % 28 === 0) {
      const { tweets } = this.state;
      const moreTweets = await this.getTweets();
      //@ts-ignore
      this.setState({ tweets: tweets && tweets.concat(moreTweets) });
    }
  };

  render() {
    const { tweets, currentTweet } = this.state;

    return (
      <div className={styles.app}>
        <Header />
        <main className={styles.main}>
          <Subject>
            <Router primary={false}>
              <Home path="/" />
              <Classify
                path="/classify"
                tweets={tweets}
                currentTweet={currentTweet}
                setCurrentTweet={this.setCurrentTweet}
              />
              <Vent path="/vent" />
              <About path="/about" />
              <NotFound path="/*" />
            </Router>
          </Subject>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
