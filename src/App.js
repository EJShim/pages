import React from 'react';
import ToolBar from 'components/ToolBar';
import Home from 'components/Home';
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
    }

    render(){
        return(
            <Container> 
                <ToolBar/>
                <Home/>
            </Container>
        );
    }
}


export default App