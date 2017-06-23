let expect = require("chai").expect;

let browser_fs = require("./index");
let SourceFile = browser_fs.SourceFile;
let FileSystem = browser_fs.FileSystem;

describe("Sanity Checks", function() {
    describe("addition operator", function() {
        it("should add 1+1=2", function() {
            expect(2).to.equal(1 + 1);
        });
    });
});

describe("SourceFile", function() {
    describe("constructor", function() {
        it("should create a new SourceFile", function() {
            expect(new SourceFile("")).to.not.be.null;
            expect(new SourceFile("")).to.not.be.undefined;
        });

        it("should set filename to input", function() {
            expect(new SourceFile("filename").fileName).to.equal("filename");
            expect(new SourceFile(null).fileName).to.be.null;
        });

        it("should have blank data", function() {
            expect(new SourceFile("").text).to.equal("");
        });
    });
});

describe("FileSystem", function() {
    describe("instantiation", function() {
        it("should start with blank filesystem", function() {
            expect(new FileSystem().fileSystem).deep.equal({});
            expect(Object.keys(new FileSystem().fileSystem).length).to.equal(0);
        });
    });

    describe("writeFile", function() {
        it("should add something", function() {
            let fs = new FileSystem();
            fs.writeFile("newFile.js", "", false, {}, []);
            expect(Object.keys(fs.fileSystem).length).to.equal(1);
            expect(fs.fileSystem["newFile.js"]).to.not.be.undefined;
            expect(fs.fileSystem["newFile.js"]).to.be.an("object");

            fs.writeFile("newFile2.js", "", false, {}, []);
            expect(Object.keys(fs.fileSystem).length).to.equal(2);
            expect(fs.fileSystem["newFile2.js"]).to.not.be.undefined;
            expect(fs.fileSystem["newFile2.js"]).to.be.an("object");
        });

        it("should add the correct thing", function() {
            let fs = new FileSystem();

            fs.writeFile("newFile.js", "", false, {}, []);
            expect(fs.fileSystem["newFile.js"].fileName).to.equal("newFile.js");
            expect(fs.fileSystem["newFile.js"].text).to.equal("");

            fs.writeFile("newFile2.js", "console.log()", false, {}, []);
            expect(fs.fileSystem["newFile2.js"].fileName).to.equal("newFile2.js");
            expect(fs.fileSystem["newFile2.js"].text).to.equal("console.log()");
        });

        it("should overwrite file data as necessary", function() {
            let fs = new FileSystem();

            fs.writeFile("newFile.js", "", false, {}, []);
            expect(fs.fileSystem["newFile.js"].fileName).to.equal("newFile.js");
            expect(fs.fileSystem["newFile.js"].text).to.equal("");

            fs.writeFile("newFile.js", "console.log()", false, {}, []);
            expect(fs.fileSystem["newFile.js"].text).to.equal("console.log()");
        })
    });

    describe("getCanonicalFileName", function() {
        it("should return the input filename", function() {
            let fs = new FileSystem();
            expect(fs.getCanonicalFileName("foo.js")).to.equal("foo.js");
        });
    });

    describe("getSourceFile", function() {
        it("should return undefined for nonexistent file", function() {
            let fs = new FileSystem();
            expect(fs.getSourceFile("f.js", null, () => null)).to.be.undefined;
        });

        it("should return some object", function() {
            let fs = new FileSystem();
            fs.writeFile("f.js", "", false, {}, []);
            expect(fs.getSourceFile("f.js", null, () => null)).to.be.an("object");
        });

        it("should return the right object", function() {
            let fs = new FileSystem();
            fs.writeFile("f.js", "console.log()", false, {}, []);
            expect(fs.getSourceFile("f.js", null, () => null)).to.deep.equal({
                "fileName": "f.js",
                "text": "console.log()"
            });
        });
    });
});
