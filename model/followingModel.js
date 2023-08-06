import mongoose from 'mongoose';

const followingSchema = new mongoose.Schema({
    followingUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    followedUser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

followingSchema.index({followingUser : 1, followedUser : 1}, {unique: true});

const Following = mongoose.model('following', followingSchema);

export default Following;
