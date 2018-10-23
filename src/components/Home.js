import React from 'react';
import styled, {keyframes} from  'styled-components';
import sampleVid from 'resources/sample.mp4';

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
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index:-2;
    user-select: none;

    video {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;

        @media screen and (max-aspect-ratio: 1920/1080) {
            height: 100%;
        }

        @media screen and (min-aspect-ratio: 1920/1080) {
            width: 100%;
        }   
    }

    h1{
        position: absolute;
        top: 50%;
        line-height: 100px;
        height: 90px;
        margin-top: -50px;
        font-size: 90px;
        width: 100%;
        text-align: center;

        font-family:'Arial';
        font_size:70px;
        color: transparent;

        animation: ${blurFadeIn} 12s ease-in forwards;
    }

`;


class Home extends React.Component{
    constructor(props){
        super(props);        
        
        this.state={
            destroy:false
        }
    }

    componentDidMount(){
        document.querySelector("#background_vid").play();
    }

    render(){

        return(
            <Container>
                <video id="background_vid" autoplay muted loop>
                    <source src={sampleVid} type="video/mp4"></source>
                </video>

                <h1> EJ Shim </h1>
            </Container>
            
        );
        
    }
}


export default Home