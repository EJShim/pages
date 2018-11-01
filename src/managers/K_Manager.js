import vtkGenericRenderWindow from 'vtk.js/Sources/Rendering/Misc/GenericRenderWindow'
import vtkInteractorStyleManipulator from 'vtk.js/Sources/Interaction/Style/InteractorStyleManipulator';
//Mesh Manager
import K_MeshManager from 'managers/K_MeshManager.js'
import K_VolumeManager from 'managers/K_VolumeManager.js'

import V_LogWidget from 'vtkcomponents/V_LogWidget';


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

            
            
            
            if(idx != 0){
                const interactorStyle = vtkInteractorStyleManipulator.newInstance();

                interactorStyle.removeAllMouseManipulators();
                genericRenderWindow.getInteractor().setInteractorStyle(interactorStyle);
                genericRenderWindow.getInteractor().onMouseWheel((e)=>{this.onMouseWheelEvent(e, idx)});
                // renderer.getActiveCamera().parallelProjection=true;
                renderer.getActiveCamera().setParallelProjection(true);

            }


            switch(idx){
                case 1:
                    renderer.getActiveCamera().azimuth(90);
                    renderer.getActiveCamera().roll(-90);
                    break;
                case 2:
                    renderer.getActiveCamera().elevation(90);
                    break;
                case 3:
                    
                    break;
                default:
                break;
            }



            //This is Test
            let actor = K_Manager.MeshMgr().initializeMesh();
            renderer.addActor(actor);
        }
        this.genericRenderWindowCollection[idx].setContainer(container);
        //genericRenderWindow.setContainer(container);
        
    }


    onMouseWheelEvent(e, idx){
        K_Manager.VolumeMgr().updateSlice(idx-1, e.spinY)
    }

    getRenderWindow(idx){
        return this.genericRenderWindowCollection[idx].getRenderWindow();
    }

    getRenderer(idx){
        return this.genericRenderWindowCollection[idx].getRenderer();
    }

    clear(){
        for(let renWin of this.genericRenderWindowCollection){
            renWin.getRenderer().removeAllViewProps()
        }
    }

    HandleResize(){
        for(let genericWindow of this.genericRenderWindowCollection){
            genericWindow.resize();            
        }
    }

    

    Redraw(idx){

        if(idx == null){
            for(let genericWindow of this.genericRenderWindowCollection){

                const renderWindow = genericWindow.getRenderWindow();
                const renderer = genericWindow.getRenderer();
                renderer.resetCamera();
                renderer.resetCameraClippingRange();
                renderer.getActiveCamera().zoom(1.5);
    
                renderWindow.render();
            }
        }else{
            const renderWindow = this.genericRenderWindowCollection[idx].getRenderWindow(); 
            const renderer = this.genericRenderWindowCollection[idx].getRenderer();
            renderer.resetCamera();
            renderer.resetCameraClippingRange();
            renderer.getActiveCamera().zoom(1.5);

            renderWindow.render();
        }
        
        
    }
}

export default K_Manager