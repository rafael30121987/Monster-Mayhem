const express = require("express");
const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
    res.send("<h1> test mayhem server</h1>")
})

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`,))