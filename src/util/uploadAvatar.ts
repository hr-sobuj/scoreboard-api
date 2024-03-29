import { Request } from 'express';
import createError from 'http-errors';
import multer, { diskStorage, FileFilterCallback } from 'multer';
import path from 'path';

function uploader(subDirectory: string, allowedFileType: string[], maxFileSize: number, errorMsg: string): multer.Multer {
    const UPLOAD_DIR = `${__dirname}/../public/uploads/${subDirectory}/`;
    const storage = diskStorage({
        destination(req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
            cb(null, UPLOAD_DIR);
        },
        filename(req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
            const fileExtension = path.extname(file.originalname);
            const fileName = file.originalname.replace(fileExtension, ' ').split(' ').join('-') + Date.now();
            cb(null, fileName + fileExtension);
        },
    });

    const upload = multer({
        storage,
        limits: {
            fileSize: maxFileSize,
        },
        fileFilter(req: Request, file: Express.Multer.File, cb: FileFilterCallback) {
            if (allowedFileType.includes(file.mimetype)) {
                cb(null, true);
            } else {
                cb(createError(errorMsg));
            }
        },
    });

    return upload;
}

export default uploader;
