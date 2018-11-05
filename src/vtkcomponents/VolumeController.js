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

    onSelectionChanged(e){
        K_Manager.VolumeMgr().setPresetColor(e.target.value);
    }




    render(){
        const presetNames = K_Manager.VolumeMgr().presetNames;
        let presetAttrib = []
        for(let preset of presetNames){
            presetAttrib.push( <option value={preset}>{preset}</option> );
        }

        return(
            <Container>
                <select className="header" onChange={(e)=>{this.onSelectionChanged(e)}}> {presetAttrib} </select>
                <div id="volumeController"/>                
            </Container>
        );
    }

}


export default VolumeController;