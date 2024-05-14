import mongoose from "mongoose";

const LenguajesSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
        },
        afinidad: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
export const LenguajesModel =
  mongoose.models.Lenguajes || mongoose.model('Lenguajes', LenguajesSchema);

// module.exports = ArticleModel;