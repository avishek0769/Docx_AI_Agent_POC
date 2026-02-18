import { useState } from 'react'
import { CKEditorDemo } from './Editor.jsx'
import { useEffect } from 'react'

function App() {
    const [editor, setEditor] = useState(null)
    useEffect(() => {
        console.log(editor?.getData())
    }, [editor])

    return (
        <>
            <CKEditorDemo setEditor={setEditor} />
            <button onClick={() => editor && console.log(editor.getData())}>
                Get data
            </button>
            <button onClick={() => editor.setData(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <title>Simple Image Page</title>
                </head>
                <body>

                    <h1>My Public URL Image</h1>
                    
                    <p>This image is loaded from a remote web server:</p>

                    <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=400&h=600" 
                        alt="Nature Landscape" 
                        width="400" 
                        height="600">

                </body>
                </html>`)
            }>
                set data
            </button>
        </>
    )
}

export default App
