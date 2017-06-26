export class SourceFile {
    fileName: string;
    text: string = "";

    /**
     * Constructor for a SourceFile
     * @class SourceFile
     * @classdesc A representation of a file stored in the file system
     * @param {string} _fileName The filename of the file to create
     */
    constructor(_fileName: string) {
        this.fileName = _fileName;
    }
};

/**
 * The FileSystem itself
 * @class FileSystem
 * @classdec Stores a representation of the file system
 */
export class FileSystem {
    /**
     * Internal dictionary used to maintain the file system
     * @member
     * @private
     * @type: {[fileName: string]: SourceFile}
     */
    private fileSystem: { [fileName: string]: SourceFile } = {};

    /**
     * Check if a file exists
     * @method
     * @param {string} fileName The name of the file to check
     */
    fileExists(fileName: string): boolean {
        return fileName in this.fileSystem;
    }

    /**
     * Get a source file from the file system
     * @method
     * @param {string} fileName The name of the file to get from the file system
     */
    getSourceFile(fileName: string): SourceFile
    {
        return this.fileSystem[fileName];
    }

    /**
     * Get the canonical file name from a given filename - used for compatibility
     * with Angular compiler host
     * @method
     * @param {string} fileName The filename to get the canonical name of
     */
    getCanonicalFileName(fileName: string): string {
        return fileName;
    }

    /**
     * Writes a file to the filesystem with the given filename and data
     * @method
     * @param {string} fileName The filename to write to the file system
     * @param {string} data The data to write into the given filename 
     */
    writeFile(fileName: string, data: string): void
    {
        if (this.getSourceFile(fileName)) {
            this.getSourceFile(fileName).text = data;
        }
        else {
            let file: SourceFile = new SourceFile(fileName);
            file.text = data;
            this.fileSystem[fileName] = file;
        }
    }
};
