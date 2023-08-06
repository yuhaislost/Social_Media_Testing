import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxLength: 2200,
        trim: true
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;