import { NextFunction, Request, Response } from 'express';
import uploader from './../../../util/uploadAvatar';

function uploadAvatar(req: Request, res: Response, next: NextFunction) {
    const upload = uploader(
        'avatars',
        ['image/jpg', 'image/png', 'image/jpeg'],
        100000000000,
        'Only .jpg .png or .jpeg format allowed.',
    );

    upload.any()(req, res, (err: any) => {
        if (err) {
            res.status(500).json({
                errors: {
                    common: {
                        msg: err.message,
                    },
                },
            });
        } else {
            next();
        }
    });
}

export default uploadAvatar;
