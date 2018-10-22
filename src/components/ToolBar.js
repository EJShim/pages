import React from 'react';
import styled, {keyframes} from 'styled-components';




const _ToolBar = styled.div`
    
    display: flex;
    flex-basis: min-content;
    background: rgba(32, 32, 32, 1.0); 

    div{
        border-radius: 25px;
        margin:10px;
        padding:10px;
        background-color:rgb(32, 32, 128);
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
    
        font-family: "Times New Roman", Times, serif;            
        color:white;        
    }

    div:hover{
        cursor: pointer;
        background-color:rgb(128, 32, 32);        
    }
`;

class ToolBar extends React.Component{

    constructor(props){
        super(props);


        //Event Listner
        this.clickHome = this.clickHome.bind(this);
    }

    clickHome(e){
        e.preventDefault();
        console.log("Home Clicked")
    }

    render(){
        return(
            <_ToolBar>
                <div onClick={this.clickHome}>Home</div>
                <div>Portfolio</div>
                <div>Video</div>                
            </_ToolBar>            
        );
    }
}

export default ToolBar;