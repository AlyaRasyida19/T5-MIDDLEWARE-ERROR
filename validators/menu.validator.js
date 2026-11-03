
import AppError from "../middlewares/AppError.js";
import Joi from "joi";

const menuSchema = Joi.object({
    nama: Joi.string()
        .min(3)
        .max(50)
        .required()
        .messages({
            "string.base": "Nama harus berupa teks",
            "string.min": "Nama minimal 3 karakter",
            "string.max": "Nama maksimal 50 karakter",
            "any.required": "Nama wajib diisi",
            "string.empty": "Nama tidak boleh kosong"
        }),

    harga: Joi.number()
        .integer()
        .min(1000)
        .max(100000)
        .required()
        .messages({
            "number.base": "Harga harus berupa angka",
            "number.integer": "Harga harus berupa bilangan bulat",
            "number.min": "Harga minimal 1000",
            "number.max": "Harga maksimal 100000",
            "any.required": "Harga wajib diisi"
        }),

    kategori: Joi.string()
        .valid("makanan", "minuman", "camilan")
        .required()
        .messages({
            "any.only": "Kategori harus makanan, minuman, atau camilan",
            "any.required": "Kategori wajib diisi",
            "string.empty": "Kategori tidak boleh kosong"
        }),

    tersedia: Joi.boolean()
        .default(true)
        .messages({
            "boolean.base": "Tersedia harus berupa true atau false"
        })
});

export function validasiMenu(req, res, next) {
    const { error, value } = menuSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        const kesalahan = error.details.map(
            detail => detail.message
        );

        const err = new AppError(
            "Data menu tidak valid",
            422,
            "VALIDATION_ERROR"
        );

        err.details = kesalahan;

        return next(err);
    }

    req.body = value;
    next();
}
