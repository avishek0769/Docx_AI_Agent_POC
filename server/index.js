import express from "express";
import multer from "multer";
import cors from "cors";

const app = express();

app.use(express.static("public"))
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;

    res.json({ url: "http://localhost:3000/" + file.filename });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});