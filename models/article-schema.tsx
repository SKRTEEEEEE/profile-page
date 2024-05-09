import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: String,
    content: String,
    cover: String,
    author: String,
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Referencia al modelo User
      required: true,
    },
    cat: String,
    img: String,
    gif: String,
    audio: String,
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', // Referencia al modelo Comment
      },
    ],
    fixedComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', // Referencia al modelo Comment
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencia al modelo User
      },
    ],

    reposts: {
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Referencia al modelo User
            required: true,
          },
          username: {
            type: String,
            required: true,
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const ArticleModel =
  mongoose.models.Article || mongoose.model('Article', articleSchema);

// module.exports = ArticleModel;