// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

const password = "mapdev123456";

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === "POST") {
        if (req.body.password === password) {
            res.status(200).json({ name: "Authorized" });
        } else {
            res.status(401).json({ name: "Unauthorized" });
        }
    } else {
        res.status(405).json({ name: "Method Not Allowed" });
    }
}
