import 'dotenv/config';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

const getChunkedDocsFromPDF = async () => {
  try{
    const path = process.env.PDF_PATH || '';
    
    const loader = new PDFLoader(path);
    const docs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
    });

    const chunkedDocs = await textSplitter.splitDocuments(docs);
    return chunkedDocs;
  }
  catch(error) {
    console.error('Error in chunking doc from pdf', error);
    return null;
  }
}