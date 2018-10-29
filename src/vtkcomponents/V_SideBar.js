import React from 'react';
import styled, {keyframes} from 'styled-components';





const Container = styled.div`


    @media screen and (max-width: 600px) {
        display:none;
    }

    transition:all 1s;
    ${props => props.isVTK ? "flex:20%" : "flex:0%"};
    ${props => props.isVTK ? "background-color: #001f3f" : "background-color: rgb(32,32,32)"};
            
    flex-basis: min-content;    
    text-align:center;
    display:flex;
    flex-direction:column;
    overflow:auto;
    height:100vh;
    justify-content:space-between;


    .button{        
        text-align:center;        
        user-select: none;
        font-family: 'Open Sans', sans-serif;
        font-weight: 300;        
        color:#EDEDED;
        
        transition: all 1s;
    }
    .button:hover{
        cursor: pointer;
        background-color:rgb(128, 32, 32);        
    }


    .header{
        flex:10%;
        .logo{
            margin:10px;
            font-size:25px;
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
        justify-content:flex-start;
    }

    .footer{
        flex:10%;
    }




`;

class V_SideBar extends React.Component{

    constructor(props){
        super(props);


        //Event Listner
        this.clickHome = this.clickHome.bind(this);
    }

    clickHome(e){
        e.preventDefault();    
    }

    componentDidMount(){        
    }

    render(){
        return(
            <Container isVTK={this.props.isVTK}>
                <div class="header">
                    {this.props.menuItem}
                </div>
                <div class="body">
                    
                </div>
                <div class="footer"></div>

                
            </Container>            
        );
    }
}

export default V_SideBar;