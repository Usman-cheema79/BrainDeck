import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Question' },
  questionText: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
  selectedAnswer: { type: String },
  isCorrect: { type: Boolean, default: false },
  marksObtained: { type: Number, default: 0 }
});


const QuizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  attemptId: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true },
  examType: { type: String, required: true },
  subject: { type: String, required: true },
  difficulty: { type: String, required: true },

  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },

  totalQuestions: { type: Number, required: true },
  solvedQuestions: { type: Number, required: true },
  totalTimeTaken: { type: Number, required: true },

  totalMarks: { type: Number, required: true },
  obtainedMarks: { type: Number, required: true },

  questions: [AnswerSchema],

  isPassed: { type: Boolean },
  percentage: { type: Number },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.QuizResult || mongoose.model('QuizResult', QuizResultSchema);
