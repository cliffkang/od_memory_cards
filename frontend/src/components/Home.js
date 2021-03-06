import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReactCountdownClock from 'react-countdown-clock';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const ROOT_URL = 'http://localhost:5000';

const HomeDiv = styled.div`
`;

const styles = theme => ({
    root: {
        maxWidth: '600px',
        minWidth: '200px',
        textAlign: 'center',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
    }
});

class Home extends Component {
    state = {
        guess: '',
        currentWord: '',
        _id: '',
        correct: null,
    };

    handleStartClick = () => {
        axios
            .get(`${ROOT_URL}/newSession`)
            .then(firstWord => {
                const { _id, currentWord } = firstWord.data;
                this.setState({ _id, currentWord });
            })
            .catch(err => console.error({ error: `error initiating new session, ${err}` }));
    }

    handleChange = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ guess: event.target.value });
    };

    handleGuess = e => {
        e.preventDefault();
        let { currentWord } = this.state;
        // sanitize the input a little bit
        // also made words all lowercase on backend
        const guess = this.state.guess.trim().toLowerCase();
        let correct;
        // check if guess is right or not
        if (guess === currentWord.english) {
            correct = true;
            currentWord.M *= 2;
        } else {
            correct = false;
            currentWord.M = 1;
        }
        console.log('correct/currentWord in handleGuess', correct, currentWord);
        this.setState({ correct, currentWord });
    }

    handleNextWord = event => {
        const { currentWord, _id } = this.state;
        axios
            .post(`${ROOT_URL}/nextWord`, { currentWord, _id })
            .then(newWord => {
                console.log('newWord returned back in handleNextWord', newWord);
                const { currentWord } = newWord.data;
                this.setState({ correct: null, currentWord, guess: '' });
            })
            .catch(error => console.error('error getting next word from server', error));
    }

	render() {
        const { classes } = this.props;
		return (
			<HomeDiv className={classes.root}>
                <Button 
                    style={{ margin: '20px 0', width: '200px', alignSelf: 'center' }} 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={this.handleStartClick}
                >
                    Start New Session
                </Button>
                <AppBar position="static" color="default">
                    <Typography variant="headline" color="inherit" style={{ margin: '12px' }}>
                        Let's practice some vocabulary!
                    </Typography>
                </AppBar>
                {this.state.currentWord ? 
                    <Typography component="div" style={{ padding: 8 * 3 }}>
                        <Typography variant="title" color="inherit" style={{ margin: '12px' }}>
                            {this.state.currentWord.spanish}
                        </Typography>
                        <form onSubmit={this.handleGuess}>
                            <TextField
                                autoFocus
                                fullWidth
                                id="guess"
                                label="what does this mean? (press enter to guess)"
                                value={this.state.guess}
                                onChange={this.handleChange}
                                type="string"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"
                            />
                        </form>
                    </Typography>
                : null }
                {this.state.correct !== null ? 
                    <Typography component="div" style={{ padding: 8 * 3, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="title" color="inherit" style={{ margin: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-around', whiteSpace: 'pre' }}>
                                {this.state.correct ?
                                    <div>Correct!   Next word in:</div> : 
                                    <div>Wrong :(.   Right word was <strong style={{ fontSize: '34px'}}>{this.state.currentWord.english}</strong></div>
                                }
                            </div>
                        </Typography>
                        <ReactCountdownClock seconds={3}
                            color="#6ec6ff"
                            alpha={0.9}
                            size={80}
                            onComplete={this.handleNextWord}
                        />
                    </Typography>
                : null }
			</HomeDiv>
		);
	}
}

export default withStyles(styles)(Home);
