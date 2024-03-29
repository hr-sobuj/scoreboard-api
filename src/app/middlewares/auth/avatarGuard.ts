import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import uploader from '../../../util/uploadAvatar';
import { AuthModel } from '../../modules/auth/auth.model';

async function avatarGuard(req: Request, res: Response, next: NextFunction) {
    const user = await AuthModel.find({ _id: req.params.id });
    const userAvatarDir = `${__dirname}/../../../public/uploads/avatars/${user[0]?.avatar}`;
    if (fs.existsSync(userAvatarDir)) {
        fs.unlinkSync(userAvatarDir);
    }
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

export default avatarGuard;
