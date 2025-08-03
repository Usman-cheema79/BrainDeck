import mongoose from 'mongoose';

const MCQSchema = new mongoose.Schema({
    question: { type: String, required: true, unique: true },
    options: [String],
    correct_answer: String,
    explanation: String,
    difficulty: String,
    category: String,
    level:String
}, { timestamps: true });

export const MCQ = mongoose.models.MCQ || mongoose.model('MCQ', MCQSchema);
