import * as mongoose from 'mongoose';

export const ProjectSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    year: Number,
    langs: String,
    image: String
});
