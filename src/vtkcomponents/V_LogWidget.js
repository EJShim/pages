import React from 'react';
import styled, {keyframes} from 'styled-components';


const Container = styled.div`
    border-radius :5px;
    background-color:black;
    color:green;
    overflow:auto;
    flex:1;
    margin:5px;

    display:flex
    flex-direction:column;
    justify-content:flex-end;
`;


class V_LogWidget extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            content : "<p>nothing</p><p>log widget</p>"
        }
    }



    render(){

        return(
            <Container>
                {this.state.content}
            </Container>
        );
        
    }



}

export default V_LogWidget;