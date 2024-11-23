const express = require("express");
const route = require("./routes");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

route(app);

app.listen(process.env.PORT, () => {
    console.log(
        `Server is running on port http://localhost:${process.env.PORT}`
    );
});
