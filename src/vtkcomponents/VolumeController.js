import React from 'react';
import styled, {keyframes} from 'styled-components';
import K_Manager from 'K_Manager';

const Container = styled.div`
    flex:1;
    background-color:#8C92AC;
    margin:5px;
    display:flex;
    border-radius:15px;

`;




class VolumeController extends React.Component{

    constructor(props){
        super(props);
    }


    componentDidMount(){
        K_Manager.VolumeMgr().setGaussianWidget(document.querySelector("#volumeController"));
    }



    render(){
        return(
            <Container id="volumeController"/>
        );
    }

}


export default VolumeController;