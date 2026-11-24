import Recipe from "../models/Recipe.js";

export const createRecipe = async (req, res) => {
    try {
        const {
            name,
            category,
            area,
            image,
            instructions
        } = req.body;

        if (!name || !name.trim()) {
            return res.status(400).json({
                message: "Nama resep wajib diisi"
            });
        }

        const recipe = await Recipe.create({
            name: name.trim(),
            category,
            area,
            image,
            instructions
        });

        return res.status(201).json({
            message: "Resep berhasil ditambahkan",
            data: recipe
        });
    } catch (error) {
        return res.status(500).json({
            message: "Gagal menambahkan resep",
            error: error.message
        });
    }
};

export const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.findAll({
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json({
            message: "Data resep berhasil diambil",
            total: recipes.length,
            data: recipes
        });
    } catch (error) {
        return res.status(500).json({
            message: "Gagal mengambil data resep",
            error: error.message
        });
    }
};

export const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findByPk(id);

        if (!recipe) {
            return res.status(404).json({
                message: "Resep tidak ditemukan"
            });
        }

        return res.status(200).json({
            message: "Detail resep berhasil diambil",
            data: recipe
        });
    } catch (error) {
        return res.status(500).json({
            message: "Gagal mengambil detail resep",
            error: error.message
        });
    }
};

export const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findByPk(id);

        if (!recipe) {
            return res.status(404).json({
                message: "Resep tidak ditemukan"
            });
        }

        const {
            name,
            category,
            area,
            image,
            instructions
        } = req.body;

        if (name !== undefined && !name.trim()) {
            return res.status(400).json({
                message: "Nama resep tidak boleh kosong"
            });
        }

        await recipe.update({
            name: name === undefined ? recipe.name : name.trim(),
            category: category === undefined ? recipe.category : category,
            area: area === undefined ? recipe.area : area,
            image: image === undefined ? recipe.image : image,
            instructions: instructions === undefined
                ? recipe.instructions
                : instructions
        });

        return res.status(200).json({
            message: "Resep berhasil diperbarui",
            data: recipe
        });
    } catch (error) {
        return res.status(500).json({
            message: "Gagal memperbarui resep",
            error: error.message
        });
    }
};

export const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Recipe.destroy({
            where: {
                id
            }
        });

        if (deleted === 0) {
            return res.status(404).json({
                message: "Resep tidak ditemukan"
            });
        }

        return res.status(200).json({
            message: "Resep berhasil dihapus"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Gagal menghapus resep",
            error: error.message
        });
    }
};