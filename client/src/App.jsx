import { useState } from 'react'
import { CKEditorDemo } from './Editor.jsx'
import { useEffect } from 'react'

function App() {
    const [editor, setEditor] = useState(null)

    const editDocumentContent = (childIndex, startOffset, endOffset, newHtml) => {
        editor.model.change(writer => {
            const root = editor.model.document.getRoot()
            console.log(Array.from(root.getChildren()).length)
            const paragraph = root.getChild(childIndex)

            const start = writer.createPositionAt(paragraph, startOffset);
            const end = writer.createPositionAt(paragraph, endOffset);
            const range = writer.createRange(start, end);
            const insertPosition = writer.createPositionAt(start);

            writer.remove(range);
            const viewFragment = editor.data.processor.toView(newHtml);
            const modelFragment = editor.data.toModel(viewFragment);

            editor.model.insertContent(modelFragment, insertPosition);
        });
    }

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
                                console.log("Root Children --> ", Array.from(root.getChildren()).length)
                                Array.from(root.getChildren()).forEach((child, i) => {
                                    console.log(i, child.name)
                                })
                                
                                const paragraph = root.getChild(6)
                                const start = writer.createPositionAt(paragraph, 0);
                                const end = writer.createPositionAt(paragraph, 20);
                                const range = writer.createRange(start, end);
                                const insertPosition = writer.createPositionAt(start);

                                writer.remove(range);
                                const viewFragment = editor.data.processor.toView("<li style=\"background-color:hsl(180, 100%, 90%);\">Rich in essential nutrients</li>");
                                const modelFragment = editor.data.toModel(viewFragment);

                                editor.model.insertContent(modelFragment, insertPosition);
                            });
                        }}>
                            Update Selected
                        </button>
                        <button onClick={() => editor.setData(`
                            <h1>Cloud IDE Platform</h1>
                            <p>Our cloud platform enables real time collaboration for developers worldwide.</p>
                            <p>It supports JavaScript, Python, and Go with instant preview and containerized execution.</p>
                            <p>This is very important for modern distributed teams.</p>
                            <blockquote>Security and performance must always come first.</blockquote>
                            <ul>
                            <li>Live collaboration</li>
                            <li>Version control</li>
                            <li>AI code suggestions</li>
                            </ul>
                            <p>This is <strong>very</strong> scalable and reliable.</p>
                        `)
                        }>
                            test data
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
                            for (const task of data) {
                                editDocumentContent(task.childIndex, task.startOffset, task.endOffset, task.newHtml)
                            }
                        })
                    }} className='bg-blue-500 text-white px-4 py-2 rounded'>Ask</button>
                </div>
            </div>
        </>
    )
}

export default App
