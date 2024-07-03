import express from "express";
import dotenv from "dotenv";
import { RouterScrape } from "./router/index.js";
import { format } from "@formkit/tempo";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

// print logs
app.use((req, res, next) => {
    const date = new Date();
    const time = format(date, "YYYY/MM/DD HH:mm");
    console.log(`🟢 ${time} [${req.method}] ${req.url}`);
    next();
});

// routes
app.get("/", (req, res) => {
    res.status(200).send({ ok: true, message: "Server is fine. 👍" });
});

app.use("/api/v1/scrape", RouterScrape);

app.listen(PORT, e => {
    console.log(`Server Started at ${PORT}`);
});

export default app;

