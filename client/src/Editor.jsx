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
                ]
            }}
            onReady={(editor) => {
                // editor.execute("")
                setEditor(editor);
            }}
        />
    );
};
