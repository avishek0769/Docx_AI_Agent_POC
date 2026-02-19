import { useState } from 'react'
import { CKEditorDemo } from './Editor.jsx'
import { useEffect } from 'react'

function App() {
    const [editor, setEditor] = useState(null)
    useEffect(() => {
        if (editor) {
            
        }

    }, [editor])

    return (
        <>
            <div className='flex'>
                <div className='w-[70%]'>
                    <CKEditorDemo setEditor={setEditor} />
                    <div className='flex gap-4'>
                        <button onClick={() => editor && console.log(editor.getData())}>
                            Get data
                        </button>
                        <button onClick={() => editor && editor.execute('bold')}>
                            Make bold
                        </button>
                        <button onClick={() => {
                            editor.model.change(writer => {
                                const insertPosition = editor.model.document.selection.getFirstPosition();
                                writer.insertText("Hello from code!", insertPosition);
                            });
                        }}>
                            Insert text
                        </button>
                        <button onClick={() => {
                            editor.model.change(writer => {
                                const root = editor.model.document.getRoot()
                                const paragraph = root.getChild(2)
                                console.log(paragraph)
                                const start = writer.createPositionAt(paragraph, 5);
                                const end = writer.createPositionAt(paragraph, 17);
                                const range = writer.createRange(start, end);
                                writer.setSelection(range)
                            })
                        }}>
                            Selection
                        </button>
                        {/* It simulates receiving a response from the server with new data to update the editor content and selection. */}
                        <button onClick={() => {
                            editor.model.change(writer => {
                                const root = editor.model.document.getRoot()
                                console.log(Array.from(root.getChildren()).length)
                                const paragraph = root.getChild(3)

                                const start = writer.createPositionAt(paragraph, 2);
                                const end = writer.createPositionAt(paragraph, 4);
                                const range = writer.createRange(start, end);
                                const insertPosition = writer.createPositionAt(start);

                                writer.remove(range);
                                const viewFragment = editor.data.processor.toView('<strong>New HTML</strong><div>HELLOO</div>');
                                const modelFragment = editor.data.toModel(viewFragment);

                                editor.model.insertContent(modelFragment, insertPosition);
                            });
                        }}>
                            Update Selected
                        </button>
                        <button onClick={() => editor.setData(`
                        <h1><span style="color:hsl(0, 75%, 60%); background-color:hsl(0, 10%, 90%);">Heading 1 – Main Title</span></h1>

                        <h2 style="color:#1f2937;">Heading 2 – Section Title</h2>
                        <h3 style="color:#374151;">Heading 3 – Subsection</h3>
                        <h4 style="color:#4b5563;">Heading 4</h4>
                        <h5 style="color:#6b7280;">Heading 5</h5>
                        <h6 style="color:#9ca3af;">Heading 6</h6>

                        <p style="background:#f9fafb; padding:12px; border-radius:6px;">
                        This is a paragraph with
                        <strong style="color:#111827;">bold text</strong>,
                        <em style="color:#374151;">italic text</em>,
                        <a href="#" style="color:#2563eb; font-weight:500;">a sample link</a>,
                        and some <code style="background:#e5e7eb; padding:2px 6px;">inline code</code>.
                        </p>

                        <hr style="border-top:2px dashed #d1d5db; margin:24px 0;" />

                        <h2>Lists Test</h2>

                        <ul style="background:#f9fafb; padding:16px; border-radius:6px;">
                        <li>Unordered item one</li>
                        <li>Unordered item two</li>
                        <li>Unordered item three</li>
                        </ul>

                        <ol style="background:#f3f4f6; padding:16px; border-radius:6px;">
                        <li>Ordered item one</li>
                        <li>Ordered item two</li>
                        <li>Ordered item three</li>
                        </ol>

                        <h2>Blockquote Test</h2>

                        <blockquote
                        style="
                            border-left:5px solid #3b82f6;
                            background:#eff6ff;
                            padding:16px;
                            border-radius:6px;
                        "
                        >
                        This is a blockquote. It should visually stand out with
                        a blue border and background.
                        </blockquote>

                        <h2>Image Test</h2>

                        <img
                        src="https://via.placeholder.com/600x300"
                        alt="Sample Image"
                        style="border-radius:8px; box-shadow:0 10px 20px rgba(0,0,0,0.1);"
                        />

                        <figure
                        style="
                            background:#f9fafb;
                            padding:12px;
                            border-radius:8px;
                        "
                        >
                        <img
                            src="https://via.placeholder.com/500x250"
                            alt="Figure Image"
                            style="border-radius:6px;"
                        />
                        <figcaption style="text-align:center; color:#6b7280;">
                            This is a caption below the image.
                        </figcaption>
                        </figure>

                        <h2>Table Test</h2>

                        <table style="border:2px solid #d1d5db;">
                        <thead>
                            <tr style="background:#e5e7eb;">
                            <th style="padding:10px;">Column One</th>
                            <th style="padding:10px;">Column Two</th>
                            <th style="padding:10px;">Column Three</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td style="padding:10px;">Row 1 Data 1</td>
                            <td style="padding:10px;">Row 1 Data 2</td>
                            <td style="padding:10px;">Row 1 Data 3</td>
                            </tr>
                            <tr style="background:#f9fafb;">
                            <td style="padding:10px;">Row 2 Data 1</td>
                            <td style="padding:10px;">Row 2 Data 2</td>
                            <td style="padding:10px;">Row 2 Data 3</td>
                            </tr>
                        </tbody>
                        </table>

                        <h2>Code Block Test</h2>

                        <pre
                        style="
                            background:#111827;
                            color:#f9fafb;
                            padding:16px;
                            border-radius:8px;
                            overflow-x:auto;
                        "
                        ><code>
                        function greet(name) {
                        return Hello, ${name}!;
                        }

                        console.log(greet("World"));
                        </code></pre>

                        <h2>Alignment Test</h2>

                        <p style="text-align:left;">This text should be left aligned.</p>
                        <p style="text-align:center;">This text should be center aligned.</p>
                        <p style="text-align:right;">This text should be right aligned.</p>

                        <p style="text-align:justify;">
                        This paragraph should be justified. It contains enough text to
                        clearly show justification across multiple lines inside the editor.
                        </p>


                    `)
                        }>
                            set data
                        </button>
                    </div>
                </div>
                <div className='bg-red-100'>
                    <input type="text" className='border outline-0' placeholder='Write prompt' />
                    <button onClick={() => {
                        fetch("http://localhost:3000/api/ask", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                editorData: editor.getData(),
                                prompt: document.querySelector("input").value
                            })
                        })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                        })
                    }} className='bg-blue-500 text-white px-4 py-2 rounded'>Ask</button>
                </div>
            </div>
        </>
    )
}

export default App
