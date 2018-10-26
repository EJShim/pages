import React from 'react';
import SideBar from 'components/SideBar';
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
    /* flex-wrap: wrap; */
    
    flex-direction:row;
    align-items: stretch;

    @media screen and (max-width: 600px) {
        flex-direction:column;
    }
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

        let menu = [
            <div class="button" onClick={this.changeView}>Home</div>,
            <div class="button" onClick={this.changeView}>Portfolio</div>,
            <div class="button" onClick={this.changeView}>Video</div>,
            <div class="button" onClick={this.changeView}>VTK</div>,
        ];

        return(
            <Container>
                <ToolBar menuItem={menu}/>
                <SideBar menuItem={menu}/>                
                {content}
            </Container>
        );
    }
}


export default App