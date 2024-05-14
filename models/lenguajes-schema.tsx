import mongoose from "mongoose";

const LenguajesSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
        },
        afinidad: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
export const LenguajesModel =
  mongoose.models.LenguajesModel || mongoose.model('Lenguajes', LenguajesSchema);

// module.exports = ArticleModel;