export abstract class Location {
    name: string;
    path: string;

    constructor(name: string, path: string) {
        this.name = name;
        this.path = path;
    }
}

export class FileLocation extends Location {
}


export class FolderLocation extends Location {
}
