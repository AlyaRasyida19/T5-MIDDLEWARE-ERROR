import AppError from "./AppError.js";

export function notFound(req, res, next) {
    next(
        new AppError(
            `Rute ${req.method} ${req.originalUrl} tidak ditemukan`,
            404,
            "ROUTE_NOT_FOUND"
        )
    );
}

export function errorHandler(err, req, res, next) {
    const status = err.status || 500;

    if (status >= 500) {
        console.error(err.stack || err);

        return res.status(500).json({
            error: {
                pesan: "Terjadi kesalahan pada server",
                kode: "INTERNAL_SERVER_ERROR"
            }
        });
    }

    return res.status(status).json({
        error: {
            pesan: err.message,
            kode: err.kode || "APPLICATION_ERROR",
            ...(err.details && { details: err.details })
        }
    });
}