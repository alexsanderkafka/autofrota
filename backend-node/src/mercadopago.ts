import { MercadoPagoConfig } from "mercadopago";

import 'dotenv/config';

export const  client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN as string})