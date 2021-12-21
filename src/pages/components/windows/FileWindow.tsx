import { useCallback } from "react";
import { VirtualDirectory, VirtualFile } from "./extras/VirtualDirectory";
import 'react-dropzone-uploader/dist/styles.css';
import { useDropzone } from "react-dropzone";

export function FileWindow() {

   let directory = new VirtualDirectory("Home", "home")

   const changeDirectory = (path: string) => {
        const parts = path.split("/");
        let currentDirectory = directory;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (part === "") {
                continue;
            }
            if (part === "..") {
                if (currentDirectory.parent) {
                    currentDirectory = currentDirectory.parent;
                }
            } else {
                currentDirectory = currentDirectory.getDirectory(part)!!;
            }
        }
        directory = currentDirectory;
    }

    let directories = directory.directories.map((dir) => {
        return <div onClick={() => changeDirectory(dir.path)} key={dir.name}>{dir.name}</div>
    });

    let files = directory.files.map((file) => {
        return <div key={file.referenceKey}>{file.name}{file.size}</div>
    });

    const onDrop = useCallback(acceptedFiles => {
        for (let i = 0; i < acceptedFiles.length; i++) {
            const file = acceptedFiles[i] as File;
            const virtualFile = new VirtualFile(file.name, `/${directory.path}`);
            virtualFile.saveBlob(file);
            directory.files.push(virtualFile);
        }
      }, []);


    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    return (
        <div>
            <h1>${directory.name}</h1>
            <button onClick={() => changeDirectory("..")}>..</button>
            {directories}
            {files}
            <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        </div>
    );

}