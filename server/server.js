const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 8000;

const corsOptions = {
    origin: "https://simplemangareader.netlify.app/",
    methods: ["GET"],
    allowedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true,
}

const server = http.createServer(app);

app.use(express.static(path.join(__dirname, './build')));

app.use(cors(corsOptions));

app.get("/*", cors(corsOptions),(req, res) => {
    res.sendFile(path.join(__dirname + "./build/index.html"));
}); //used in production, comment out if wanting to test


server.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}.`)
});