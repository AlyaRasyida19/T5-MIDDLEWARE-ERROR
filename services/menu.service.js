import AppError from "../middlewares/AppError.js";
import daftarMenu from "../data/menu.js";

export async function ambilSemuaMenu(kategori) {
    if (kategori) {
        return daftarMenu.filter(
            menu => menu.kategori.toLowerCase() === kategori.toLowerCase()
        );
    }

    return daftarMenu;
}

export async function ambilMenuById(id) {
    return daftarMenu.find(menu => menu.id === Number(id));
}

export async function tambahMenu(dataMenu) {
    const namaDuplikat = daftarMenu.some(
        menu => menu.nama.toLowerCase() === dataMenu.nama.toLowerCase()
    );

    if (namaDuplikat) {
        throw new AppError(
            "Nama menu sudah terdaftar",
            409,
            "NAMA_DUPLIKAT"
        );
    }

    const idBaru = daftarMenu.length > 0
        ? Math.max(...daftarMenu.map(menu => menu.id)) + 1
        : 1;

    const menuBaru = {
        id: idBaru,
        ...dataMenu
    };

    daftarMenu.push(menuBaru);

    return menuBaru;
}

export async function hapusMenu(id) {
    const index = daftarMenu.findIndex(
        menu => menu.id === Number(id)
    );

    if (index === -1) {
        return false;
    }

    daftarMenu.splice(index, 1);

    return true;
}
