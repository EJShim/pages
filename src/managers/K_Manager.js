import vtkGenericRenderWindow from 'vtk.js/Sources/Rendering/Misc/GenericRenderWindow'
import vtkInteractorStyleManipulator from 'vtk.js/Sources/Interaction/Style/InteractorStyleManipulator';
//Mesh Manager
import K_MeshManager from 'managers/K_MeshManager.js'
import K_VolumeManager from 'managers/K_VolumeManager.js'

//For Test
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';


//test

class K_Manager{
    static instance;
    static meshManager;
    static volumeManager;

    constructor(){
        if(K_Manager.instance) return K_Manager.instance;

        this.genericRenderWindowCollection = [null, null, null, null];

        K_Manager.instance = this
    }

    static Mgr(){
        return new K_Manager();
    }

    static MeshMgr(){
        if(K_Manager.meshManager == null){
            K_Manager.meshManager = new K_MeshManager();
        }

        return K_Manager.meshManager;
    }

    static VolumeMgr(){
        if(K_Manager.volumeManager == null){
            K_Manager.volumeManager = new K_VolumeManager();
        }

        return K_Manager.volumeManager;
    }

    AddRenderer(container, idx){

        if(this.genericRenderWindowCollection[idx] == null){
            //Initialize
            const genericRenderWindow = vtkGenericRenderWindow.newInstance();
            this.genericRenderWindowCollection[idx] = genericRenderWindow;

            
            const renderer = genericRenderWindow.getRenderer();
            renderer.setBackground(0, 0, 0);        

            let actor = K_Manager.MeshMgr().initializeMesh();
            renderer.addActor(actor);
        }
        this.genericRenderWindowCollection[idx].setContainer(container);
        //genericRenderWindow.setContainer(container);
        
    }


    Clear(){        
        this.genericRenderWindowCollection = [];
    }

    HandleResize(){
        for(let genericWindow of this.genericRenderWindowCollection){
            genericWindow.resize();            
        }
    }

    Redraw(){
        for(let genericWindow of this.genericRenderWindowCollection){

            const renderWindow = genericWindow.getRenderWindow();
            const renderer = genericWindow.getRenderer();
            renderer.resetCamera();
            renderWindow.render();
        }
        
    }
}

export default K_Manager