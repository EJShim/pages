import React from 'react';
import styled, {keyframes} from 'styled-components';




const Container = styled.div`
    
    flex: 0 0 auto;
    flex-basis: min-content;
    background: rgba(32,32,32, 1.0);
    text-align:center;
    overflow:auto;
    display:none;


    @media screen and (max-width: 600px) {
        display:flex;
    }
    

    div{
        display:flex;
        flex-direction:column;
        justify-content:center;
        border-radius: 25px;
        margin:10px;
        padding:5px;        
        user-select: none;
        font-family: 'Open Sans', sans-serif;
        font-weight: 800;        
        color:#EDEDED;
        
        transition: all 1s;
    }
    div:hover{
        cursor: pointer;
        background-color:rgb(128, 32, 32);        
    }


    .logo{
        font-family: 'Mr Dafoe', cursive;
        color:rgba(41, 128, 185,1.0);
        text-shadow: #000000 3px 2px 0;
        margin-left: auto;                
    }

    .logo:hover{
        background-color:rgba(0, 0, 0, 0);
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
    }

    render(){
        return(
            <Container>
                {this.props.menuItem}
                {/* <div class="logo">EJ Shim</div> */}
            </Container>            
        );
    }
}

export default ToolBar;