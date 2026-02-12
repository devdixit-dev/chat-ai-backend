import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fileName: {
    type: String
  },
  chunksCreated: {
    type: Number
  },
  totalCharacters: {
    type: Number
  },
  embeddingModel: {
    type: String,
    default: 'Xenova/all-MiniLM-L6-v2 (local)'
  }
});

const Collection = mongoose.model('collection', collectionSchema);

export default Collection;