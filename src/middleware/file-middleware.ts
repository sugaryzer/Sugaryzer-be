import multer from 'multer'
import { ResponseError } from '../error/response-error';

export const fileMiddleware = multer({
    fileFilter: (req, file, cb) => {
        const fileTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/webp']
        
        if (!fileTypes.includes(file.mimetype)){
            cb(new ResponseError(400, 'Invalid file type'))
        }
        cb(null, true)
    },
    storage: multer.memoryStorage()
})