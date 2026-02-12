import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  text: [{
    type: String,
    required: true
  }],
  embedding: [{
    type: String,
    required: true
  }],
  metadata: {
    chunkIndex: {
      type: Number,
    },
    totalChunks: {
      type: Number
    },
    fileName: {
      type: String
    },
    uploadedAt: {
      type: Date,
      default: Date.now()
    }
  }
});

const Document = mongoose.model('Document', documentSchema);

export default Document;