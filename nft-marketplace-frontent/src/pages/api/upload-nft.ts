import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { tmpdir } from "os";
import { createReadStream } from 'fs';
import pinataSDK from "@pinata/sdk";

const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT_KEY });

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
        const { filepath } = data.image[0];
        const fileUploadaRes = await pinata.pinFileToIPFS(createReadStream(filepath), {
            pinataMetadata: {
                name: "image"
            },
            pinataOptions: {
                cidVersion: 0
            }
        });
        const metadataResponse = await pinata.pinJSONToIPFS({
            name: data.name[0],
            description: data.description[0],
            image: `ipfs://${fileUploadaRes.IpfsHash}`
        })
        res.status(200).json({
            finalLink
                : `ipfs://${metadataResponse.IpfsHash}`
        });
    }
    catch (error) {
        console.error('Error creating NFT:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
export default handler;