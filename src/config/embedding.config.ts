const { pipeline } = require("@xenova/transformers");

let featureExtractor: any = null;

const initEmbeddingModel = async () => {
  if(!featureExtractor) {
    console.log('Loading local embedding model');
    featureExtractor = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );
    console.log('Embedding model loaded and ready');
  }

  return featureExtractor;
}

export default initEmbeddingModel;