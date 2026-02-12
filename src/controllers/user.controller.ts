import { Request, Response } from 'express';
import responseHandler from '../services/responseHandler.service';
import { chunkText, extractTextFromPdf } from '../services/chatWithPdf.service';
import initEmbeddingModel from '../config/embedding.config';
import Document from '../models/document.model';
import Collection from '../models/collection.model';

export const uploadPdfPipeline = async (req: Request, res: Response) => {
  try{
    if(!req.file) return responseHandler(res, 400, false, 'No PDF file uploaded');

    const userId = (req as any).user.id || 'default';

    // 1. extract text from pdf buffer data
    const text: string = await extractTextFromPdf(req.file.buffer);
    if(!text || text.trim().length === 0) return responseHandler(res, 400, false, 'PDF contains no extractable text');

    // 2. make chunks from text
    const chunks = chunkText(text) || [];

    // 3. init the embedding model
    await initEmbeddingModel();

    // 4. make embeddings from chunk
    const documents = [];
    for(let i = 0; i < chunks?.length; i++) {
      const chunk = chunks[i];

      const extractor = await initEmbeddingModel();
      const output = await extractor(
        chunk, 
        { pooling: 'mean', normalize: true }
      );

      const embedding = Array.from(output.data).map(String);

      documents.push(await Document.create({
        userId,
        text: [chunk],
        embedding,
        metadata: {
          chunkIndex: i,
          totalChunks: chunks.length,
          fileName: req.file.originalname,
          uploadedAt: new Date()
        }
      }));
    }

    await Collection.insertMany(documents);

    return responseHandler(
      res, 201, true, 'PDF processed and stored successfully',
      {
        userId,
        fileName: req.file.originalname,
        chunksCreated: chunks.length,
        totalCharacters: text.length,
        embeddingModel: 'Xenova/all-MiniLM-L6-v2 (local)'
      }
    );
  }
  catch(error) {
    console.error('Error in uploading document pipeline', error);
    return responseHandler(res, 500, false, 'Internal server error');
  }
}