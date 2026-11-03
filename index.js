import "dotenv/config";
import express from "express";

import menuRoutes from "./routes/menu.routes.js";
import { logger } from "./middlewares/logger.js";
import {
    notFound,
    errorHandler
} from "./middlewares/errorHandler.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);

app.use("/menu", menuRoutes);

app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
