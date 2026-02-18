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
            <div className='flex'>
                <div className='w-[70%]'>
                    <CKEditorDemo setEditor={setEditor} />
                    <button onClick={() => editor && console.log(editor.getData())}>
                        Get data
                    </button>
                    <button onClick={() => editor.setData(`
                        <h1>Heading 1 - Main Title</h1>
                        <h2>Heading 2 - Section Title</h2>
                        <h3>Heading 3 - Subsection</h3>
                        <h4>Heading 4</h4>
                        <h5>Heading 5</h5>
                        <h6>Heading 6</h6>

                        <p>
                        This is a paragraph with <strong>bold text</strong>, 
                        <em>italic text</em>, 
                        <a href="#">a sample link</a>, 
                        and some <code>inline code</code>.
                        </p>

                        <hr />

                        <h2>Lists Test</h2>

                        <ul>
                        <li>Unordered item one</li>
                        <li>Unordered item two</li>
                        <li>Unordered item three</li>
                        </ul>

                        <ol>
                        <li>Ordered item one</li>
                        <li>Ordered item two</li>
                        <li>Ordered item three</li>
                        </ol>

                        <h2>Blockquote Test</h2>

                        <blockquote>
                        This is a blockquote. It should have a left border,
                        background color, and italic text.
                        </blockquote>

                        <h2>Image Test</h2>

                        <img width="200px" height="100px" src="https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg" alt="Sample Image" />

                        <figure>
                        <img  src="https://via.placeholder.com/500x250" alt="Figure Image" />
                        <figcaption>This is a caption below the image.</figcaption>
                        </figure>

                        <h2>Table Test</h2>

                        <table>
                        <thead>
                            <tr>
                            <th>Column One</th>
                            <th>Column Two</th>
                            <th>Column Three</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>Row 1 Data 1</td>
                            <td>Row 1 Data 2</td>
                            <td>Row 1 Data 3</td>
                            </tr>
                            <tr>
                            <td>Row 2 Data 1</td>
                            <td>Row 2 Data 2</td>
                            <td>Row 2 Data 3</td>
                            </tr>
                        </tbody>
                        </table>

                        <h2>Code Block Test</h2>

                        <pre><code>
                        function greet(name) {
                        return Hello, name;
                        }

                        console.log(greet("World"));
                        </code></pre>

                        <h2>Alignment Test</h2>

                        <p class="text-left">This text should be left aligned.</p>
                        <p class="text-center">This text should be center aligned.</p>
                        <p class="text-right">This text should be right aligned.</p>
                        <p class="text-justify">
                        This paragraph should be justified. It contains enough text to clearly show the justification effect across multiple lines inside the content container.
                        </p>

                    `)
                    }>
                        set data
                    </button>
                </div>
                <div className='bg-red-100'>
                    1
                </div>
            </div>
        </>
    )
}

export default App
