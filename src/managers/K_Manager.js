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
    static New(){
        this.genericRenderWindowCollection = [];
    }

    static AddRenderer(container){
        const genericRenderWindow = vtkGenericRenderWindow.newInstance();

        // VTK renderWindow/renderer
        // const renderWindow = genericRenderWindow.getRenderWindow();
        const renderer = genericRenderWindow.getRenderer();
        renderer.setBackground(Math.random()*0.2, Math.random()*0.5, Math.random()*0.5);
        genericRenderWindow.setContainer(container);
        //not properly working on microsoft edge,, there is no standard for handling resize event
        // new ResizeSensor(container, genericRenderWindow.resize);



        ///Temp
        const coneSource = vtkConeSource.newInstance({ height: 1.0 });
        const mapper = vtkMapper.newInstance();
        mapper.setInputConnection(coneSource.getOutputPort());
        const actor = vtkActor.newInstance();
        actor.setMapper(mapper);
        actor.getProperty().setColor(Math.random(), Math.random(), Math.random());
        renderer.addActor(actor);


        this.genericRenderWindowCollection.push(genericRenderWindow);
    }

    static Clear(){
        this.genericRenderWindowCollection = [];
    }

    static HandleResize(){
        for(let genericWindow of this.genericRenderWindowCollection){
            genericWindow.resize();            
        }
    }

    static Redraw(){
        for(let genericWindow of this.genericRenderWindowCollection){

            const renderWindow = genericWindow.getRenderWindow();
            const renderer = genericWindow.getRenderer();
            renderer.resetCamera();
            renderWindow.render();
        }
        
    }
}

export default K_Manager