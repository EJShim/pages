import React from 'react';
import styled, {keyframes} from  'styled-components';
import K_Manager from 'K_Manager'

const animation_background = keyframes`
    0%{background-position:66% 0%}
    50%{background-position:35% 100%}
    100%{background-position:66% 0%}
`;

const Container = styled.div`        
    flex:1 1 0;
    display: flex;        
    flex-wrap: wrap;
    
    background: linear-gradient(342deg, rgb(142, 56, 10), rgb(10, 14, 123));
    background-size: 200% 200%;
    animation : ${animation_background} 5s ease infinite;

    div{        
        flex:1 1 0;
        display:flex;
        flex-direction:column;
        flex-wrap:wrap;        
    }
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
    flex:1 1 0;
    animation: ${animation_intro} ${props=>props.introDelay} ease;

`;

class VTKApp extends React.Component{
    constructor(props){
        super(props);        

        //Initialize Renderwindow
        this.renderWindow = [];
        this.maxDelay = 0;
        
        for(let i=0 ; i<4 ; i++){
            //Set Random Color
            const color = "rgb(10, 32, 10)";
            const delayValue = Math.random();
            if(delayValue > this.maxDelay) this.maxDelay = delayValue;
            const introDelay = delayValue.toString() + 's';
            const id = "viewer"+i.toString();


            this.renderWindow.push(<Content id={id} introDelay={introDelay}/>  );
        }

        this.maxDelay *= 1000;
    }

    componentDidMount(){
        //After render() function
        K_Manager.AddRenderer( document.querySelector('#viewer0') );
        K_Manager.AddRenderer( document.querySelector('#viewer1') );
        K_Manager.AddRenderer( document.querySelector('#viewer2') );
        K_Manager.AddRenderer( document.querySelector('#viewer3') );

        //Call Initial Renderer
        K_Manager.HandleResize();
        K_Manager.Redraw();

        //Call After Animation Finished
        setTimeout(()=>{
            K_Manager.HandleResize();
            K_Manager.Redraw();
        }, this.maxDelay);
        
        
    }

    componentWillUnmount(){
        K_Manager.Clear();
    }

    render(){
        //4 renderwindows
        return(
            <Container>
                <div>
                    {this.renderWindow[0]}
                    {this.renderWindow[1]}
                </div>
                <div>                                
                    {this.renderWindow[2]}
                    {this.renderWindow[3]}
                </div>

            </Container>
        );
        
    }
}


export default VTKApp