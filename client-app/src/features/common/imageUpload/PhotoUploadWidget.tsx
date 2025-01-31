import { Button, Grid, Header } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import { useEffect, useState } from "react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import { observer } from "mobx-react-lite";

interface Props {
    loading: boolean;
    uploadPhoto: (file:Blob) => void;
    src: string;
}

export default observer(function PhotoUploadWidget({loading, uploadPhoto, src}: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header sub style={{color: '#346e61'}} content='Step 1 - Add Photo' />
                <PhotoWidgetDropzone setFiles={setFiles} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header sub style={{color: '#346e61'}} content='Step 2 - Resize Photo' />
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} src={src} />
                )}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header sub style={{color: '#346e61'}} content='Step 3 - Preview & Upload' />
                {files && files.length > 0 && (
                    <>
                        <div className="img-preview" style={{ height: '100%', width: '100%', overflow: 'hidden' }} />
                        <Button.Group widths={2}>
                            <Button basic type="button" className='greenBtn' loading={loading} onClick={onCrop} icon='check' />
                            <Button basic type="button" className='orangeBtn' disabled={loading} onClick={() => setFiles([])} icon='close' />
                        </Button.Group>
                    </>
                )}

            </Grid.Column>
        </Grid>
    )
})