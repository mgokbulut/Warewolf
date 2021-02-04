import { NextFunction, Request, Response } from 'express';

const indexPage = (req: Request, res: Response, next: NextFunction) => {
    res.render('index');
    // return res.status(200).json({
    //     message: 'pong'
    // });
};

export default { indexPage };
