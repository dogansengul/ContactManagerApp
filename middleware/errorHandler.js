import { constants } from '../util/constants.js';
import AppError from '../util/AppError.js';

const errorHandler = (err, req, res, next) => {
    // Eğer hata AppError örneği değilse, örneğin Mongoose'dan geliyorsa,
    // veya beklenmeyen bir hata ise, statusCode ve mesajı default değerlerle ayarlayabilirsiniz.
    let statusCode = err.statusCode || constants.INTERNAL_SERVER_ERROR;
    let message = err.message || 'Something went wrong';

    // İsteğe bağlı: Eğer AppError değilse, loglama veya ekstra işlem yapabilirsiniz.
    if (!(err instanceof AppError)) {
        // Örneğin, production ortamında detaylı hata mesajlarını saklamak isteyebilirsiniz.
        console.error('Unexpected error:', err);
    }

    res.status(statusCode);

    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({
                title: 'Validation failed',
                message,
                stackTrace: err.stack,
            });
            break;
        case constants.UNAUTHORIZED:
            res.json({
                title: 'Unauthorized',
                message,
                stackTrace: err.stack,
            });
            break;
        case constants.FORBIDDEN:
            res.json({
                title: 'Forbidden',
                message,
                stackTrace: err.stack,
            });
            break;
        case constants.NOT_FOUND:
            res.json({
                title: 'Not found',
                message,
                stackTrace: err.stack,
            });
            break;
        case constants.INTERNAL_SERVER_ERROR:
            res.json({
                title: 'Internal server error',
                message,
                stackTrace: err.stack,
            });
            break;
        default:
            res.json({
                title: 'Unknown error',
                message,
                stackTrace: err.stack,
            });
            break;
    }
};

export default errorHandler;
