import React from 'react';
import styled, {keyframes} from 'styled-components';
import { connect } from 'react-redux';


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

    }


    render(){


        const messageData = JSON.parse(this.props.message);
        const components = [];
        for(let message of messageData){
            components.push(<p>{message}</p> );
        }

        return(
            <Container>
                {components}
            </Container>
        );
        
    }
}

export default connect(
    (state) => ({
        message : state.message
    }), 
)(V_LogWidget);

