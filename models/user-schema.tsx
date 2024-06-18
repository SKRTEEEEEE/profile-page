import mongoose from 'mongoose';

// Definición del esquema de usuario
const userSchema = new mongoose.Schema({
    nick: String,
    address: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
    },
    solicitudAdmin: {
        type: Boolean,
        required: true,
    }
}, { timestamps: true });

// Definición del esquema de administrador
const adminSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// Middleware para manejar cambios en isAdmin en el esquema de usuario
// userSchema.pre('save', async function (this: any, next) {
//     const user = this;

//     if (user.isModified('isAdmin')) {
//         if (user.isAdmin) {
//             // Si isAdmin se establece en true, agregar a la colección de admins
//             await AdminModel.create({ userId: user._id, address: user.address });
//         } else {
//             // Si isAdmin se establece en false, eliminar de la colección de admins
//             await AdminModel.findOneAndDelete({ userId: user._id });
//         }
//     }
//     next();
// });

// userSchema.pre('findOneAndUpdate', async function (this: any, next) {
//     const update: any = this.getUpdate();
//     const isAdmin: boolean = update.isAdmin;

//     if (isAdmin !== undefined) {
//         const userId: mongoose.Types.ObjectId | string = update.$set ? update.$set._id : this.getQuery()._id;
//         const user = await UserModel.findById(userId);

//         if (user) {
//             if (isAdmin) {
//                 // Si isAdmin se establece en true, agregar a la colección de admins
//                 await AdminModel.create({ userId: user._id, address: user.address });
//             } else {
//                 // Si isAdmin se establece en false, eliminar de la colección de admins
//                 await AdminModel.findOneAndDelete({ userId: user._id });
//             }
//         }
//     }
//     next();
// });

// Exportar los modelos
export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
export const AdminModel = mongoose.models.Admin || mongoose.model('Admin', adminSchema);
