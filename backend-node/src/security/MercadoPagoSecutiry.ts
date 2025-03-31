import SignatureError from "../errors/SignatureError";
import crypto from "crypto";

import 'dotenv/config';

export default class MercadoPagoSecurity{

    public async verifySignature(xSignature: string | null | undefined, xRequestId: string | null | undefined, request: any){
        
        if(!xSignature || !xRequestId){
            throw new SignatureError("Missing signature");
        }

        const signatureParts = xSignature.split(",");
        let ts = "";
        let v1 = "";
        signatureParts.forEach((part) => {
            const [key, value] = part.split("=");

            if (key.trim() === "ts") {
                ts = value.trim();
            } else if (key.trim() === "v1") {
                v1 = value.trim();
            }
        });

        if(!ts || !v1){
            throw new SignatureError("Invalid signature");
        }


        const urlFull = `${request.protocol}:${request.get("host")}${request.originalUrl}`;
        const url = new URL(urlFull);
        console.log("Teste: " + url);
        const dataId = url.searchParams.get("data.id");

        let manifest = "";
        if (dataId) {
          manifest += `id:${dataId};`;
        }

        if (xRequestId) {
            manifest += `request-id:${xRequestId};`;
        }

        manifest += `ts:${ts};`;

        const secret = process.env.MERCADO_PAGO_WEBHOOK_SECRET as string;
        console.log("Secret: " + secret);
        const hmac = crypto.createHmac("sha256", secret);
        hmac.update(manifest);
        const generatedHash = hmac.digest("hex");

        if (generatedHash !== v1) {
            throw new SignatureError("Invalid signature");
        }
    }
}