
import AppError from "../middlewares/AppError.js";
import {
    ambilSemuaMenu,
    ambilMenuById,
    tambahMenu,
    hapusMenu
} from "../services/menu.service.js";

export async function getSemuaMenu(req, res, next) {
    try {
        const { kategori } = req.query;
        const dataMenu = await ambilSemuaMenu(kategori);

        res.status(200).json({
            pesan: "Daftar menu berhasil diambil",
            data: dataMenu
        });
    } catch (error) {
        next(error);
    }
}

export async function getMenuById(req, res, next) {
    try {
        const { id } = req.params;
        const menu = await ambilMenuById(id);

        if (!menu) {
            throw new AppError(
                "Menu tidak ditemukan",
                404,
                "NOT_FOUND"
            );
        }

        res.status(200).json({
            pesan: "Menu berhasil ditemukan",
            data: menu
        });
    } catch (error) {
        next(error);
    }
}

export async function postMenu(req, res, next) {
    try {
        const menuBaru = await tambahMenu(req.body);

        res.status(201).json({
            pesan: "Menu berhasil ditambahkan",
            data: menuBaru
        });
    } catch (error) {
        next(error);
    }
}

export async function deleteMenu(req, res, next) {
    try {
        const berhasil = await hapusMenu(req.params.id);

        if (!berhasil) {
            throw new AppError(
                "Menu tidak ditemukan",
                404,
                "NOT_FOUND"
            );
        }

        res.status(204).end();
    } catch (error) {
        next(error);
    }
}
