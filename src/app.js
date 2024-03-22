const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/products.router.js")

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.send("Funcionaaa");
})

app.use("/api", productsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto http://localhost:${PUERTO}`);
})