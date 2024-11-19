import mongoose from "mongoose";

const web3ProjectSchema = new mongoose.Schema(
    {
        // id: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        // },
        name: {
            type: String,
            required: true,
        },
        path: {
            type: String,
            required: true,
        },
        contractUrl: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        usos: {
            type: [String],
            required: true,
        },
        instrucciones: {
            type: [String],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
export const Web3ProjectModel =
  mongoose.models.Web3Project || mongoose.model('Web3Project', web3ProjectSchema);

// module.exports = ArticleModel;