import React from 'react';
import ToolBar from 'components/ToolBar';
import Home from 'components/Home';
import Video from 'components/Video';
import Portfolio from 'components/Portfolio';
import VTKApp from 'components/VTKApp';
import styled from 'styled-components';

const Container = styled.div`
    position:relative;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction:column;
`;

class App extends React.Component{
    constructor(props){
        super(props)

        //Initialize State
        this.state = {
            currentView:'Home'
        }

        this.changeView = this.changeView.bind(this);
    }

    changeView(e){

        this.setState({
            currentView:e.target.innerHTML
        });
    }

    render(){

        let content = <Home/>

        if(this.state.currentView == 'Video'){
            content = <Video/>
        }else if(this.state.currentView =='Portfolio'){
            content = <Portfolio/>
        }else if(this.state.currentView == 'VTK'){
            content = <VTKApp/>
        }

        return(
            <Container> 
                <ToolBar changeView={this.changeView}/>
                {content}
            </Container>
        );
    }
}


export default App