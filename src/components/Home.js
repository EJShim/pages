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
    justify-content:space-around;

    background: linear-gradient(342deg, #6c1f95, #111663);
    background-size: 400% 400%;
    animation : ${animation_background} 5s ease infinite;
`;


const animation_intro = (props) => {

    // Start from random position
    let x_value = (Math.random() - 0.5) * 1000.0;
    let y_value = (Math.random() - 0.5) * 1000.0;
    let z_value = Math.random() * 0.3;
    let transform_start = "translate(" + x_value.toString() + "px" + "," + y_value.toString() + "px)";
    let scale_start = "scale(" + z_value.toString() + ")";


    if(!props.destroy){
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
    }else{
        return keyframes`
            0%{
                opacity:1.0; 
                transform : scale(1.0);            
            }
            100%{
                opacity:0.0;
                transform : ${scale_start};            
                
            }
        `;
    }

    
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
        animation: ${animation_intro} ${props=>props.animationDelay} ease;


        transition: all 1s;

        &:hover{
            transform: scale(1.1);
            background-color:rgb(128, 32, 32);
        }

`;

class Home extends React.Component{
    constructor(props){
        super(props);        
        
        this.state={
            destroy:false
        }


    }

    componentWillUnmount(){

        console.log("component mounted, change color");
        this.setState({
            destroy:true
        });
    }

    render(){


    //Initialize Content list
    let content_list = [];
    for(let i=0 ; i<Math.floor(Math.random()*100) ; i++){

        //Set Random Color
        const color = "rgb(128, 32, 32)";            
        const animationDelay = (Math.random()).toString() + 's';


        content_list.push(<Content destroy={this.state.destroy} backGround = {color} animationDelay={animationDelay}> {i} </Content>  );
    }

        return(
            <Container>
                {content_list}
            </Container>
        );
        
    }
}


export default Home