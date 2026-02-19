import express, { json } from "express";
import multer from "multer";
import cors from "cors";

const app = express();

app.use(express.static("public"))
app.use(cors());
app.use(json());

// Example format for the AI to respond. (If editting happens step by step through editor APIs)
// const exampleFormat = [
//     {
//         task: "bold | heading | italic | underline | strikethrough | subscript | superscript | alignment | list",
//         selection: {
//             childIndex: 0,
//             start: 0,
//             end: 5
//         },
//         data: null
//     },
//     {
//         task: "rewrite",
//         selection: {
//             childIndex: 2,
//             start: 10,
//             end: 50
//         },
//         data: {
//             // Text data
//             text: "New updated text to replace the selected text",

//             // Tables
//             row: 3,
//             column: 2,
//             tableId: "table-1",

//             // Image
//             imageUrl: "https://example.com/image.jpg",

//             // Color code for bg or text
//             color: "#ff0000",
//         }
//     },
//     {},
//     {},
// ]

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

app.post("/api/ask", (req, res) => {

})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});