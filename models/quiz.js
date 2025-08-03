import mongoose from "mongoose"

const quizSchema = new mongoose.Schema({
   subject: String,
  level: String, // e.g., '10th', 'FSc', 'CSS'
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
      explanation: String,
      type: { type: String, enum: ['mcq', 'msq', 'tf', 'short'], default: 'mcq' }
    }
  ],
  createdBy: { type: String }, // system/AI/manual
  createdAt: { type: Date, default: Date.now }

})

const Quiz = mongoose.models.Quizzes || mongoose.model("Quizzes", quizSchema)

export default Quiz