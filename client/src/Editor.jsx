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
        LinkEditing, PictureEditing,
    } = cloud.CKEditor;

    const { FormatPainter } = cloud.CKEditorPremiumFeatures;

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
            data={'<p>Hello world!</p>'}
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
                    Image, ImageToolbar, LinkEditing, PictureEditing, ImageUpload,
                    FormatPainter
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
                ],
                extraPlugins: [function (editor) {
                    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                        return new MyUploadAdapter(loader);
                    }
                }]
            }}
            onReady={(editor) => {
                // editor.execute("")
                setEditor(editor);
            }}
        />
    );
};
