import React from 'react';
import ToolBar from 'components/ToolBar';
import 'App.scss'

class App extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div class='App'> 
                <ToolBar/>
                Hello World
            </div>
        );
    }
}


export default App