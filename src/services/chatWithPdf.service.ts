import initEmbeddingModel from "../config/embedding.config";

// pdf to text
const pdfParse = require("pdf-parse");

export const extractTextFromPdf = async (pdfBuffer: Buffer) => {
  try {
    const data = await pdfParse(pdfBuffer);
    // pdfBuffer --> the data of text from pdf
    return data.text;
    // return the text data
  }
  catch (error) {
    console.error('Error in extracting text from pdf', error);
    return null;
  }
}

export const chunkText = (text: string, chunkSize = 1000, overlap = 200) => {
  // text --> full data of text
  // chunkSize --> max char per chunk
  // overlap --> no of overlapping char between chunks
  try {
    const chunks = [];
    // make empty array for chunks
    let startIndex = 0;
    // start indexing from 0

    while (startIndex < text.length) {
      // while start index is less then the text.length this loop runs
      const endIndex = startIndex + chunkSize;
      // ending index will be 0 + 1000 = 1000
      let chunk = text.slice(startIndex, endIndex);
      // one chunk = text from 0th char from 1000th of char

      if (endIndex < text.length) {
        const lastPeriod = chunk.lastIndexOf('.');
        const lastNewline = chunk.lastIndexOf('\n');
        const breakPoint = Math.max(lastPeriod, lastNewline);

        if (breakPoint > chunkSize * 0.5) {
          chunk = chunk.slice(0, breakPoint + 1);
          startIndex += breakPoint + 1;
        } else {
          startIndex += chunkSize - overlap;
        }
      } else {
        startIndex = text.length;
      }

      const trimmedChunk = chunk.trim();
      if (trimmedChunk.length > 0) {
        chunks.push(trimmedChunk);
      }
    }

    return chunks;
  }
  catch (error) {
    console.error('Error in chunking text', error);
    return null;
  }
}

export const generateEmbedding = async (text: string) => {
  try{
    const extractor = await initEmbeddingModel();
    const output = await extractor(text, { pooling: 'mean', normalize: true });

    return Array.from(output.data);
  }
  catch(error) {
    console.error('Error in generatig embedding', error);
    return null;
  }
}