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
    justify-content: space-around;
    background: linear-gradient(342deg, rgb(100, 12, 132), rgb(12, 130, 114));
    background-size: 200% 200%;
    animation : ${animation_background} 5s ease infinite;
`;

class Portfolio extends React.Component{
    constructor(props){
        super(props);

    }

    
    render(){

        //Get Contents from DB(Not Using DB For Now)
        let content_list = [];
        for(let info of portfolioData){
            content_list.push(<ContentCard information = {info}/>  );
        }


        return(
            <Container>
                {content_list}
            </Container>
        );
        
    }
}


export default Portfolio