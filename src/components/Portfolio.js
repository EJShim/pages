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
    background: linear-gradient(342deg, rgb(100, 12, 132), rgb(12, 130, 114));    
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

class Portfolio extends React.Component{
    constructor(props){
        super(props);

    }

    
    render(){

        //Get Contents from DB(Not Using DB For Now)
        let content_list = [ [], [], [], [] ];
        for(const [index, info] of portfolioData.entries()){
            content_list[index%4].push(<ContentCard information={info}/>  );
        }


        return(
            <Container>
                <div class="column">{content_list[0]}</div>
                <div class="column">{content_list[1]}</div>
                <div class="column">{content_list[2]}</div>
                <div class="column">{content_list[3]}</div>                
            </Container>
        );
        
    }
}


export default Portfolio