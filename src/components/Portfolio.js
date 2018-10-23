import React from 'react';
import styled, {keyframes} from  'styled-components';
import ContentCard from 'components/ContentCard';
import portfolioData from 'data/portfolio.json';

const animation_background = keyframes`
    0%{background-position:66% 0%}
    50%{background-position:35% 100%}
    100%{background-position:66% 0%}
`

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background: linear-gradient(342deg, #314755, #26a0da);    
    background-size: 200% 200%;
    animation : ${animation_background} 5s ease infinite;
    padding: 0 4px;
    
    .column {        
        flex: 25%;
        max-width: 24%;
        padding: 0 4px;        
    }

    /* Responsive layout - makes a two column-layout instead of four columns */
    @media screen and (max-width: 800px) {
        .column {
            flex: 50%;
            max-width: 48%;
        }
    }

    /* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
    @media screen and (max-width: 600px) {
        .column {
            flex: 100%;
            max-width: 100%;
        }
    }
`;


const animation_popup_intro =  keyframes`
    0%{
        opacity:0.0;
        transform : scale(0.0);
    }
    100%{
        opacity:1.0; 
        transform : scale(1.0);            
    }
`;


const animation_popup_pop =  keyframes`
    0%{
        opacity:1.0; 
        transform : scale(1.0);        
    }
    100%{
        opacity:0.0;
        transform : scale(0.0);
    }
`;

const PopUpBackground = styled.div`
    position:fixed;
    top:0px;
    left:0px;
    background-color:rgba(0, 0, 0, 0.5);
    width:100%;
    height:100%;    
    animation : ${ animation_popup_intro} 0.1s ease;
`;

const PopUp = styled.div`
    position:fixed; 
    left:10vw;
    top:15vh;

    width:80vw;        
    height:70vh;
    
    /*popup-styles*/
    background-color:#fff;
    padding:10px;
    border:solid 2px #444;
    border-radius:10px;

    
    animation : ${props => props.closing ? animation_popup_pop : animation_popup_intro} 0.3s ease;
`;

class Portfolio extends React.Component{
    constructor(props){
        super(props);

        this.state={            
            popupURL : null,
            popupClosing : false  
        }

        
        //Event Handler
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.terminatePopup = this.terminatePopup.bind(this);


        //initialize
        this.initializeContent();
    }

    initializeContent(){
        //Get Contents from DB(Not Using DB For Now)
        this.content_list = [ [], [], [], [] ];
        for(const [index, info] of portfolioData.entries()){
            this.content_list[index%4].push(<ContentCard information={info} show={this.show}/>  );
        }
    }

    show(url){
        this.setState({
            popupURL:url
        });
    }

    hide(){
        this.setState({
            popupClosing:true
        });
    }

    terminatePopup(){
        this.setState({
            popupURL:null,
            popupClosing : false
        });
    }

    componentDidUpdate(){
        if(this.state.popupClosing){
            //Component Animation time is 0.3s
            setTimeout( this.terminatePopup, 300 );
        }
    }

    
    render(){        

        
        

        return(
            <Container>
                <div class="column">{this.content_list[0]}</div>
                <div class="column">{this.content_list[1]}</div>
                <div class="column">{this.content_list[2]}</div>
                <div class="column">{this.content_list[3]}</div>

                {
                    this.state.popupURL != null && [
                        <PopUpBackground onClick={this.hide} closing={this.state.popupClosing} />,
                        <PopUp closing={this.state.popupClosing}> {this.state.popupURL} </PopUp>
                    ]   
                }
                         
            </Container>
        );
        
    }
}


export default Portfolio