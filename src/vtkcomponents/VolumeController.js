import React from 'react';
import styled, {keyframes} from 'styled-components';
import K_Manager from 'K_Manager';

const Container = styled.div`
    flex:1;
    background-color:#8C92AC;
    margin:5px;
    display:flex;
    flex-direction:column;
    border-radius :5px;

    .header{
        flex:20%;
        height:20%;
        background-color:#9CA2BC;
        margin:5px 5px 0px 5px;
        color:red;
    }
    #volumeController{
        flex:80%;    
        height:80%;
        margin:5px;    
        background-color:#9CA2BC;      
    }

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
            <Container>
                <div className="header"> Color preset will be here </div>
                <div id="volumeController"/>                
            </Container>
        );
    }

}


export default VolumeController;