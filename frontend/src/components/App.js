import React, { Component } from 'react';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route path='/' component={Home}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
