// index.js

import express from "express";
import dotenv from "dotenv";
import ordersRouter from "./routes/orders.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use("/orders", ordersRouter);

app.get("/", (req, res) => {
    res.send("🛒 Orders API is running. Try GET /orders or POST /orders.");
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
