import AppError from "./AppError.js";

export function cekApiKey(req, res, next) {
    const apiKey = req.headers["x-api-key"];

    if (!process.env.API_KEY) {
        return next(
            new AppError(
                "Konfigurasi API Key belum tersedia",
                500,
                "SERVER_CONFIG_ERROR"
            )
        );
    }

    if (apiKey !== process.env.API_KEY) {
        return next(
            new AppError(
                "API Key tidak valid",
                401,
                "UNAUTHORIZED"
            )
        );
    }

    next();
}