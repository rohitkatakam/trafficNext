import { NextApiRequest, NextApiResponse } from "next";
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({error: 'Method not allowed'});
    }

    const form = formidable();
    form.uploadDir = path.join(process.cwd(), 'tmp');
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({error: 'Upload failed'});
        }

        const file = files.file as formidable.File;
        const filePath = file.filePath;
        res.status(200).json({filePath});
    })
}