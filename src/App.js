import React from 'react';
import ToolBar from 'components/ToolBar';
import Home from 'components/Home';
import 'App.scss'

class App extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div class='App'> 
                <ToolBar/>
                <Home/>
            </div>
        );
    }
}


export default App