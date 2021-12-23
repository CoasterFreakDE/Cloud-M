import { Properties, UPLOAD_URL, FILES_URL } from "../../../../util/Properties";

export const VIRTUAL_DIRECTORY_PATH = "./virtual-directory/";

export class VirtualDirectory {

    public parent?: VirtualDirectory;

    public files: VirtualFile[] = [];
    public directories: VirtualDirectory[] = [];
    
    constructor(public name: string, public path: string) {
        this.loadFiles();
    }

    public getFile(name: string): VirtualFile | undefined {
        return this.files.find(file => file.name === name);
    }

    public getDirectory(name: string): VirtualDirectory | undefined {
        return this.directories.find(directory => directory.name === name);
    }

    public loadFiles() {
        fetch(FILES_URL + "?path=/" + this.path, {
            method: "GET",
            headers: {
                "Authorization": `Basic ${Properties.getLoginStringBase64()}`
            }
        })
        .then(response => response.json())
        .then(data => {

        }).catch(error => {
            console.log(error);
        });
    }
}

export class VirtualFile {

    public referenceKey: string = generateReferenceKey();
    public blob?: File;
    public size = () => {
        if (this.blob) {
            return " - " + this.blob.size + " bytes";
        }
        return "";
    };

    constructor(public name: string, public path: string) {}

    public saveBlob(blob: File) {
        this.blob = blob;
        
        var formData = new FormData()
        formData.append("files", blob)
        formData.append("virtual-path", this.path)

        // Upload the blob to the server and get the reference key
        fetch(UPLOAD_URL, {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Basic ${Properties.getLoginStringBase64()}`
            }
        })
        .then(response => response.json())
        .then(data => {
            this.referenceKey = data.referenceKey;
            console.log(data);
        })
        .catch(err => {
            console.error(err);
        });
    }

    // Loads the blob from the file system based on the reference key
    public loadBlob() {
        
    }

}

export function generateReferenceKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

