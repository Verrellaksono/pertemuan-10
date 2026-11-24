import express from "express";
import dotenv from "dotenv";

import sequelize from "./config/database.js";
import Recipe from "./models/Recipe.js";
import recipeRoutes from "./routes/recipeRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/recipes", recipeRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "API Katalog Resep Makanan"
    });
});

const PORT = process.env.PORT || 3000;
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database berhasil terhubung!");

        await sequelize.sync();
        console.log("Model berhasil disinkronisasi!");

        app.listen(PORT, () => {
            console.log(`Server berjalan pada port ${PORT}`);
        });
    } catch (error) {
        console.error("Gagal menjalankan aplikasi:", error.message);
    }
};
startServer();