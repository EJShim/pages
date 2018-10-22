import React from 'react';
import styled, {keyframes} from  'styled-components';

const animation_background = keyframes`
    0%{background-position:66% 0%}
    50%{background-position:35% 100%}
    100%{background-position:66% 0%}
`

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: linear-gradient(342deg, rgb(100, 12, 132), rgb(12, 130, 114));
    background-size: 200% 200%;
    animation : ${animation_background} 5s ease infinite;
`;


const animation_intro = (props) => {

    // Start from random position
    let x_value = (Math.random() - 0.5) * 1000.0;
    let y_value = (Math.random() - 0.5) * 1000.0;
    let z_value = Math.random() * 0.3;
    let transform_start = "translate(" + x_value.toString() + "px" + "," + y_value.toString() + "px)";
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
        
        width: 250px;
        height:150px;
        margin: 10px;

        display: flex;
        flex-direction:column;
        justify-content: center;
        text-align: center;
        font-size: 30px;
        background-color: ${props=>props.backGround};
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        animation: ${animation_intro} ${props=>props.introDelay} ease;


        transition: all 1s;

        &:hover{
            transform: scale(1.1);
            background-color:rgb(128, 32, 32);
        }

`;

class Portfolio extends React.Component{
    constructor(props){
        super(props);

        this.transitionEnd = this.transitionEnd.bind(this);
    }

    transitionEnd(){
        
    }

    render(){
        let content_list = [];
        for(let i=0 ; i<Math.floor(Math.random()*100) ; i++){

            //Set Random Color
            const color = "rgb(" + Math.floor(Math.random()*128.0).toString() +"," + Math.floor(Math.random()*255.0).toString() + "," + Math.floor(Math.random()*128.0).toString() + ")";
            
            const introDelay = (Math.random()).toString() + 's';


            content_list.push(<Content onTransitionEnd={this.transitionEnd} backGround = {color} introDelay={introDelay}> {i} </Content>  );
        }

        
        


        return(
            <Container>
                {content_list}
            </Container>
        );
        
    }
}


export default Portfolio