import K_Manager from 'K_Manager';

import macro from 'vtk.js/Sources/macro';
import vtkColorTransferFunction from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction';
import vtkPiecewiseFunction from 'vtk.js/Sources/Common/DataModel/PiecewiseFunction';
import vtkPiecewiseGaussianWidget from 'vtk.js/Sources/Interaction/Widgets/PiecewiseGaussianWidget';
import vtkVolume from 'vtk.js/Sources/Rendering/Core/Volume';
import vtkVolumeMapper from 'vtk.js/Sources/Rendering/Core/VolumeMapper';
import readImageDICOMFileSeries from 'itk/readImageDICOMFileSeries';
import vtkImageData from 'vtk.js/Sources/Common/DataModel/ImageData';
import vtkDataArray from 'vtk.js/Sources/Common/Core/DataArray';
import vtkImageMapper from 'vtk.js/Sources/Rendering/Core/ImageMapper';
import vtkImageSlice from 'vtk.js/Sources/Rendering/Core/ImageSlice';
import vtkColorMaps from 'vtk.js/Sources/Rendering/Core/ColorTransferFunction/ColorMaps';


const { vtkErrorMacro } = macro;


class K_VolumeManager{
    constructor(){

        this.imageData = null;
        this.volume = null;
        this.slice = [null, null, null];
        
        this.otf = null;
        this.ctf = null;

        this.gaussianWidget = null;
        this.gaussianContainer = null;


        ///Colormap Preset
        this.presetNames = [
            '2hot',
            'Asymmtrical Earth Tones (6_21b)',
            'Black, Blue and White',
            'Black, Orange and White',
            'Black-Body Radiation',
            'Blue to Red Rainbow',
            'Blue to Yellow',
            'Blues',
            'BrBG',
            'BrOrYl',
            'BuGn',
            'BuGnYl',
            'BuPu',
            'BuRd',
            'CIELab Blue to Red',
            'Cold and Hot',
            'Cool to Warm',
            'Cool to Warm (Extended)',
            'GBBr',
            'GYPi',
            'GnBu',
            'GnBuPu',
            'GnRP',
            'GnYlRd',
            'Grayscale',
            'Green-Blue Asymmetric Divergent (62Blbc)',
            'Greens',
            'GyRd',
            'Haze',
            'Haze_cyan',
            'Haze_green',
            'Haze_lime',
            'Inferno (matplotlib)',
            'Linear Blue (8_31f)',
            'Linear YGB 1211g',
            'Magma (matplotlib)',
            'Muted Blue-Green',
            'OrPu',
            'Oranges',
            'PRGn',
            'PiYG',
            'Plasma (matplotlib)',
            'PuBu',
            'PuOr',
            'PuRd',
            'Purples',
            'Rainbow Blended Black',
            'Rainbow Blended Grey',
            'Rainbow Blended White',
            'Rainbow Desaturated',
            'RdOr',
            'RdOrYl',
            'RdPu',
            'Red to Blue Rainbow',
            'Reds',
            'Spectral_lowBlue',
            'Viridis (matplotlib)',
            'Warm to Cool',
            'Warm to Cool (Extended)',
            'X Ray',
            'Yellow 15',
            'blot',
            'blue2cyan',
            'blue2yellow',
            'bone_Matlab',
            'coolwarm',
            'copper_Matlab',
            'gist_earth',
            'gray_Matlab',
            'heated_object',
            'hsv',
            'hue_L60',
            'jet',
            'magenta',
            'nic_CubicL',
            'nic_CubicYF',
            'nic_Edge',
            'pink_Matlab',
            'rainbow',
          ];

        this.currentPresetName = 'X Ray';

    }

    onImportVolume(){
        K_Manager.Mgr().setLog("import volume triggered");

        let fileDialog = document.createElement("input");
        fileDialog.setAttribute("type", "file");
        fileDialog.setAttribute("accept", ".dcm");    
        fileDialog.setAttribute("multiple", true);        
        fileDialog.addEventListener("change", (event)=>{                
            //If no file selected
            if(event.target.files.length < 1) {
                K_Manager.Mgr().setLog("no file selected");
                return;
            }
    
            //iterate file in this directory
            K_Manager.Mgr().setLog(event.target.files.length)
            this.importVolume(event.target.files);
        });
        fileDialog.click();
    }

