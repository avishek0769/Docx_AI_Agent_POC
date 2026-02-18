import { CKEditor, useCKEditorCloud } from '@ckeditor/ckeditor5-react';
import { LICENSE_KEY } from '../constant';


export const CKEditorDemo = ({ setEditor }) => {
    const cloud = useCKEditorCloud({
        version: '47.5.0',
        premium: true
    });

    if (cloud.status === 'error') {
        return <div>Error!</div>;
    }

    if (cloud.status === 'loading') {
        return <div>Loading...</div>;
    }

    const {
        ClassicEditor,
        Essentials,
        Paragraph,
        Bold,
        Italic,
        Underline,
        Strikethrough,
        Subscript,
        Superscript,
        Heading,
        FontFamily,
        FontSize,
        FontColor,
        FontBackgroundColor,
        Alignment,
        Link,
        List,
        Indent,
        IndentBlock,
        BlockQuote,
        Table,
        TableToolbar,
        Image,
        ImageToolbar,
        ImageUpload,
        PictureEditing, CloudServices
    } = cloud.CKEditor;

    const { FormatPainter, ExportPdf, ExportWord } = cloud.CKEditorPremiumFeatures;

    function MyUploadAdapter(loader) {
        this.loader = loader;
    }

    MyUploadAdapter.prototype.upload = function () {
        return this.loader.file.then(file => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file);

                fetch('http://localhost:3000/api/upload', {
                    method: 'POST',
                    body: formData
                })
                    .then(response => response.json())
                    .then(data => {
                        resolve({
                            default: data.url
                        });
                    })
                    .catch(error => {
                        reject(error);
                    });
            });
        });
    };

    return (
        <CKEditor
            editor={ClassicEditor}
            data={'<h1>Hello world!</h1>'}
            config={{
                licenseKey: LICENSE_KEY,
                plugins: [
                    Essentials, Paragraph, Bold, Italic,
                    Underline, Strikethrough,
                    Subscript, Superscript,
                    Heading,
                    FontFamily, FontSize, FontColor, FontBackgroundColor,
                    Alignment,
                    Link,
                    List,
                    Indent, IndentBlock,
                    BlockQuote,
                    Table, TableToolbar,
                    Image, ImageToolbar, PictureEditing, ImageUpload,
                    FormatPainter, ExportPdf, ExportWord, CloudServices
                ],
                toolbar: [
                    'undo', 'redo',
                    '|',
                    'heading',
                    '|',
                    'bold', 'italic', 'underline', 'strikethrough',
                    'subscript', 'superscript',
                    '|',
                    'fontFamily', 'fontSize',
                    'fontColor', 'fontBackgroundColor',
                    '|',
                    'alignment',
                    '|',
                    'bulletedList', 'numberedList',
                    'indent', 'outdent',
                    '|',
                    'link', 'blockQuote',
                    '|',
                    'insertTable', 'imageUpload',
                    '|',
                    'formatPainter',
                    '|',
                    'exportPdf',
                    'exportWord'
                ],
                extraPlugins: [function (editor) {
                    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                        return new MyUploadAdapter(loader);
                    }
                }],
                exportPdf: {
                    stylesheets: [
                        '/styles.css'
                    ],
                    fileName: 'document.pdf'
                },
                exportWord: {
                    fileName: 'document.docx'
                },
                heading: {
                    options: [
                        {
                            model: 'paragraph',
                            title: 'Paragraph',
                            class: 'ck-heading_paragraph'
                        },
                        {
                            model: 'heading1',
                            view: 'h1',
                            title: 'Heading 1',
                            class: 'ck-heading_heading1'
                        },
                        {
                            model: 'heading2',
                            view: 'h2',
                            title: 'Heading 2',
                            class: 'ck-heading_heading2'
                        },
                        {
                            model: 'heading3',
                            view: 'h3',
                            title: 'Heading 3',
                            class: 'ck-heading_heading3'
                        }
                    ]
                },

            }}
            onReady={(editor) => {
                // editor.model.change(writer => {
                //     const root = editor.model.document.getRoot()
                //     console.log(root.getChildren())
                //     const range = writer.createRangeIn(root)
                //     console.log(range)
                // })
                setEditor(editor);
            }}
        />
    );
};
