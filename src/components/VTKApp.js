import React from 'react';
import styled, {keyframes} from  'styled-components';
import K_Manager from 'K_Manager'


const Container = styled.div`
    @media screen and (max-width: 600px) {
            flex:100% 1 0;
    }
    flex:80% 1 0;
    display: flex;        
    flex-wrap: wrap;
    background-color:cyan;

    div{        
        flex:1 1 0;
        display:flex;
        flex-direction:column;
        flex-wrap:wrap;
        

        &.left{
            padding-right:1px;
        }        
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

    &#viewer0{
            margin-bottom: 1px;            
        }

    &#viewer2{
        margin-bottom:1px;
    }

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
        K_Manager.Mgr().AddRenderer( document.querySelector('#viewer0'), 0 );
        K_Manager.Mgr().AddRenderer( document.querySelector('#viewer1'), 1 );
        K_Manager.Mgr().AddRenderer( document.querySelector('#viewer2'), 2 );
        K_Manager.Mgr().AddRenderer( document.querySelector('#viewer3'), 3 );

        //Call Initial Renderer
        K_Manager.Mgr().HandleResize();
        K_Manager.Mgr().Redraw();

        //Call After Animation Finished
        setTimeout(()=>{
            K_Manager.Mgr().HandleResize();
            K_Manager.Mgr().Redraw();
        }, this.maxDelay);
        
        
    }

    componentWillUnmount(){
        
    }

    render(){
        //4 renderwindows
        return(
            <Container>
                <div class="left">
                    {this.renderWindow[0]}
                    {this.renderWindow[1]}
                </div>
                <div class="right">                                
                    {this.renderWindow[2]}
                    {this.renderWindow[3]}
                </div>

            </Container>
        );
        
    }
}


export default VTKApp