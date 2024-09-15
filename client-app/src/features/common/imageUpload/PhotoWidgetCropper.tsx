import { Cropper } from "react-cropper";
import 'cropperjs/dist/cropper.css';

interface Props {
    imagePreview: string;
    setCropper: (cropper: Cropper) => void;
    src: string;
}

export default function PhotoWidgetCropper({imagePreview, setCropper, src}: Props) {
    return (
        <Cropper 
            src={imagePreview}
            style={src === 'user' ? {height: 200, width: '100%'} : {height:100, width:'100%'}}
            initialAspectRatio={src === 'user' ? 1 : 21/9}
            aspectRatio={src == 'user' ? 1 : 21/9}
            preview='.img-preview'
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}            
            onInitialized={cropper => setCropper(cropper)}
        />
    )
}