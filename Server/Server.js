const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(
	cors({
		origin: "*",
	})
);
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/upload", require("./Routes/Upload"));
app.use("/auth", require("./Routes/Auth"));
app.use("/users", require("./Routes/Users"));
app.use("uploads", express.static(path.join(__dirname, "public")));

mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(() => {
		console.log("Connected to Database");
		app.listen(PORT, () => {
			console.log(`Listening at port: ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
