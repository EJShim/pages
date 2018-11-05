import React from 'react';
import SideBar from 'components/SideBar';
import ToolBar from 'components/ToolBar';
import Home from 'components/Home';
import Video from 'components/Video';
import Portfolio from 'components/Portfolio';
import styled from 'styled-components';

import VTKApp from 'vtkcomponents/VTKApp';
import V_SideBar from 'vtkcomponents/V_SideBar';
import V_ToolBar from 'vtkcomponents/V_ToolBar';
import K_Manager from 'K_Manager';


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

        this.menuItem = [
            <div class="button" onClick={this.changeView}>Home</div>,
            <div class="button" onClick={this.changeView}>Portfolio</div>,
            <div class="button" onClick={this.changeView}>Video</div>,
            <div class="button" onClick={this.changeView}>
                <p>VTK</p>
            </div>,
        ];

        this.vtkMenu = [
            <div class="logo button" onClick={this.changeView}>Home</div>,
            <div class="button" onClick={()=>{K_Manager.MeshMgr().onImportMesh()}}>Import STL</div>,
            <div class="button" onClick={()=>{K_Manager.VolumeMgr().onImportVolume()}}>Import Dicom</div>
        ];
    }

    changeView(e){

        this.setState({
            currentView:e.target.innerHTML
        });
    }

    render(){

        let content = <Home/>
        let isVTK = false;

        if(this.state.currentView == 'Video'){
            content = <Video/>
        }else if(this.state.currentView =='Portfolio'){
            content = <Portfolio/>
        }else if(this.state.currentView == 'VTK'){
            content = <VTKApp/>
            isVTK = true;
        }



        return(
            <Container>
                {isVTK ? <V_ToolBar menuItem={this.vtkMenu}/> : <ToolBar menuItem={this.menuItem}/> }
                
                


                <SideBar menuItem={this.menuItem} isVTK={isVTK}/>                
                <V_SideBar menuItem={this.vtkMenu} isVTK={isVTK}/>
                
                    
                {content}
            </Container>
        );
    }
}


export default App