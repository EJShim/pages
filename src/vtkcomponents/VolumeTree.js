import React from 'react';
import styled from 'styled-components';


const Container = styled.tr`
    flex:1;
    background-color:#8C92AC;
    margin:5px;
    
    border-radius :5px;    
    overflow:auto;


    div{
        padding:10px;
        flex:1;
        display:flex;
        flex-direction:column;

    }

    div tr:nth-child(even) {
        background-color: #c2c2c2;
    }
    div tr:nth-child(odd) {
        background-color: #a2a2a2;
    }
`;

class VolumeTree extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Container>
                <div>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th> 
                        <th>Age</th>
                    </tr>
                    <tr>
                        <td>Jill</td>
                        <td>Smith</td> 
                        <td>50</td>
                    </tr>
                    <tr>
                        <td>Eve</td>
                        <td>Jackson</td> 
                        <td>94</td>
                    </tr>
                    <tr>
                        <td>Eve</td>
                        <td>Jackson</td> 
                        <td>94</td>
                    </tr>
                    <tr>
                        <td>Eve</td>
                        <td>Jackson</td> 
                        <td>94</td>
                    </tr>
                    <tr>
                        <td>Eve</td>
                        <td>Jackson</td> 
                        <td>94</td>
                    </tr>
                    <tr>
                        <td>Eve</td>
                        <td>Jackson</td> 
                        <td>94</td>
                    </tr>
                    <tr>
                        <td>Eve</td>
                        <td>Jackson</td> 
                        <td>94</td>
                    </tr>
                    <tr>
                        <td>Eve</td>
                        <td>Jackson</td> 
                        <td>94</td>
                    </tr>
                    <tr>
                        <td>Eve</td>
                        <td>Jackson</td> 
                        <td>94</td>
                    </tr>
                    <tr>
                        <td>Eve</td>
                        <td>Jackson</td> 
                        <td>94</td>
                    </tr>
                    <tr>
                        <td>Eve</td>
                        <td>Jackson</td> 
                        <td>94</td>
                    </tr>
                </div>
                
                           
            </Container>
        );
    }
    
}


export default VolumeTree;