    setGaussianWidget(element){
        if(this.gaussianWidget == null){
            this.gaussianWidget = vtkPiecewiseGaussianWidget.newInstance({numberOfBins:256});
            
            this.gaussianWidget.updateStyle({
                backgroundColor: 'rgba(0, 0, 0, 0.0)',
                histogramColor: 'rgba(255, 0, 0, 1.0)',
                strokeColor: 'rgb(0, 0, 0)',
                activeColor: 'rgb(255, 255, 255)',
                handleColor: 'rgb(50, 150, 50)',
                buttonDisableFillColor: 'rgba(255, 255, 255, 0.5)',
                buttonDisableStrokeColor: 'rgba(0, 0, 0, 0.5)',
                buttonStrokeColor: 'rgba(0, 0, 0, 1)',
                buttonFillColor: 'rgba(255, 255, 255, 1)',
                strokeWidth: 2,
                activeStrokeWidth: 3,
                buttonStrokeWidth: 1.5,
                handleWidth: 3,
                iconSize: 20, // Can be 0 if you want to remove buttons (dblClick for (+) / rightClick for (-))
                padding: 10,
            });
            
            this.gaussianWidget.onAnimation((start)=>{
                for(let i=0 ; i<4 ; i++){
                    if(start){
                        K_Manager.Mgr().getRenderWindow(i).getInteractor().requestAnimation(this.gaussianWidget);
                    }else{
                        K_Manager.Mgr().getRenderWindow(i).getInteractor().cancelAnimation(this.gaussianWidget);
                    }
                }
            });

            window.addEventListener("resize", ()=>{this.resizeGaussianWidget()});
        }

        this.gaussianWidget.setContainer(element);
        this.gaussianContainer = element;

        this.resizeGaussianWidget();

       
    }

    resizeGaussianWidget(){
        const dims = this.gaussianContainer.getBoundingClientRect();

        this.gaussianWidget.setSize(
            Math.floor(dims.width),
            Math.floor(dims.height)
        );

        this.gaussianWidget.render();
    }

    updateGaussianWidget(){

        this.gaussianWidget.setDataArray(this.imageData.getPointData().getScalars().getData());
        this.gaussianWidget.applyOpacity(this.otf);
        this.gaussianWidget.setColorTransferFunction(this.ctf);        
        
        //on opacity change event handler
        this.gaussianWidget.onOpacityChange(()=>{
            //Set Opacity
            this.gaussianWidget.applyOpacity(this.otf);
            this.updateImageFromGaussian();
            if(!K_Manager.Mgr().getRenderWindow(0).getInteractor().isAnimating()){

                for(let i=0 ; i<4 ; i++){
                    K_Manager.Mgr().getRenderWindow(i).render();
                }
                
            }
        });



        //set OTF
        this.otf.removeAllPoints();
        this.gaussianWidget.addGaussian(0.75, 1, 0.3, 0, 0);        
        this.gaussianWidget.bindMouseListeners();

        //Set CTF
        this.setPresetColor(this.currentPresetName);
    }

    importVolume(files){
        readImageDICOMFileSeries(null, files).then(({image, webWorker})=>{
            webWorker.terminate();

            let imageData = this.convertItkToVtkImage(image);
            this.setImageData(imageData);
        }).catch((err)=>{
            K_Manager.Mgr().setLog("problem occured while reading dicom series");
            K_Manager.Mgr().setLog("cannot handle multiple series for now..");
            alert("error");
        });
    }

    setImageData(imageData){
        this.imageData = imageData;

        if(this.actor == null){
            //property
            const mapper = vtkVolumeMapper.newInstance();
            mapper.setSampleDistance(2.0);
            
            this.volume = vtkVolume.newInstance();
            this.volume.setMapper(mapper);
            
            //Initialize Property
            this.ctf = vtkColorTransferFunction.newInstance();
            this.otf = vtkPiecewiseFunction.newInstance();


            this.volume.getProperty().setInterpolationTypeToFastLinear();
            this.volume.getProperty().setScalarOpacity(0, this.otf);
            this.volume.getProperty().setRGBTransferFunction(0, this.ctf);


            for(let i=0 ; i<3 ; i++){
                const sliceMapper = vtkImageMapper.newInstance();

                this.slice[i] = vtkImageSlice.newInstance();
                this.slice[i].setMapper(sliceMapper);
                this.slice[i].getProperty().setScalarOpacity(this.otf);
                this.slice[i].getProperty().setRGBTransferFunction(this.ctf);
            }

        }

        this.volume.getMapper().setInputData(imageData);
        //Set Slice
        this.slice[0].getMapper().setInputData(imageData);
        this.slice[1].getMapper().setInputData(imageData);
        this.slice[2].getMapper().setInputData(imageData);



        const extent = imageData.getExtent()

        this.slice[0].getMapper().setISlice(Math.floor((extent[0]+extent[1])/2));
        this.slice[1].getMapper().setJSlice(Math.floor((extent[2]+extent[3])/2));
        this.slice[2].getMapper().setKSlice(Math.floor((extent[4]+extent[5])/2));

        

        //Add To Renderer
        //Clear Everything in renderer
        K_Manager.Mgr().clear();

        //Add Volume
        K_Manager.Mgr().getRenderer(0).addVolume(this.volume);
        K_Manager.Mgr().getRenderer(1).addViewProp(this.slice[0]);
        K_Manager.Mgr().getRenderer(2).addViewProp(this.slice[1]);
        K_Manager.Mgr().getRenderer(3).addViewProp(this.slice[2]);


        //Update Gaussian WIdget
        this.updateGaussianWidget();

        K_Manager.Mgr().Redraw();
    }

