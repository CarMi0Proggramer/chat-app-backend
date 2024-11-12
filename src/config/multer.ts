import multer from "multer";
import path from "node:path";
import fs from "node:fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderExists = fs.existsSync(path.resolve("dist", "files"));
        if (!folderExists) {
            fs.mkdirSync(path.resolve("dist", "files"));
        }

        cb(null, path.resolve("dist", "files"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                "-" +
                uniqueSuffix +
                path.extname(file.originalname)
        );
    },
});

export const fileUploader = multer({ storage });
