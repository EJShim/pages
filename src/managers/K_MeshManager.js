import K_Manager from 'K_Manager';
import vtkSTLReader from 'vtk.js/Sources/IO/Geometry/STLReader';
import vtkConeSource from 'vtk.js/Sources/Filters/Sources/ConeSource';
import vtkMapper from 'vtk.js/Sources/Rendering/Core/Mapper';
import vtkActor from 'vtk.js/Sources/Rendering/Core/Actor';


class K_MeshManager{
    constructor(){

        this.actorCollection = [];

    }

    initializeMesh(){

        ///Temp
        const coneSource = vtkConeSource.newInstance({ height: 1.0 });
        const mapper = vtkMapper.newInstance({scalarVisibility:false});
        mapper.setInputConnection(coneSource.getOutputPort());
        const actor = vtkActor.newInstance();
        actor.setMapper(mapper);
        actor.getProperty().setColor(0.89, 0.85, 0.79);

        this.actorCollection.push(actor);

        return actor;
    }


    onImportMesh(){        
         //Create File Dialog
        let fileDialog = document.createElement("input");
        fileDialog.setAttribute("type", "file");
        fileDialog.setAttribute("accept", ".stl");
        //Multiple:True will let dialog be able to select multiple files
        fileDialog.setAttribute("multiple", false);
        fileDialog.click();    
        fileDialog.addEventListener("change", (event)=>{                
            //If no file selected
            if(event.target.files.length < 1) return;

            //http file element
            const file = event.target.files[0];        
            //K_Manager.MeshMgr().ImportMesh(file);

            //create file path
            const file_path = URL.createObjectURL(file);
            console.log(file_path);

            const reader = vtkSTLReader.newInstance();
            reader.setUrl(file_path, { binary: true }).then(()=>{
                for(let actor of this.actorCollection){
                    actor.getMapper().setInputConnection(reader.getOutputPort());
                }
                K_Manager.Mgr().Redraw();
            });


            


            


            //Remove Dialog??
        });
    }
}

export default K_MeshManager