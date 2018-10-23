import React from 'react';
import styled, {keyframes} from 'styled-components';



const animation_intro = (props) => {

    // Start from random position    
    let z_value = Math.random() * 0.3;    
    let scale_start = "scale(" + z_value.toString() + ")";


    return keyframes`
        0%{
            opacity:0.0;
            transform : ${scale_start};            
        }
        100%{
            opacity:1.0; 
            transform : scale(1.0);            
        }
    `;
}


const Content = styled.div`


        user-select: none;
        margin-top: 10px;        
        display: flex;
        flex-direction:column;
        justify-content: center;
        text-align: center;
        font-size: 22px;
        background-color: ${props=>props.backGround};
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        animation: ${animation_intro} ${props=>props.introDelay} ease;


        transition: all 1s;

        &:hover{
            cursor: pointer;
            transform: scale(1.1);            
        }

        img{
            margin-top: 8px;
            vertical-align: middle;
            width:100%;
        }

`;



class ContentCard extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        //Set Random Color and delay
        const color = "rgb(248,236,194)";
        const introDelay = (Math.random()).toString() + 's';

        return(
            <Content backGround={color} introDelay={introDelay} onClick={()=>this.props.show(this.props.information.url)}>
                {this.props.information.image != null && <img src={this.props.information.image} alt="Lights"></img>}
                <h3>{this.props.information.name} </h3>                
            </Content>
        );
    }
}

export default ContentCard