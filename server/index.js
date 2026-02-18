import express from "express";

const app = express();

app.use(express.static("public"))

// An endpoint to handle the image uploads as formdata


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});