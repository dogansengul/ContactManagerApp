class AppError extends Error {
    constructor(message, statusCode) {
        // Error constructor'ını çağır
        super(message);

        // Özel alanlar (Properties)
        this.statusCode = statusCode || 500;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';

        // Hata stack'ini korumak için
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;
