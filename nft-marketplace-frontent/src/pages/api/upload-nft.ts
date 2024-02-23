import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { tmpdir } from "os";
import { File, NFTStorage } from "nft.storage";
import { readFileSync, unlinkSync } from 'fs';
const client = new NFTStorage({ token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGZBMjc4ZGY4MzQ2QjI4ZDQ0RTI1Q0I4NDQ2ZDgzNDVkQkYxMDI2NTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTcwODU1MTU4NjczMiwibmFtZSI6Im5mdC1tYXJrZXRwbGFjZSJ9.pkM1vJRynusDT3GZdmww0TTLOJa5AtYT1oe-Nuf08xI` });

export const config = {
    api: {
        bodyParser: false,
    },
};

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const data: any = await new Promise((resolve, reject) => {
            const form = formidable({ multiples: true, uploadDir: tmpdir() });
            form.parse(req, (err, fields, files) => {
                if (err) reject(err);
                resolve({ ...fields, ...files });
            });
        });
        console.log('Data:', data.image);
        const {
            filepath,
            originalFilename = "image",
            mimetype = "image",
        } = data.image[0];
        console.log(filepath);
        const buffer = readFileSync(filepath);
        const arraybuffer = Uint8Array.from(buffer).buffer;
        const file = new File([arraybuffer], originalFilename, {
            type: mimetype,
        });
        console.log(data.name[0])
        const metadata = await client.store({
            name: data.name[0],
            description: data.description[0],
            image: file,
        });
        unlinkSync(filepath);
        console.log(metadata.url);
        res.status(201).json({ finalLink: metadata.url });
    }
    catch (error) {
        console.error('Error creating NFT:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
export default handler;