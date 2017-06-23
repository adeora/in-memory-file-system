module browser_fs {
    export class SourceFile {
        fileName: string;
        text: string = "";

        constructor(_fileName: string) {
            this.fileName = _fileName;
        }
    };

    class ScriptTarget {};

    export class FileSystem {
        fileSystem: { [fileName: string]: SourceFile } = {};

        getSourceFile(fileName: string, languageVersion: ScriptTarget, 
                                        onError?: (message: string) => void): SourceFile
        {
            return this.fileSystem[fileName];
        }

        getCanonicalFileName(fileName: string): string {
            return fileName;
        }

        writeFile(fileName: string, data: string, writeByteOrderMark: boolean,
                  onError?: (message: string) => void, sourceFiles?: SourceFile[]): void
        {
            if (this.fileSystem[fileName]) {
                this.fileSystem[fileName].text = data;
            }
            else {
                let file: SourceFile = new SourceFile(fileName);
                file.text = data;
                this.fileSystem[fileName] = file;
            }
        }

    };
}

export = browser_fs;
