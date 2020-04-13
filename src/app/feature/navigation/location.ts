export abstract class Location {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class FileLocation extends Location {
}


export class FolderLocation extends Location {

    items: Location[];

    constructor(name: string, items: Location[]) {
        super(name);
        this.items = items;
    }
}
