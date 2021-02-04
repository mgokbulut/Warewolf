import { NextFunction, Request, Response } from 'express';

const create = (req: Request, res: Response, next: NextFunction) => {
    console.log('create function');

    res.render('index');
    // return res.status(200).json({
    //     message: 'pong'
    // });
};

export default { create };