    updateImageFromGaussian(){
        if(this.imageData == null) return;
        
        const colorDataRange = this.gaussianWidget.getOpacityRange();

        this.ctf.setVectorModeToMagnitude();        
        this.ctf.setMappingRange(...colorDataRange);
        this.ctf.updateRange();
        

        return;
        // const scalarRange = this.imageData.getPointData().getScalars().getRange();
        const scalarRange = [-1024, 3096];

        const position = gaussian[0].position;
        const width = gaussian[0].width;

        //position and width are normalized

        const scalarWidth = scalarRange[1] - scalarRange[0] + 1;


        const colorLevel = scalarRange[0] + position*scalarWidth;
        const colorWindow = scalarWidth * width;

        this.updateColorLevel(colorLevel);
        this.updateColorWindow(colorWindow);
    }



    updateColorLevel(level){
        if(this.slice[0] == null) return;

        for(let slice of this.slice){
            slice.getProperty().setColorLevel(level);
        }
    }   

    updateColorWindow(colorWindow){
        if(this.slice[0] == null) return;

        for(let slice of this.slice){
            slice.getProperty().setColorWindow(colorWindow);
        }
    }

    updateSlice(idx, direction){
        if(this.imageData == null) return;


        ///Normalize Direction
        if(direction < 0) direction = -1;
        else direction = 1;

        const extent = this.imageData.getExtent()        
        const mapper = this.slice[idx].getMapper(); 
        const currentIdx = mapper.getSlice();
        const destIdx = currentIdx + direction;

        if(destIdx < 0 || destIdx > extent[2*idx+1]) return;

        switch(idx){
            case 0:
                mapper.setISlice(destIdx);
            break;
            case 1:
                mapper.setJSlice(destIdx);
            break;
            case 2:
                mapper.setKSlice(destIdx);
            break;
            default:
            break;
        }

        K_Manager.Mgr().Redraw(idx+1);

    }

    setPresetColor(presetName){
        K_Manager.Mgr().setLog(presetName);

        this.currentPresetName = presetName;

        if(this.imageData == null){
            K_Manager.Mgr().setLog("Import Image First");
            return;
        }

        const preset = vtkColorMaps.getPresetByName(presetName);
        const colorDataRange = this.gaussianWidget.getOpacityRange();

        this.ctf.setVectorModeToMagnitude();
        this.ctf.applyColorMap(preset);
        this.ctf.setMappingRange(...colorDataRange);
        this.ctf.updateRange();


        this.gaussianWidget.render();
        K_Manager.Mgr().Redraw();
    }

    convertItkToVtkImage(itkImage, options={}){
        // Make sure we can handle input pixel type
        // Refer to itk-js/src/PixelTypes.js for numerical values
        switch (itkImage.imageType.pixelType) {
            case 1: // Scalar
            case 2: // RGB
            case 3: // RGBA
            break;
            default:
            vtkErrorMacro(
                `Cannot handle ITK.js pixel type ${itkImage.imageType.pixelType}`
            );
            return null;
        }

        const vtkImage = {
            origin: [0, 0, 0],
            spacing: [1, 1, 1],
        };

        const dimensions = [1, 1, 1];
        const direction = [1, 0, 0, 0, 1, 0, 0, 0, 1];

        for (let idx = 0; idx < itkImage.imageType.dimension; ++idx) {
            vtkImage.origin[idx] = itkImage.origin[idx];
            vtkImage.spacing[idx] = itkImage.spacing[idx];
            dimensions[idx] = itkImage.size[idx];
            for (let col = 0; col < itkImage.imageType.dimension; ++col) {
                // ITK (and VTKMath) use a row-major index axis, but the direction
                // matrix on the vtkImageData is a webGL matrix, which uses a
                // column-major data layout. Transpose the direction matrix from
                // itkImage when instantiating that vtkImageData direction matrix.
                direction[col + idx * 3] =
                itkImage.direction.data[idx + col * itkImage.imageType.dimension];
            }
        }

        // Create VTK Image Data
        const imageData = vtkImageData.newInstance(vtkImage);

        // create VTK image data
        const scalars = vtkDataArray.newInstance({
            name: options.scalarArrayName || 'Scalars',
            values: itkImage.data,
            numberOfComponents: itkImage.imageType.components,
        });

        imageData.setDirection(direction);
        imageData.setDimensions(...dimensions);
        imageData.getPointData().setScalars(scalars);

        return imageData;
    }
}

export default K_VolumeManager