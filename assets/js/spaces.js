// Khai báo các editor ở phạm vi toàn cục
var htmlEditor, cssEditor, jsEditor;

document.addEventListener('DOMContentLoaded', function () {
    // Khởi tạo HTML editor
    htmlEditor = CodeMirror.fromTextArea(document.getElementById('htmlcode'), {
        mode: 'htmlmixed',
        theme: 'monokai',
        lineNumbers: true,
        autoCloseTags: true,
        extraKeys: { "Ctrl-Space": "autocomplete" }, // Bật gợi ý mã bằng Ctrl-Space
        tabSize: 4, // Kích thước tab
        indentUnit: 4 // Số lượng ký tự khi nhấn Enter
    });

    // Khởi tạo CSS editor
    cssEditor = CodeMirror.fromTextArea(document.getElementById('csscode'), {
        mode: 'css',
        theme: 'monokai',
        lineNumbers: true,
        autoCloseBrackets: true,
        extraKeys: { "Ctrl-Space": "autocomplete" }, // Bật gợi ý mã bằng Ctrl-Space
        tabSize: 4, // Kích thước tab
        indentUnit: 4 // Số lượng ký tự khi nhấn Enter
    });

    // Khởi tạo JS editor
    jsEditor = CodeMirror.fromTextArea(document.getElementById('jscode'), {
        mode: 'javascript',
        theme: 'monokai',
        lineNumbers: true,
        autoCloseBrackets: true,
        extraKeys: { "Ctrl-Space": "autocomplete" }, // Bật gợi ý mã bằng Ctrl-Space
        tabSize: 4, // Kích thước tab
        indentUnit: 4 // Số lượng ký tự khi nhấn Enter
    });

    // Tự động gợi ý mã khi người dùng nhập
    htmlEditor.on("inputRead", function(editor, change) {
        if (change.text[0] !== " ") {
            CodeMirror.commands.autocomplete(editor);
        }
    });

    cssEditor.on("inputRead", function(editor, change) {
        if (change.text[0] !== " ") {
            CodeMirror.commands.autocomplete(editor);
        }
    });

    jsEditor.on("inputRead", function(editor, change) {
        if (change.text[0] !== " ") {
            CodeMirror.commands.autocomplete(editor);
        }
    });

    // Auto-run code on input change
    htmlEditor.on('change', runCode);
    cssEditor.on('change', runCode);
    jsEditor.on('change', runCode);

    // Load the code when the page loads
    loadCode();
});

// Function to switch between editors
function openEditor(editorId) {
    var editors = document.querySelectorAll('.code-editor__editor-area');
    editors.forEach(editor => editor.classList.remove('code-editor__editor-area--active'));
    document.getElementById(editorId).classList.add('code-editor__editor-area--active');

    var tablinks = document.querySelectorAll('.code-editor__tab');
    tablinks.forEach(tab => tab.classList.remove('code-editor__tab--active'));
    document.querySelector(`button[onclick="openEditor('${editorId}')"]`).classList.add('code-editor__tab--active');

    if (editorId === 'htmlEditor') {
        htmlEditor.refresh();
    } else if (editorId === 'cssEditor') {
        cssEditor.refresh();
    } else if (editorId === 'jsEditor') {
        jsEditor.refresh();
    }
}

// Function to run the code
function runCode() {
    var htmlCode = htmlEditor.getValue();
    var cssCode = cssEditor.getValue();
    var jsCode = jsEditor.getValue();
    var output = document.getElementById('output');
    var iframeDocument = output.contentDocument || output.contentWindow.document;

    iframeDocument.open();
    iframeDocument.write(htmlCode + "<style>" + cssCode + "</style>" + "<script>" + jsCode + "<\/script>");
    iframeDocument.close();
}

// Function to save the code
function saveCode() {
    var exampleId = new URLSearchParams(window.location.search).get('exampleId') || 'default';
    localStorage.setItem(`htmlCode_${exampleId}`, htmlEditor.getValue());
    localStorage.setItem(`cssCode_${exampleId}`, cssEditor.getValue());
    localStorage.setItem(`jsCode_${exampleId}`, jsEditor.getValue());
    alert('Code saved successfully!');
}

// Function to load the code
function loadCode() {
    var exampleId = new URLSearchParams(window.location.search).get('exampleId') || 'default';
    var savedHtmlCode = localStorage.getItem(`htmlCode_${exampleId}`);
    var savedCssCode = localStorage.getItem(`cssCode_${exampleId}`);
    var savedJsCode = localStorage.getItem(`jsCode_${exampleId}`);

    if (savedHtmlCode) {
        htmlEditor.setValue(savedHtmlCode);
    }
    if (savedCssCode) {
        cssEditor.setValue(savedCssCode);
    }
    if (savedJsCode) {
        jsEditor.setValue(savedJsCode);
    }
}
