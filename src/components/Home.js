import React from 'react';
import styled, {keyframes} from  'styled-components';

const animation_background = keyframes`
    0%{background-position:66% 0%}
    50%{background-position:35% 100%}
    100%{background-position:66% 0%}
`

const blurFadeIn = keyframes`

	0% {
		opacity: 0;
		text-shadow: 0px 0px 40px #fff;
		transform: scale(1.3);
	}
	50% {
		opacity: 0.5;
		text-shadow: 0px 0px 10px #fff;
		transform: scale(1.1);
	}
	100% {
		opacity: 1;
		text-shadow: 0px 0px 1px #fff;
		transform: scale(1);
	}
`;

const Container = styled.div`

    @media screen and (max-width: 600px) {
        flex:100%;
    }

    flex:80%;
    display:flex;
    align-items: stretch;
    flex-direction:column;
    height:100vh;
    overflow:auto;
`;

const Content = styled.div`
    flex: 1 0 95vh;
    display:flex;    
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color:${props=>props.background};
     
`;

const GradientContent = styled.div`
    flex: 1 0 90vh;
    display:flex;    
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: linear-gradient(342deg, #00F260, #0575E6);
    background-size: 150% 150%;
    animation : ${animation_background} 5s ease infinite;
`;



const IntroTitle = styled.h1`
        font-family: 'Sancreek', cursive;        
        font-size:20vw;
        color: transparent;
        animation: ${blurFadeIn} 5s ease-in forwards;
        user-select: none;
        z-index:1000;
`;


class Home extends React.Component{
    constructor(props){
        super(props);        
        
        this.state={
            destroy:false
        }
    }

    componentDidMount(){
     
    }

    render(){        

        

        return(
            <Container>                
                <GradientContent>
                    <IntroTitle>EJ Shim</IntroTitle>
                    <h2> Second Candidate </h2>
                </GradientContent>
                <Content background="#111111">
                    <IntroTitle>EJ Shim</IntroTitle>
                    <h2> First Intro Candidate </h2>
                </Content>                                           
                <Content background="#FF4136">
                    <h2> Third Candidate.. will add more </h2>
                </Content>
                <Content background="#0074D9">                    
                </Content>
                <Content background="#006E6D">                    
                </Content>
                <Content background="#3D9970">  
                </Content>
                <Content background="#FFDC00">                    
                </Content>
            </Container>
        );
        
    }
}


export default Home