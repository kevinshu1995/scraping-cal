import express from "express";
import { getTournaments } from "~root/lib/scrape/apex.js";

const router = express.Router();

router.use(function (req, res, next) {
    next();
});

router.get("/", function (req, res, next) {
    res.status(200).send({ ok: true });
});

router.get("/apex/tournaments", async function (req, res, next) {
    const { data, error, ...rest } = await getTournaments();
    if (error !== null) {
        res.status(555).send({ ok: false, data, error, ...rest });
    }
    if (data) {
        res.status(200).send({ ok: true, data, error, ...rest });
        return;
    }
});

export default router;

