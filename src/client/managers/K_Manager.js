import vtkGenericRenderWindow from 'vtk.js/Sources/Rendering/Misc/GenericRenderWindow'
import vtkInteractorStyleManipulator from 'vtk.js/Sources/Interaction/Style/InteractorStyleManipulator';
// For resize Handling,, vulky
// import {ResizeSensor}     from 'css-element-queries'
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
        this.renderWindow = null;
        this.renderer = null;
    }

    static SetRenderer(container){
        const genericRenderWindow = vtkGenericRenderWindow.newInstance();

        // VTK renderWindow/renderer
        this.renderWindow = genericRenderWindow.getRenderWindow();
        this.renderer = genericRenderWindow.getRenderer();
        this.renderer.setBackground(0.0, 0.5, 0.0);
        genericRenderWindow.setContainer(container);
        //not properly working on microsoft edge,, there is no standard for handling resize event
        // new ResizeSensor(container, genericRenderWindow.resize);
        genericRenderWindow.resize();



        ///Temp
        const coneSource = vtkConeSource.newInstance({ height: 1.0 });
        const mapper = vtkMapper.newInstance();
        mapper.setInputConnection(coneSource.getOutputPort());
        const actor = vtkActor.newInstance();
        actor.setMapper(mapper);

        this.renderer.addActor(actor);
    }

    static Redraw(){
        this.renderer.resetCamera();
        this.renderWindow.render();
    }
}

export default K_Manager