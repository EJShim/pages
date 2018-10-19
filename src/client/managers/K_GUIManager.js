
import * as types from 'ActionTypes'


const initialState = {
    mode: 'VIEW_INTRO'
}

class K_GUIManager{
    constructor(){
        

    }


    SetViewMode(state = initialState, action){
        switch(action.type){
            case types.VIEW_VTK:
            return{                
                mode:'VIEW_VTK'
            };
            case types.VIEW_HOME:
            return{                
                mode:'VIEW_HOME'
            }
            default:
            return state;
        }
    }
    
}

export default K_GUIManager;