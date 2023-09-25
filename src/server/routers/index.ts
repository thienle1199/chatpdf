import { z } from 'zod';
import { procedure, router } from '../trpc';
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import axios from "axios";
import { createWriteStream } from "fs"
import { Readable } from 'stream';


export const appRouter = router({
  createChat: procedure.input(z.object({
    fileUrl: z.string(),
    pathName: z.string()
  })).mutation(async (opt) => {
    const docs = await readPdfFile(opt.input.fileUrl, opt.input.pathName)
    console.log({ docs })
    return { docs }
  })
});

const readPdfFile = async (url: string, fileName: string) => {
  try {
    const _filePath = await downloadFile(url, fileName)

    const loader = new PDFLoader(_filePath);

    const docs = await loader.load()

    console.log({ docs })

    return docs
  } catch (error) {
    console.log(error)
    throw error
  }



}


async function downloadFile(url: string, fileName: string): Promise<string> {
  const filePath = `${Date.now()}-${fileName}`

  try {
    const response = await axios.get<Readable>(url, {
      responseType: 'stream'
    });

    // console.log('response', response.data)

    const writer = createWriteStream(filePath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        return resolve(filePath)
      });
      writer.on('error', reject);
    });

  } catch (error) {
    console.error('Error downloading file: ', error);
    throw error
  }
}


// export type definition of API
export type AppRouter = typeof appRouter;