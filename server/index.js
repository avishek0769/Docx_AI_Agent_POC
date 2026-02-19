import dotenv from "dotenv";
dotenv.config();
import express, { json } from "express";
import multer from "multer";
import cors from "cors";
import { OpenAI } from "openai";

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY
});

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

app.post("/api/ask", async (req, res) => {
    const { editorData, prompt } = req.body;
    console.log("Requested")

    try {
        const response = await openai.chat.completions.create({
            model: "google/gemini-2.5-flash-lite",
            messages: [
                {
                    role: "system",
                    content: `You generate structured editing instructions for a CKEditor 5 document.
                    Input:
                    - Current editor content as raw HTML (from editor.getData()).
                    - A user instruction describing what to modify.

                    Output:
                    Return ONLY valid JSON (no markdown, no explanations).
                    Return an array of tasks in this format:
                    [
                        {
                            "childIndex": number,
                            "startOffset": number,
                            "endOffset": number,
                            "newHtml": string
                        }
                    ]

                    STRUCTURE RULES:

                    The provided HTML represents only the editor body content (no <html>, <head>, or <body>).

                    Each top-level block element is a root child:
                    <p>, <h1>-<h6>, <blockquote>, <ul>, <ol>, <table>, <figure>, etc.

                    Child indexes start from 0 and are counted in order.

                    Example:
                    <p>A</p>
                    <p>B</p>
                    <h1>C</h1>

                    childIndex:
                    0 → first <p>
                    1 → second <p>
                    2 → <h1>

                    OFFSET RULES:

                    Offsets are character positions inside the TEXT CONTENT of the selected block.

                    - Count only visible text.
                    - Do NOT count HTML tags.
                    - Spaces count.
                    - endOffset is exclusive.
                    - Must not exceed text length.

                    If replacing entire block:
                    startOffset = 0
                    endOffset = full text length.

                    newHtml RULES:

                    - Must NOT include <html>, <head>, or <body>.
                    - Must be valid inside the selected block.
                    - Plain text for rewrite.
                    - Wrapped HTML for formatting (e.g., <strong>text</strong>).

                    STYLE RESTRICTIONS:

                    Only two inline CSS properties are allowed:
                    - color
                    - background-color

                    Both must use HSL format only:
                    style="color:hsl(...)"  
                    style="background-color:hsl(...)"

                    No other CSS properties are allowed.
                    No RGB, HEX, or named colors.
                    No classes.
                    No external styles.

                    REQUIREMENTS:

                    1. Determine childIndex from the provided HTML.
                    2. Compute correct offsets from visible text only.
                    3. Follow CSS restrictions strictly.
                    4. Return tasks sorted in execution order.
                    5. Return the JSON only, no markdown or explanations.

                    OUTPUT EXAMPLE (strict):

                    If the document is:
                    <p>Hello world</p>
                    <p>Second paragraph</p>

                    And the instruction is:
                    Replace "world" with "<strong>Universe</strong>"

                    You must return EXACTLY in this format:
                    [
                    {
                        "childIndex": 0,
                        "startOffset": 6,
                        "endOffset": 11,
                        "newHtml": "<strong>Universe</strong>"
                    }
                    ]

                    Do NOT wrap the JSON in markdown.
                    Do NOT add text before or after.
                    Return ONLY the raw JSON array.`
                },
                {
                    role: "user",
                    content: `Here is the current content of the editor in HTML format: ${editorData}.
                        Based on this content, perform the following task: ${prompt}. 
                        Respond only in the specified format without any explanations.
                    `
                }
            ],
            max_completion_tokens: 52000
        })

        // Sample response for testing without calling the API
        // return res.json([
        //     {
        //         childIndex: 0,
        //         startOffset: 0,
        //         endOffset: 5,
        //         newHtml: "<strong>Hello</strong>"
        //     },
        //     {
        //         childIndex: 1,
        //         startOffset: 0,
        //         endOffset: 11,
        //         newHtml: "<em>world!!!</em>"
        //     }
        // ])
        if(response.choices[0].message.content.startsWith("```json")) {
            console.log(response.choices[0].message.content.slice(7, -3).replaceAll("\n", ""))
            return res.json(
                JSON.parse(response.choices[0].message.content.slice(7, -3).replaceAll("\n", ""))
            );
        }
        return res.json(JSON.parse(response.choices[0].message.content));
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});