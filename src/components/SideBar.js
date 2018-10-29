import React from 'react';
import styled, {keyframes} from 'styled-components';




const Container = styled.div`


    @media screen and (max-width: 600px) {
        display:none;
    }
    
    flex: 20%;
    flex-basis: min-content;
    background: rgba(32,32,32, 1.0);
    text-align:center;
    display:flex;
    flex-direction:column;
    overflow:auto;
    height:100vh;
    justify-content:space-between;


    .header{
        flex:10%;
        .logo{        
            font-size:30px;
            margin-top:30px;
            font-family: 'Mr Dafoe', cursive;
            color:rgba(41, 128, 185,1.0);
            text-shadow: #000000 3px 2px 0;
            user-select: none;      
        }
    }
    


    .body{        
        flex:80%;

        display:flex;
        flex-direction:column;
        justify-content:center;


        .button{
            border-radius: 25px;
            text-align:right;
            margin:10px;
            padding:5px 20px 5px 0px;
            user-select: none;
            font-family: 'Open Sans', sans-serif;
            font-weight: 800;        
            color:#EDEDED;
            
            transition: all 1s;
        }
        .button:hover{
            cursor: pointer;
            background-color:rgb(128, 32, 32);        
        }
    }

    .footer{
        flex:10%;
    }




`;

class SideBar extends React.Component{

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
                <div class="header">
                    <div class="logo">EJ Shim</div>
                </div>
                <div class="body">
                    {this.props.menuItem}                   
                </div>
                <div class="footer"></div>

                
            </Container>            
        );
    }
}

export default SideBar;