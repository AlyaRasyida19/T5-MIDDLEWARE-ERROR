export function logger(req, res, next) {
    const waktuMulai = Date.now();

    res.on("finish", () => {
        const durasi = Date.now() - waktuMulai;

        console.log(
            `${req.method} ${req.originalUrl} -> ${res.statusCode} (${durasi} ms)`
        );
    });

    next();
}
