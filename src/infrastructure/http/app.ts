import express from "express"
import cors from "cors"
import { publicRoute } from "./routers/public.routes.js";
import { privateRoute } from "./routers/private.routes.js";

const app=express();

app.use(express.json());

app.use(cors());

app.use(publicRoute);

app.use(privateRoute);

export {app};
