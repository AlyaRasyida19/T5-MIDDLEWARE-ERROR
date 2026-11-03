class AppError extends Error {
    constructor(pesan, status, kode) {
        super(pesan);

        this.status = status;
        this.kode = kode;

        this.name = "AppError";
    }
}

export default AppError;