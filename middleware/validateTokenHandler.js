import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import AppError from '../util/AppError.js'; // Varsayılan olarak ekledim, senin yapına göre ayarla

export const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]; // "Bearer <token>" 2 parçaya ayırdık

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                // Token hatalı veya süresi dolmuş
                return next(new AppError('User is not authorized', 401));
            }
            // Token geçerli, user bilgisini isteğe ekliyoruz
            req.user = decoded.user;
            console.log('Decoded token:', decoded);

            // Middleware tamam, bir sonraki aşamaya (route/controller) geç
            next();
        });
    } else {
        // Token yok veya "Bearer" ile başlamıyor
        return next(
            new AppError('No token found. User is not authorized', 401)
        );
    }
});
