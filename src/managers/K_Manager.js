import vtkGenericRenderWindow from 'vtk.js/Sources/Rendering/Misc/GenericRenderWindow'
import vtkInteractorStyleManipulator from 'vtk.js/Sources/Interaction/Style/InteractorStyleManipulator';
//Mesh Manager
// import K_MeshManager from 'K_MeshManager.js'
// import K_VolumeManager from 'K_VolumeManager.js'

//For Test
import vtkConeSource from 'vtk.js/Sources/Filters/Sources/ConeSource';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';


//test

class K_Manager{
    static instance;

    constructor(){
        if(K_Manager.instance) return K_Manager.instance;

        this.genericRenderWindowCollection = [null, null, null, null];

        K_Manager.instance = this
    }

    static Mgr(){
        return new K_Manager();
    }

    AddRenderer(container, idx){

        if(this.genericRenderWindowCollection[idx] == null){
            //Initialize
            const genericRenderWindow = vtkGenericRenderWindow.newInstance();
            this.genericRenderWindowCollection[idx] = genericRenderWindow;

            
            const renderer = genericRenderWindow.getRenderer();
            renderer.setBackground(0, 0, 0);        


            ///Temp
            const coneSource = vtkConeSource.newInstance({ height: 1.0 });
            const mapper = vtkMapper.newInstance();
            mapper.setInputConnection(coneSource.getOutputPort());
            const actor = vtkActor.newInstance();
            actor.setMapper(mapper);
            actor.getProperty().setColor(Math.random(), Math.random(), Math.random());
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