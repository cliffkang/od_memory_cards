import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
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
        currentWord: 'vocab',
    };

    handleStartClick = () => {
        axios
            .get(`${ROOT_URL}/newSession`)
            .then(firstWord => this.setState({ currentWord: firstWord }))
            .catch(err => console.error({ error: `error initiating new session, ${err}` }));
    }

    handleChange = event => {
        const guess = event.target.value;
        this.setState({ guess });
    };

    handleGuess = event => {

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
                <Typography component="div" style={{ padding: 8 * 3 }}>
                    <Typography variant="title" color="inherit" style={{ margin: '12px' }}>
                        {this.state.currentWord}
                    </Typography>
                    <FormControl fullWidth className={classes.margin} onSubmit={this.handleGuess}>
                        <TextField
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
                    </FormControl>
                </Typography>
			</HomeDiv>
		);
	}
}

export default withStyles(styles)(Home);
