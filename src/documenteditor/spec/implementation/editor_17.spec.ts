import { DocumentEditor } from '../../src/document-editor/document-editor';
import { TableOfContentsSettings, ParagraphWidget, BookmarkDialog, BookmarkElementBox, BorderSettings, TableWidget, TableRowWidget } from '../../src/document-editor/index';
import { createElement } from '@syncfusion/ej2-base';
import { Editor, EditorHistory, TableCellWidget, TextElementBox, TextHelper, RtlInfo, ListTextElementBox, LineWidget, TabElementBox, TextPosition, WSectionFormat } from '../../src/index';
import { TestHelper } from '../test-helper.spec';
import { Selection, PageLayoutViewer } from '../../src/index';
/**
 * Insert comment validation
 */
describe('Insert comment', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableLocalPaste: false });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('In header footer', () => {
console.log('In header footer');
        editor.selection.goToHeader();
        editor.editor.insertComment();
        expect(editor.documentHelper.comments.length).toBe(0);
    });
});


//Restrict editing test cases



describe('Open restrict document with para mark at end of table cell', () => {
    let editor: DocumentEditor = undefined;
    let restrictJson: string = '{"sections":[{"blocks":[{"rows":[{"rowFormat":{"allowBreakAcrossPages":true,"isHeader":false,"height":0.0,"heightType":"AtLeast","borders":{"left":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"right":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"top":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"bottom":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"vertical":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"horizontal":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"diagonalDown":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"diagonalUp":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false}}},"cells":[{"blocks":[{"paragraphFormat":{"styleName":"Normal"},"inlines":[{"name":"_GoBack","bookmarkType":0},{"editRangeId":"76489596","columnFirst":0,"columnLast":0,"group":"everyone"},{"editRangeId":"1283593602","columnFirst":1,"columnLast":1,"group":"everyone"},{"name":"_GoBack","bookmarkType":1},{"editRangeId":"76489596","editableRangeStart":{"editRangeId":"76489596","columnFirst":0,"columnLast":0,"group":"everyone"}},{"editRangeId":"1283593602","editableRangeStart":{"editRangeId":"1283593602","columnFirst":1,"columnLast":1,"group":"everyone"}}]}],"cellFormat":{"columnSpan":1,"rowSpan":1,"preferredWidth":467.5,"preferredWidthType":"Point","verticalAlignment":"Top","isSamePaddingAsTable":true,"borders":{"left":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"right":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"top":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"bottom":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"vertical":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"horizontal":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"diagonalDown":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"diagonalUp":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false}}}}]}],"title":null,"description":null,"tableFormat":{"allowAutoFit":true,"leftIndent":0.0,"tableAlignment":"Left","preferredWidthType":"Auto","borders":{"left":{"lineStyle":"Single","lineWidth":0.5,"shadow":false,"space":0.0,"hasNoneStyle":false},"right":{"lineStyle":"Single","lineWidth":0.5,"shadow":false,"space":0.0,"hasNoneStyle":false},"top":{"lineStyle":"Single","lineWidth":0.5,"shadow":false,"space":0.0,"hasNoneStyle":false},"bottom":{"lineStyle":"Single","lineWidth":0.5,"shadow":false,"space":0.0,"hasNoneStyle":false},"vertical":{"lineStyle":"Single","lineWidth":0.5,"shadow":false,"space":0.0,"hasNoneStyle":false},"horizontal":{"lineStyle":"Single","lineWidth":0.5,"shadow":false,"space":0.0,"hasNoneStyle":false},"diagonalDown":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false},"diagonalUp":{"lineStyle":"None","lineWidth":0.0,"shadow":false,"space":0.0,"hasNoneStyle":false}},"bidi":false}},{"paragraphFormat":{"styleName":"Normal"},"inlines":[]}],"headersFooters":{},"sectionFormat":{"headerDistance":36.0,"footerDistance":36.0,"pageWidth":612.0,"pageHeight":792.0,"leftMargin":72.0,"rightMargin":72.0,"topMargin":72.0,"bottomMargin":72.0,"differentFirstPage":false,"differentOddAndEvenPages":false,"bidi":false,"restartPageNumbering":false,"pageStartingNumber":0}}],"characterFormat":{"fontSize":11.0,"fontFamily":"Calibri","fontSizeBidi":11.0,"fontFamilyBidi":"Arial"},"paragraphFormat":{"afterSpacing":8.0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple"},"background":{"color":"#FFFFFFFF"},"styles":[{"type":"Paragraph","name":"Normal","next":"Normal"},{"type":"Character","name":"Default Paragraph Font"},{"type":"Paragraph","name":"Normal (Web)","basedOn":"Normal","next":"Normal (Web)","characterFormat":{"fontSize":12.0,"fontFamily":"Times New Roman","fontSizeBidi":12.0,"fontFamilyBidi":"Times New Roman"},"paragraphFormat":{"beforeSpacing":5.0,"afterSpacing":5.0,"lineSpacing":1.0,"lineSpacingType":"Multiple"}}],"defaultTabWidth":36.0,"formatting":false,"protectionType":"ReadOnly","enforcement":true,"hashValue":"TCxiQ0q35iQIo6TqY+Nt/fkYblPiB9+D5pV5DdK2hIe+NqzJPJeZ0E2hpJSz3YL+VVPvrpQG8VnRLh8lyqlOIw==","saltValue":"UNBPXLxCmZ737H4/B2p0xg=="}';
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableLocalPaste: false });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        restrictJson = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('Document open', () => {
console.log('Document open');
        expect(() => { editor.open(restrictJson) }).not.toThrowError();
    });
    it('insert text at non-editable region', () => {
console.log('insert text at non-editable region');
        let currentLineLength: number = editor.selection.start.currentWidget.children.length;
        editor.editor.handleTextInput('s');
        expect(editor.selection.start.currentWidget.children.length).toBe(currentLineLength);
    });
    it('insert text at editable region', () => {
console.log('insert text at editable region');
        editor.selection.select('0;0;0;0;0;6', '0;0;0;0;0;6');
        let currentLineLength: number = editor.selection.start.currentWidget.children.length;
        editor.editor.handleTextInput('s');
        expect(editor.selection.start.currentWidget.children.length).not.toBe(currentLineLength);
    });
});

//Character formatting for multiple inline validation

describe('Apply character format validation', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableLocalPaste: false });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('Bold property', () => {
console.log('Bold property');
        editor.editor.insertText('Sample hello world');
        editor.selection.handleControlLeftKey();
        editor.selection.handleControlLeftKey();
        editor.selection.selectCurrentWord();
        editor.selection.characterFormat.bold = true;
        expect(editor.selection.characterFormat.bold).toBe(true);
    });
    it('Bold property for multiple different inline', () => {
console.log('Bold property for multiple different inline');
        editor.selection.handleLeftKey();
        editor.selection.handleLeftKey();
        editor.selection.handleLeftKey();
        editor.selection.handleShiftEndKey();
        editor.selection.handleShiftLeftKey();
        editor.selection.characterFormat.bold = true;
        expect(editor.selection.characterFormat.bold).toBe(true);
    });
    it('Undo after bold', () => {
console.log('Undo after bold');
        editor.editorHistory.undo();
        expect(editor.selection.characterFormat.bold).toBeUndefined();
    });
    it('Redo after bold', () => {
console.log('Redo after bold');
        editor.editorHistory.redo();
        expect(editor.selection.characterFormat.bold).toBe(true);
    });
});

/**
 * Paste match formatting validation
 */

describe('Paste formatting with underline validation', () => {
    let editor: DocumentEditor = undefined;
    let pasteString: string = '{"sections":[{"blocks":[{"characterFormat":{"bold":true,"italic":true,"underline":"Single","strikethrough":"None","fontSize":11,"fontFamily":"Calibri","fontColor":"#ED7D31FF","bidi":false,"fontSizeBidi":11,"fontFamilyBidi":"Calibri"},"paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"beforeSpacing":0,"afterSpacing":8,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"BodyText","textAlignment":"Left","styleName":"Normal","bidi":false,"contextualSpacing":false},"inlines":[{"text":"Source format","characterFormat":{"bold":true,"italic":true,"underline":"Single","strikethrough":"None","fontSize":11,"fontFamily":"Calibri","fontColor":"#ED7D31FF","bidi":false,"fontSizeBidi":11,"fontFamilyBidi":"Calibri"}}]}],"headersFooters":{},"sectionFormat":{"headerDistance":36,"footerDistance":36,"pageWidth":612,"pageHeight":792,"leftMargin":72,"rightMargin":72,"topMargin":72,"bottomMargin":72,"differentFirstPage":false,"differentOddAndEvenPages":false,"bidi":false,"restartPageNumbering":false,"pageStartingNumber":0}}],"paragraphFormat":{"leftIndent":0,"rightIndent":0,"afterSpacing":8,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","textAlignment":"Left"},"background":{"color":"#FFFFFFFF"},"styles":[{"type":"Paragraph","name":"Normal","next":"Normal","characterFormat":{"bold":false,"italic":false,"strikethrough":"None","fontSize":11,"fontFamily":"Calibri","fontColor":"#00000000","bidi":false,"fontSizeBidi":11,"fontFamilyBidi":"Calibri"},"paragraphFormat":{"leftIndent":0,"rightIndent":0,"afterSpacing":8,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","textAlignment":"Left"}},{"type":"Character","name":"Default Paragraph Font"}],"defaultTabWidth":35.400001525878906,"formatting":false,"protectionType":"NoProtection","enforcement":false,"dontUseHTMLParagraphAutoSpacing":false}';
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, isReadOnly: false, enableEditorHistory: true, enableLocalPaste: false });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        pasteString = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('Merge formatting', () => {
console.log('Merge formatting');
        editor.editor.insertText('Sample');
        editor.selection.handleLeftKey();
        editor.selection.handleLeftKey();
        editor.editor.paste(pasteString, 'MergeWithExistingFormatting');
        editor.selection.handleLeftKey();
        editor.selection.handleLeftKey();
        expect(editor.selection.characterFormat.underline).toBe('Single');
    });
    it('undo after merge formatting', () => {
console.log('undo after merge formatting');
        editor.editorHistory.undo();
        expect(editor.selection.characterFormat.underline).toBe('None');
    });
    it('redo after merge formatting', () => {
console.log('redo after merge formatting');
        editor.editorHistory.redo();
        editor.selection.handleLeftKey();
        expect(editor.selection.characterFormat.underline).toBe('Single');
    });
    it('Alignment after para delete', () => {
console.log('Alignment after para delete');
        editor.openBlank();
        editor.editor.insertText('hello');
        editor.selection.selectAll();
        editor.editor.onApplyParagraphFormat('textAlignment', 'Center', false, true);
        editor.editor.insertText('check');
        expect((editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0] as ParagraphWidget).paragraphFormat.textAlignment).toBe('Center');
    });
    it('Replacing a paragraph with text validation', () => {
console.log('Replacing a paragraph with text validation');
        editor.openBlank();
        editor.editor.insertText('hello');
        editor.editor.handleEnterKey();
        editor.editor.insertText('syncfusion');
        editor.editor.handleEnterKey();
        editor.editor.insertText('world');
        editor.documentHelper.selection.handleHomeKey();
        editor.documentHelper.selection.handleUpKey();
        editor.documentHelper.selection.handleUpKey();
        editor.documentHelper.selection.handleControlShiftRightKey();
        editor.documentHelper.selection.handleControlShiftDownKey();
        editor.editor.insertText('check');
        expect(editor.documentHelper.pages[0].bodyWidgets[0].childWidgets.length).toBe(2);
    });
    it('Comment mark is not removed after deleting the comment validation', () => {
console.log('Comment mark is not removed after deleting the comment validation');
        editor.openBlank();
        editor.enableTrackChanges = true;
        editor.editor.insertComment('hello');
        editor.selection.selectAll();
        editor.editor.deleteComment();
        expect(editor.documentHelper.comments.length).toBe(0);
        expect(((editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0] as ParagraphWidget).childWidgets[0] as LineWidget).children.length).toBe(0);
    });
});   
describe('Comment initial validation', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, enableLocalPaste: false, enableComment: true });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('Comment initial construction validation', () => {
console.log('Comment initial construction validation');
        editor.openBlank();
        editor.editor.insertText('hello');
        editor.selection.selectAll();
        editor.editor.insertComment('check');
        editor.selection.selectAll();
        editor.editor.deleteComment();
        expect(editor.documentHelper.comments.length).toBe(0);
    }); 
});
describe('Paste in list validation', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, enableLocalPaste: false, enableComment: true });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('Paste in list validation', () => {
        editor.openBlank();
        editor.editor.insertText('hello');
        editor.selection.selectAll();
        editor.selection.copy();
        editor.editor.onEnter();
        editor.editorModule.insertText('Syncfusion Software');
        editor.editor.applyNumbering('%1.', 'Number');
        editor.editor.paste();
        expect((editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0] as ParagraphWidget).paragraphFormat.listFormat).not.toBe(undefined);
    }); 
});
describe('Paste contents in document with header distance greater than 36', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, enableLocalPaste: false, enableComment: true });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('Paste contents in document with header distance greater than 36', () => {
        editor.openBlank();
        let sectoinFormat: WSectionFormat = new WSectionFormat();
        sectoinFormat.footerDistance = 50;
        sectoinFormat.headerDistance = 50;
        editor.editorModule.onApplySectionFormat(undefined, sectoinFormat);
        editor.editorModule.insertText('Adventure');
        editor.editorModule.onEnter();
        editor.editorModule.insertText('world');
        editor.editorModule.onEnter();
        editor.enableLocalPaste = true;
        editor.selection.selectAll();
        editor.selection.copy();
        editor.selection.selectAll();
        editor.editorModule.paste();
        expect(editor.selection.start.paragraph.bodyWidget.sectionFormat.footerDistance).toBe(50);
        expect(editor.selection.start.paragraph.bodyWidget.sectionFormat.headerDistance).toBe(50);
    }); 
});
describe('Bookmark delete validation', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, enableLocalPaste: false, enableComment: true });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('Bookmark delete validation', function () {
      editor.openBlank();
      editor.editor.insertText('check');
      editor.editor.insertText('Bookmark');
      editor.editor.insertText('content');
      editor.selection.handleHomeKey();
      editor.selection.handleControlRightKey();
      editor.selection.handleControlShiftRightKey();
      editor.editor.insertBookmark('check');
      editor.selection.handleHomeKey();
      editor.selection.handleControlRightKey();
      editor.selection.handleControlRightKey();
      editor.editor.onBackSpace();
      expect(((editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0] as any).childWidgets[0] as LineWidget).children[1].line.indexInOwner).toBe((((editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0] as any).childWidgets[0] as LineWidget).children[1] as BookmarkElementBox).reference.line.indexInOwner);
    });
});
describe('Inserting a same bookmark multiple times validation', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, enableLocalPaste: false, enableComment: true });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('Inserting a same bookmark multiple times validation', function () {
      editor.openBlank();
      editor.editor.insertText('check');
      editor.editor.onEnter();
      editor.editor.insertText('Bookmark');
      editor.editor.onEnter();
      editor.editor.insertText('content');
      editor.editor.onEnter();
      editor.editor.insertText('editor');
      editor.selection.handleHomeKey();
      editor.selection.handleUpKey();
      editor.selection.handleUpKey();
      editor.selection.handleUpKey();
      editor.selection.handleControlShiftRightKey();
      editor.selection.handleControlShiftDownKey();
      editor.selection.handleControlShiftDownKey();
      editor.selection.handleControlShiftDownKey();
      editor.editor.insertBookmark('check');
      editor.selection.handleHomeKey();
      editor.selection.handleUpKey();
      editor.selection.handleControlRightKey();
      editor.selection.handleControlRightKey();
      editor.editor.insertBookmark('check1');
      editor.selection.handleHomeKey();
      editor.selection.handleUpKey();
      editor.selection.handleUpKey();
      editor.editor.insertBookmark('check');
      expect(editor.documentHelper.bookmarks.length).toBe(2);
    });
});
let mergetable: any = {"sections":[{"sectionFormat":{"pageWidth":612,"pageHeight":792,"leftMargin":72,"rightMargin":72,"topMargin":72,"bottomMargin":72,"differentFirstPage":false,"differentOddAndEvenPages":false,"headerDistance":36,"footerDistance":36,"bidi":false},"blocks":[{"rows":[{"cells":[{"blocks":[{"paragraphFormat":{"leftIndent":0,"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":null},"inlines":[]}],"cellFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"diagonalDown":{},"diagonalUp":{},"horizontal":{},"vertical":{}},"shading":{},"preferredWidth":156,"cellWidth":156,"columnSpan":1,"rowSpan":1},"columnIndex":0},{"blocks":[{"paragraphFormat":{"leftIndent":0,"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":null},"inlines":[]}],"cellFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"diagonalDown":{},"diagonalUp":{},"horizontal":{},"vertical":{}},"shading":{},"preferredWidth":156,"cellWidth":156,"columnSpan":1,"rowSpan":1},"columnIndex":1},{"blocks":[{"paragraphFormat":{"leftIndent":0,"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":null},"inlines":[]}],"cellFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"diagonalDown":{},"diagonalUp":{},"horizontal":{},"vertical":{}},"shading":{},"preferredWidth":156,"cellWidth":156,"columnSpan":1,"rowSpan":1},"columnIndex":2}],"rowFormat":{"height":0,"heightType":"Auto","borders":{"top":{},"left":{},"right":{},"bottom":{},"diagonalDown":{},"diagonalUp":{},"horizontal":{},"vertical":{}},"gridBefore":0,"gridAfter":0}},{"cells":[{"blocks":[{"paragraphFormat":{"leftIndent":0,"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":null},"inlines":[]}],"cellFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"diagonalDown":{},"diagonalUp":{},"horizontal":{},"vertical":{}},"shading":{},"preferredWidth":156,"cellWidth":156,"columnSpan":1,"rowSpan":1},"columnIndex":0},{"blocks":[{"paragraphFormat":{"leftIndent":0,"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":null},"inlines":[]}],"cellFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"diagonalDown":{},"diagonalUp":{},"horizontal":{},"vertical":{}},"shading":{},"preferredWidth":312,"cellWidth":312,"columnSpan":2,"rowSpan":2},"columnIndex":1}],"rowFormat":{"height":0,"heightType":"Auto","borders":{"top":{},"left":{},"right":{},"bottom":{},"diagonalDown":{},"diagonalUp":{},"horizontal":{},"vertical":{}},"gridBefore":0,"gridAfter":0}},{"cells":[{"blocks":[{"paragraphFormat":{"leftIndent":0,"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":null},"inlines":[]}],"cellFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"diagonalDown":{},"diagonalUp":{},"horizontal":{},"vertical":{}},"shading":{},"preferredWidth":156,"cellWidth":156,"columnSpan":1,"rowSpan":1},"columnIndex":0}],"rowFormat":{"height":0,"heightType":"Auto","borders":{"top":{},"left":{},"right":{},"bottom":{},"diagonalDown":{},"diagonalUp":{},"horizontal":{},"vertical":{}},"gridBefore":0,"gridAfter":0}},{"cells":[{"blocks":[{"paragraphFormat":{"leftIndent":0,"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":null},"inlines":[]}],"cellFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"diagonalDown":{},"diagonalUp":{},"horizontal":{},"vertical":{}},"shading":{},"preferredWidth":156,"cellWidth":156,"columnSpan":1,"rowSpan":1},"columnIndex":0},{"blocks":[{"paragraphFormat":{"leftIndent":0,"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":null},"inlines":[]}],"cellFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"diagonalDown":{},"diagonalUp":{},"horizontal":{},"vertical":{}},"shading":{},"preferredWidth":156,"cellWidth":156,"columnSpan":1,"rowSpan":1},"columnIndex":1},{"blocks":[{"paragraphFormat":{"leftIndent":0,"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":null},"inlines":[]}],"cellFormat":{"borders":{"top":{},"left":{},"right":{},"bottom":{},"diagonalDown":{},"diagonalUp":{},"horizontal":{},"vertical":{}},"shading":{},"preferredWidth":156,"cellWidth":156,"columnSpan":1,"rowSpan":1},"columnIndex":2}],"rowFormat":{"height":0,"heightType":"Auto","borders":{"top":{},"left":{},"right":{},"bottom":{},"diagonalDown":{},"diagonalUp":{},"horizontal":{},"vertical":{}},"gridBefore":0,"gridAfter":0}}],"grid":[156,156,156],"tableFormat":{"borders":{"top":{"lineStyle":"Single","lineWidth":0.5},"left":{"lineStyle":"Single","lineWidth":0.5},"right":{"lineStyle":"Single","lineWidth":0.5},"bottom":{"lineStyle":"Single","lineWidth":0.5},"diagonalDown":{},"diagonalUp":{},"horizontal":{"lineStyle":"Single","lineWidth":0.5},"vertical":{"lineStyle":"Single","lineWidth":0.5}},"shading":{},"leftIndent":0,"topMargin":0,"rightMargin":5.4,"leftMargin":5.4,"bottomMargin":0,"preferredWidthType":"Auto"},"columnCount":3},{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":null},"inlines":[]}],"headersFooters":{"header":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{"fontSize":null},"inlines":[]}]},"footer":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{"fontSize":null},"inlines":[]}]},"evenHeader":{},"evenFooter":{},"firstPageHeader":{},"firstPageFooter":{}}}],"characterFormat":{"bold":false,"italic":false,"fontSize":11,"fontFamily":"Calibri","underline":"None","strikethrough":"None","baselineAlignment":"Normal","highlightColor":"NoColor","fontColor":"empty","boldBidi":false,"italicBidi":false,"fontSizeBidi":11,"fontFamilyBidi":"Calibri","allCaps":false},"paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":0,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{},"bidi":false},"defaultTabWidth":36,"trackChanges":false,"enforcement":false,"hashValue":"","saltValue":"","formatting":false,"protectionType":"NoProtection","dontUseHTMLParagraphAutoSpacing":false,"formFieldShading":true,"styles":[{"name":"Normal","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontSize":null},"next":"Normal"},{"name":"Heading 1","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":12,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level1","listFormat":{}},"characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":16,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 1 Char","next":"Normal"},{"name":"Heading 1 Char","type":"Character","characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":16,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Default Paragraph Font","type":"Character","characterFormat":{"fontSize":null}},{"name":"Heading 2","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level2","listFormat":{}},"characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 2 Char","next":"Normal"},{"name":"Heading 2 Char","type":"Character","characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 3","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level3","listFormat":{}},"characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 3 Char","next":"Normal"},{"name":"Heading 3 Char","type":"Character","characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 4","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level4","listFormat":{}},"characterFormat":{"italic":true,"fontSize":null,"fontFamily":"Calibri Light","fontColor":"#2F5496","italicBidi":true,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 4 Char","next":"Normal"},{"name":"Heading 4 Char","type":"Character","characterFormat":{"italic":true,"fontSize":null,"fontFamily":"Calibri Light","fontColor":"#2F5496","italicBidi":true,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 5","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level5","listFormat":{}},"characterFormat":{"fontSize":null,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 5 Char","next":"Normal"},{"name":"Heading 5 Char","type":"Character","characterFormat":{"fontSize":null,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 6","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level6","listFormat":{}},"characterFormat":{"fontSize":null,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 6 Char","next":"Normal"},{"name":"Heading 6 Char","type":"Character","characterFormat":{"fontSize":null,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"}],"lists":[],"abstractLists":[],"comments":[],"revisions":[],"customXml":[]};
describe('Apply table border via pane validation', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, enableLocalPaste: false, enableComment: true });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('Apply table border via pane validation', function () {
        editor.open(JSON.stringify(mergetable));
        editor.selection.handleControlShiftDownKey();
        editor.selection.handleControlShiftDownKey();
        editor.selection.handleControlShiftDownKey();
        editor.selection.handleControlShiftDownKey();
        editor.selection.handleControlShiftDownKey();
        editor.selection.handleControlShiftDownKey();
        let settings: BorderSettings = { type: 'AllBorders', borderColor: 'red', lineWidth: 1, borderStyle: 'Single' };
        expect(() => { editor.editor.applyBorders(settings) }).toThrowError();
    });
});
let table: any = {"sections":[{"sectionFormat":{"pageWidth":612,"pageHeight":1008,"leftMargin":36,"rightMargin":36,"topMargin":36,"bottomMargin":36,"differentFirstPage":false,"differentOddAndEvenPages":false,"headerDistance":36,"footerDistance":36,"bidi":false},"blocks":[{"paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":10,"fontFamily":"Arial","fontColor":"#000000FF","fontSizeBidi":10,"fontFamilyBidi":"Arial"},"inlines":[]},{"rows":[{"cells":[{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{},"tabs":[{"position":58.849998474121094,"deletePosition":0,"tabJustification":"Left","tabLeader":"None"}]},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#000000FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#000000FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"text":"G."}]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":54.29999923706055,"preferredWidthType":"Point","cellWidth":54.29999964980949,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":0},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{},"tabs":[{"position":58.849998474121094,"deletePosition":0,"tabJustification":"Left","tabLeader":"None"}]},"characterFormat":{"bold":true,"fontSize":8,"fontFamily":"Arial","highlightColor":"Yellow","fontColor":"#000000FF","boldBidi":true,"fontSizeBidi":8,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"bold":true,"fontSize":8,"fontFamily":"Arial","highlightColor":"Yellow","fontColor":"#000000FF","boldBidi":true,"fontSizeBidi":8,"fontFamilyBidi":"Arial"},"text":"Base Rent:"}]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":105.55000305175781,"preferredWidthType":"Point","cellWidth":105.55000385407186,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":1},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"empty","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"inlines":[]},{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"empty","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"inlines":[]},{"rows":[{"cells":[{"blocks":[{"paragraphFormat":{"textAlignment":"Center","styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"text":"From"}]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":18,"preferredWidthType":"Point","cellWidth":110.40000086654479,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":0},{"blocks":[{"paragraphFormat":{"textAlignment":"Center","styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"text":"To"}]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":18,"preferredWidthType":"Point","cellWidth":110.40000086654479,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":1},{"blocks":[{"paragraphFormat":{"textAlignment":"Center","styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"text":"Base Rent ($/MO)"}]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":18,"preferredWidthType":"Point","cellWidth":110.40000086654479,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":2}],"rowFormat":{"height":1,"allowBreakAcrossPages":true,"heightType":"AtLeast","isHeader":false,"borders":{"top":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"left":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"right":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"bottom":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"vertical":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5}},"gridBefore":0,"gridAfter":0}},{"cells":[{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"text":"October 01, 2020"}]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":18,"preferredWidthType":"Point","cellWidth":110.40000086654479,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":0},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"text":"September 30, 2021"}]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":18,"preferredWidthType":"Point","cellWidth":110.40000086654479,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":1},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"text":"$5,212.80"}]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":18,"preferredWidthType":"Point","cellWidth":110.40000086654479,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":2}],"rowFormat":{"height":1,"allowBreakAcrossPages":true,"heightType":"AtLeast","isHeader":false,"borders":{"top":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"left":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"right":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"bottom":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"vertical":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5}},"gridBefore":0,"gridAfter":0}},{"cells":[{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"text":"October 01, 2021"}]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":18,"preferredWidthType":"Point","cellWidth":110.40000086654479,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":0},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"text":"September 30, 2022"}]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":18,"preferredWidthType":"Point","cellWidth":110.40000086654479,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":1},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"inlines":[{"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#0070C0FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"text":"$5,369.18"}]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":18,"preferredWidthType":"Point","cellWidth":110.40000086654479,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":2}],"rowFormat":{"height":1,"allowBreakAcrossPages":true,"heightType":"AtLeast","isHeader":false,"borders":{"top":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"left":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"right":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"bottom":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"vertical":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5}},"gridBefore":0,"gridAfter":0}}],"grid":[110.40000086654479,110.40000086654479,110.40000086654479],"tableFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"left":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"right":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"bottom":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"vertical":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5}},"shading":{},"leftIndent":0,"tableAlignment":"Left","topMargin":0,"rightMargin":5.4,"leftMargin":5.4,"bottomMargin":0,"preferredWidth":100,"preferredWidthType":"Percent","bidi":false,"allowAutoFit":false},"description":null,"title":null,"columnCount":3},{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"#000000FF","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":342,"preferredWidthType":"Point","cellWidth":342.0000025996343,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":2}],"rowFormat":{"height":12.399999618530273,"allowBreakAcrossPages":true,"heightType":"AtLeast","isHeader":false,"borders":{"top":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0}},"gridBefore":0,"gridAfter":0,"leftIndent":21.05}},{"cells":[{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{},"tabs":[{"position":58.849998474121094,"deletePosition":0,"tabJustification":"Left","tabLeader":"None"}]},"characterFormat":{"fontSize":3,"fontFamily":"Arial","fontColor":"#000000FF","fontSizeBidi":3,"fontFamilyBidi":"Arial"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":54.29999923706055,"preferredWidthType":"Point","cellWidth":54.29999964980949,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":0},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{},"tabs":[{"position":58.849998474121094,"deletePosition":0,"tabJustification":"Left","tabLeader":"None"}]},"characterFormat":{"bold":true,"fontSize":3,"fontFamily":"Arial","highlightColor":"Yellow","fontColor":"#000000FF","boldBidi":true,"fontSizeBidi":3,"fontFamilyBidi":"Arial"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":105.55000305175781,"preferredWidthType":"Point","cellWidth":105.55000385407186,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":1},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{},"tabs":[{"position":58.849998474121094,"deletePosition":0,"tabJustification":"Left","tabLeader":"None"}]},"characterFormat":{"fontSize":3,"fontFamily":"Arial","fontColor":"#000000FF","fontSizeBidi":3,"fontFamilyBidi":"Arial"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":342,"preferredWidthType":"Point","cellWidth":342.0000025996343,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":2}],"rowFormat":{"height":7.650000095367432,"allowBreakAcrossPages":true,"heightType":"AtLeast","isHeader":false,"borders":{"top":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0}},"gridBefore":0,"gridAfter":0,"leftIndent":21.05}}],"grid":[54.29999964980949,105.55000385407186,342.0000025996343],"tableFormat":{"borders":{"top":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":true,"lineStyle":"None","lineWidth":0}},"shading":{},"leftIndent":21.049999237060547,"tableAlignment":"Left","topMargin":0,"rightMargin":5.4,"leftMargin":5.4,"bottomMargin":0,"preferredWidth":501.8500061035156,"preferredWidthType":"Point","bidi":false,"allowAutoFit":false},"description":null,"title":null,"columnCount":3},{"paragraphFormat":{"textAlignment":"Justify","beforeSpacing":6,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"headersFooters":{"header":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"footer":{"blocks":[{"paragraphFormat":{"beforeSpacing":7,"lineSpacing":5,"lineSpacingType":"Exactly","styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":5,"fontColor":"empty","fontSizeBidi":5},"inlines":[]},{"paragraphFormat":{"textAlignment":"Justify","styleName":"Normal","listFormat":{},"tabs":[{"position":-36,"deletePosition":0,"tabJustification":"Left","tabLeader":"None"}]},"characterFormat":{"fontColor":"empty"},"inlines":[]},{"paragraphFormat":{"textAlignment":"Justify","styleName":"Normal","listFormat":{},"tabs":[{"position":-36,"deletePosition":0,"tabJustification":"Left","tabLeader":"None"}]},"characterFormat":{"fontColor":"empty"},"inlines":[]}]},"evenHeader":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"evenFooter":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"firstPageHeader":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"firstPageFooter":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]}}}],"characterFormat":{"bold":false,"italic":false,"fontSize":11,"fontFamily":"Calibri","underline":"None","strikethrough":"None","baselineAlignment":"Normal","highlightColor":"NoColor","fontColor":"empty","boldBidi":false,"italicBidi":false,"fontSizeBidi":11,"fontFamilyBidi":"Calibri","allCaps":false},"paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":0,"afterSpacing":8,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","listFormat":{},"bidi":false},"defaultTabWidth":36,"trackChanges":false,"enforcement":false,"hashValue":"","saltValue":"","formatting":false,"protectionType":"NoProtection","dontUseHTMLParagraphAutoSpacing":false,"formFieldShading":true,"styles":[{"name":"Normal","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontColor":"empty"},"next":"Normal"},{"name":"Heading 1","type":"Paragraph","paragraphFormat":{"leftIndent":1,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","outlineLevel":"Level1","listFormat":{}},"characterFormat":{"bold":true,"fontSize":8,"fontFamily":"Arial","fontColor":"empty","boldBidi":true,"fontSizeBidi":8,"fontFamilyBidi":"Arial"},"basedOn":"Normal","link":"Heading 1 Char","next":"Heading 1"},{"name":"Heading 1 Char","type":"Character","characterFormat":{"bold":true,"fontSize":8,"fontFamily":"Arial","fontColor":"empty","boldBidi":true,"fontSizeBidi":8,"fontFamilyBidi":"Arial"},"basedOn":"Default Paragraph Font"},{"name":"Default Paragraph Font","type":"Character","characterFormat":{"fontColor":"empty"}},{"name":"Heading 4","type":"Paragraph","paragraphFormat":{"beforeSpacing":2,"afterSpacing":0,"outlineLevel":"Level4","listFormat":{}},"characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2E74B5FF","italicBidi":true,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 4 Char","next":"Normal"},{"name":"Heading 4 Char","type":"Character","characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2E74B5FF","italicBidi":true,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"List Paragraph","type":"Paragraph","paragraphFormat":{"leftIndent":36,"listFormat":{},"contextualSpacing":true},"characterFormat":{"fontColor":"empty"},"basedOn":"Normal","next":"List Paragraph"},{"name":"Body Text","type":"Paragraph","paragraphFormat":{"leftIndent":6,"beforeSpacing":2.799999952316284,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"empty","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"basedOn":"Normal","link":"Body Text Char","next":"Body Text"},{"name":"Body Text Char","type":"Character","characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"empty","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"basedOn":"Default Paragraph Font"},{"name":"Table Paragraph","type":"Paragraph","paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontColor":"empty"},"basedOn":"Normal","next":"Table Paragraph"},{"name":"Header","type":"Paragraph","paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{},"tabs":[{"position":234,"deletePosition":0,"tabJustification":"Center","tabLeader":"None"},{"position":468,"deletePosition":0,"tabJustification":"Right","tabLeader":"None"}]},"characterFormat":{"fontColor":"empty"},"basedOn":"Normal","link":"Header Char","next":"Header"},{"name":"Header Char","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"Footer","type":"Paragraph","paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{},"tabs":[{"position":234,"deletePosition":0,"tabJustification":"Center","tabLeader":"None"},{"position":468,"deletePosition":0,"tabJustification":"Right","tabLeader":"None"}]},"characterFormat":{"fontColor":"empty"},"basedOn":"Normal","link":"Footer Char","next":"Footer"},{"name":"Footer Char","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"zzmpTrailerItem","type":"Character","characterFormat":{"fontSize":8,"fontFamily":"Calibri","strikethrough":"None","baselineAlignment":"Normal","fontColor":"#00000000","fontSizeBidi":8,"fontFamilyBidi":"Calibri"},"basedOn":"Default Paragraph Font"},{"name":"Balloon Text","type":"Paragraph","paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Tahoma","fontColor":"empty","fontSizeBidi":8,"fontFamilyBidi":"Tahoma"},"basedOn":"Normal","link":"Balloon Text Char","next":"Balloon Text"},{"name":"Balloon Text Char","type":"Character","characterFormat":{"fontSize":8,"fontFamily":"Tahoma","fontColor":"empty","fontSizeBidi":8,"fontFamilyBidi":"Tahoma"},"basedOn":"Default Paragraph Font"},{"name":"Body Text Indent","type":"Paragraph","paragraphFormat":{"leftIndent":18,"afterSpacing":6,"listFormat":{}},"characterFormat":{"fontColor":"empty"},"basedOn":"Normal","link":"Body Text Indent Char","next":"Body Text Indent"},{"name":"Body Text Indent Char","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"Date","type":"Paragraph","paragraphFormat":{"leftIndent":216,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontFamily":"Times New Roman","fontColor":"empty","fontFamilyBidi":"Times New Roman"},"basedOn":"Normal","link":"Date Char","next":"Normal"},{"name":"Date Char","type":"Character","characterFormat":{"fontFamily":"Times New Roman","fontColor":"empty","fontFamilyBidi":"Times New Roman"},"basedOn":"Default Paragraph Font"},{"name":"Inside Address","type":"Paragraph","paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontFamily":"Times New Roman","fontColor":"empty","fontFamilyBidi":"Times New Roman"},"basedOn":"Normal","next":"Inside Address"},{"name":"Subject Line","type":"Paragraph","paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontFamily":"Times New Roman","fontColor":"empty","fontFamilyBidi":"Times New Roman"},"basedOn":"Normal","next":"Subject Line"},{"name":"Signature","type":"Paragraph","paragraphFormat":{"leftIndent":216,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontFamily":"Times New Roman","fontColor":"empty","fontFamilyBidi":"Times New Roman"},"basedOn":"Normal","link":"Signature Char","next":"Signature"},{"name":"Signature Char","type":"Character","characterFormat":{"fontFamily":"Times New Roman","fontColor":"empty","fontFamilyBidi":"Times New Roman"},"basedOn":"Default Paragraph Font"},{"name":"Signature Company","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontFamily":"Times New Roman","fontColor":"empty","fontFamilyBidi":"Times New Roman"},"basedOn":"Signature","next":"Signature Company"},{"name":"DeltaView Insertion","type":"Character","characterFormat":{"underline":"Double","fontColor":"#0000FFFF"},"basedOn":"Default Paragraph Font"},{"name":"No Spacing","type":"Paragraph","paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontColor":"empty"},"next":"No Spacing"},{"name":"Hyperlink","type":"Character","characterFormat":{"underline":"Single","fontColor":"#0563C1FF"},"basedOn":"Default Paragraph Font"},{"name":"Unresolved Mention1","type":"Character","characterFormat":{"fontColor":"#605E5CFF"},"basedOn":"Default Paragraph Font"},{"name":"paragraph","type":"Paragraph","paragraphFormat":{"beforeSpacing":5,"afterSpacing":5,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontSize":12,"fontFamily":"Times New Roman","fontColor":"empty","fontSizeBidi":12,"fontFamilyBidi":"Times New Roman"},"basedOn":"Normal","next":"paragraph"},{"name":"normaltextrun","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"eop","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"Date_0","type":"Paragraph","paragraphFormat":{"leftIndent":216,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontFamily":"Times New Roman","fontColor":"empty","fontFamilyBidi":"Times New Roman"},"basedOn":"Normal","link":"Date Char_0","next":"Normal_0"},{"name":"Date Char_0","type":"Character","characterFormat":{"fontFamily":"Times New Roman","fontColor":"empty","fontFamilyBidi":"Times New Roman"},"basedOn":"Default Paragraph Font"},{"name":"Normal_0","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontFamily":"Calibri","fontColor":"empty","fontFamilyBidi":"Calibri"},"next":"Normal_0"},{"name":"Inside Address_0","type":"Paragraph","paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontFamily":"Times New Roman","fontColor":"empty","fontFamilyBidi":"Times New Roman"},"basedOn":"Normal","next":"Inside Address_0"},{"name":"Body Text_0","type":"Paragraph","paragraphFormat":{"leftIndent":6,"beforeSpacing":2.799999952316284,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"empty","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"basedOn":"Normal","link":"Body Text Char_0","next":"Body Text_0"},{"name":"Body Text Char_0","type":"Character","characterFormat":{"fontSize":8,"fontFamily":"Arial","fontColor":"empty","fontSizeBidi":8,"fontFamilyBidi":"Arial"},"basedOn":"Default Paragraph Font"},{"name":"Signature_0","type":"Paragraph","paragraphFormat":{"leftIndent":216,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{}},"characterFormat":{"fontFamily":"Times New Roman","fontColor":"empty","fontFamilyBidi":"Times New Roman"},"basedOn":"Normal","link":"Signature Char_0","next":"Signature_0"},{"name":"Signature Char_0","type":"Character","characterFormat":{"fontFamily":"Times New Roman","fontColor":"empty","fontFamilyBidi":"Times New Roman"},"basedOn":"Default Paragraph Font"},{"name":"Signature Company_0","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontFamily":"Times New Roman","fontColor":"empty","fontFamilyBidi":"Times New Roman"},"basedOn":"Signature","next":"Signature Company_0"},{"name":"Header_0","type":"Paragraph","paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{},"tabs":[{"position":234,"deletePosition":0,"tabJustification":"Center","tabLeader":"None"},{"position":468,"deletePosition":0,"tabJustification":"Right","tabLeader":"None"}]},"characterFormat":{"fontSize":12,"fontFamily":"Courier New","fontColor":"empty","fontSizeBidi":12,"fontFamilyBidi":"Courier New"},"basedOn":"Normal","link":"Header Char_0","next":"Header_0"},{"name":"Header Char_0","type":"Character","characterFormat":{"fontSize":12,"fontFamily":"Courier New","fontColor":"empty","fontSizeBidi":12,"fontFamilyBidi":"Courier New"},"basedOn":"Default Paragraph Font"},{"name":"List Paragraph_0","type":"Paragraph","paragraphFormat":{"leftIndent":36,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{},"contextualSpacing":true},"characterFormat":{"fontSize":12,"fontFamily":"Arial Narrow","fontColor":"empty","fontSizeBidi":12,"fontFamilyBidi":"Arial Narrow"},"basedOn":"Normal","next":"List Paragraph_0"},{"name":"MsoNormal","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontColor":"empty"},"basedOn":"Normal","next":"MsoNormal"},{"name":"MsoListParagraph0","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"MsoNormal0","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"MsoBodyText","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"MsoBodyText Paragraph","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontFamily":"Arial","fontColor":"empty","fontFamilyBidi":"Arial"},"basedOn":"Body Text","next":"MsoBodyText Paragraph"},{"name":"NonTocText","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"VEItalic","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"VEBoldUnderline","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"MsoBodyTextParagraph","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontFamily":"Arial","fontColor":"empty","fontFamilyBidi":"Arial"},"basedOn":"Body Text","next":"MsoBodyTextParagraph"},{"name":"MsoBodyTextParagraphParagraph","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontFamily":"Arial","fontColor":"empty","fontFamilyBidi":"Arial"},"basedOn":"Body Text","next":"MsoBodyTextParagraphParagraph"},{"name":"MsoBodyTextParagraph Character","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"MsoListParagraph","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontColor":"empty"},"basedOn":"Normal","next":"MsoListParagraph"},{"name":"MsoNormalCharacter","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"Heading 2","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level2","listFormat":{}},"characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 2 Char","next":"Normal"},{"name":"Heading 2 Char","type":"Character","characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 3","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level3","listFormat":{}},"characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 3 Char","next":"Normal"},{"name":"Heading 3 Char","type":"Character","characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 5","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level5","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 5 Char","next":"Normal"},{"name":"Heading 5 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 6","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level6","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 6 Char","next":"Normal"},{"name":"Heading 6 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"}],"lists":[],"abstractLists":[],"comments":[],"revisions":[],"customXml":[],"footnotes":{"separator":[{"paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[{"characterFormat":{"fontColor":"empty"},"text":"\u0003"}]}],"continuationSeparator":[{"paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[{"characterFormat":{"fontColor":"empty"},"text":"\u0004"}]}],"continuationNotice":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"endnotes":{"separator":[{"paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[{"characterFormat":{"fontColor":"empty"},"text":"\u0003"}]}],"continuationSeparator":[{"paragraphFormat":{"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[{"characterFormat":{"fontColor":"empty"},"text":"\u0004"}]}],"continuationNotice":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]}};
describe('Nested table with preferred width type percentage', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, enableLocalPaste: false, enableComment: true });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('Nested table with preferred width type percentage', function () {
        editor.open(JSON.stringify(table));
        let nestedTable: TableWidget = ((((editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[1] as TableWidget).childWidgets[0] as TableRowWidget).childWidgets[2] as TableCellWidget).childWidgets[2] as TableWidget);
        expect(nestedTable.tableFormat.preferredWidthType).toBe('Percent');
        expect(((nestedTable.childWidgets[0] as TableRowWidget).childWidgets[0] as TableCellWidget).cellFormat.cellWidth).toBeGreaterThan(((nestedTable.childWidgets[0] as TableRowWidget).childWidgets[0] as TableCellWidget).cellFormat.preferredWidth);
        expect(((nestedTable.childWidgets[0] as TableRowWidget).childWidgets[1] as TableCellWidget).cellFormat.cellWidth).toBeGreaterThan(((nestedTable.childWidgets[0] as TableRowWidget).childWidgets[0] as TableCellWidget).cellFormat.preferredWidth);
        expect(((nestedTable.childWidgets[0] as TableRowWidget).childWidgets[2] as TableCellWidget).cellFormat.cellWidth).toBeGreaterThan(((nestedTable.childWidgets[0] as TableRowWidget).childWidgets[0] as TableCellWidget).cellFormat.preferredWidth);
    });
});
let tableclip : any = {"sections":[{"sectionFormat":{"pageWidth":612,"pageHeight":792,"leftMargin":72,"rightMargin":72,"topMargin":72,"bottomMargin":72,"differentFirstPage":false,"differentOddAndEvenPages":false,"headerDistance":36,"footerDistance":36,"bidi":false},"blocks":[{"rows":[{"cells":[{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[{"characterFormat":{"fontColor":"empty"},"text":"u"},{"characterFormat":{"fontColor":"empty"},"text":"f"},{"characterFormat":{"fontColor":"empty"},"text":"g"},{"characterFormat":{"fontColor":"empty"},"text":"h"},{"characterFormat":{"fontColor":"empty"},"text":"j"},{"characterFormat":{"fontColor":"empty"},"text":"f"},{"characterFormat":{"fontColor":"empty"},"text":"g"},{"characterFormat":{"fontColor":"empty"},"text":"j"},{"characterFormat":{"fontColor":"empty"},"text":"f"},{"characterFormat":{"fontColor":"empty"},"text":"h"},{"characterFormat":{"fontColor":"empty"},"text":"j"},{"characterFormat":{"fontColor":"empty"},"text":"f"},{"characterFormat":{"fontColor":"empty"},"text":"h"},{"characterFormat":{"fontColor":"empty"},"text":"j"},{"characterFormat":{"fontColor":"empty"},"text":"f"},{"characterFormat":{"fontColor":"empty"},"text":"h"},{"characterFormat":{"fontColor":"empty"},"text":"j"},{"characterFormat":{"fontColor":"empty"},"text":"f"},{"characterFormat":{"fontColor":"empty"},"text":"h"},{"characterFormat":{"fontColor":"empty"},"text":"t"},{"characterFormat":{"fontColor":"empty"},"text":"u"},{"characterFormat":{"fontColor":"empty"},"text":"u"},{"characterFormat":{"fontColor":"empty"},"text":"f"},{"characterFormat":{"fontColor":"empty"},"text":"g"},{"characterFormat":{"fontColor":"empty"},"text":"h"},{"characterFormat":{"fontColor":"empty"},"text":"j"},{"characterFormat":{"fontColor":"empty"},"text":"f"},{"characterFormat":{"fontColor":"empty"},"text":"g"},{"characterFormat":{"fontColor":"empty"},"text":"h"},{"characterFormat":{"fontColor":"empty"},"text":"j"},{"characterFormat":{"fontColor":"empty"},"text":"f"},{"characterFormat":{"fontColor":"empty"},"text":"g"},{"characterFormat":{"fontColor":"empty"},"text":"h"},{"characterFormat":{"fontColor":"empty"},"text":"j"},{"characterFormat":{"fontColor":"empty"},"text":"f"},{"characterFormat":{"fontColor":"empty"},"text":"g"},{"characterFormat":{"fontColor":"empty"},"text":"h"},{"characterFormat":{"fontColor":"empty"},"text":"j"},{"characterFormat":{"fontColor":"empty"},"text":"f"},{"characterFormat":{"fontColor":"empty"},"text":"g"},{"characterFormat":{"fontColor":"empty"},"text":"h"},{"characterFormat":{"fontColor":"empty"},"text":"j"},{"characterFormat":{"fontColor":"empty"},"text":"f"},{"characterFormat":{"fontColor":"empty"},"text":"g"},{"characterFormat":{"fontColor":"empty"},"text":"h"},{"characterFormat":{"fontColor":"empty"},"text":"t"},{"characterFormat":{"fontColor":"empty"},"text":"u"}]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":13.899999618530273,"preferredWidthType":"Point","cellWidth":13.899999618530273,"columnSpan":1,"rowSpan":4,"verticalAlignment":"Top"},"columnIndex":0},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":116.8499984741211,"preferredWidthType":"Point","cellWidth":116.8499984741211,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":1},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":58.45000076293945,"preferredWidthType":"Point","cellWidth":58.45000076293945,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":2},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":58.45000076293945,"preferredWidthType":"Point","cellWidth":58.45000076293945,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":3},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":116.9000015258789,"preferredWidthType":"Point","cellWidth":116.9000015258789,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":4}],"rowFormat":{"height":1,"allowBreakAcrossPages":false,"heightType":"AtLeast","isHeader":false,"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"gridBefore":0,"gridAfter":0}},{"cells":[{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":116.8499984741211,"preferredWidthType":"Point","cellWidth":116.8499984741211,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":1},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":116.9000015258789,"preferredWidthType":"Point","cellWidth":116.9000015258789,"columnSpan":2,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":2},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":116.9000015258789,"preferredWidthType":"Point","cellWidth":116.9000015258789,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":4}],"rowFormat":{"height":10.199999809265137,"allowBreakAcrossPages":true,"heightType":"Exactly","isHeader":false,"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"gridBefore":0,"gridAfter":0}},{"cells":[{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":116.8499984741211,"preferredWidthType":"Point","cellWidth":116.8499984741211,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":1},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":116.9000015258789,"preferredWidthType":"Point","cellWidth":116.9000015258789,"columnSpan":2,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":2},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":116.9000015258789,"preferredWidthType":"Point","cellWidth":116.9000015258789,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":4}],"rowFormat":{"height":10.199999809265137,"allowBreakAcrossPages":true,"heightType":"Exactly","isHeader":false,"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"gridBefore":0,"gridAfter":0}},{"cells":[{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":116.8499984741211,"preferredWidthType":"Point","cellWidth":116.8499984741211,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":1},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":116.9000015258789,"preferredWidthType":"Point","cellWidth":116.9000015258789,"columnSpan":2,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":2},{"blocks":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"cellFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"shading":{},"preferredWidth":116.9000015258789,"preferredWidthType":"Point","cellWidth":116.9000015258789,"columnSpan":1,"rowSpan":1,"verticalAlignment":"Top"},"columnIndex":4}],"rowFormat":{"height":25.25,"allowBreakAcrossPages":true,"heightType":"Exactly","isHeader":false,"borders":{"top":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"left":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"right":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"bottom":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"vertical":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0}},"gridBefore":0,"gridAfter":0}}],"grid":[13.899999618530273,116.8499984741211,58.45000076293945,58.45000076293945,116.9000015258789],"tableFormat":{"borders":{"top":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"left":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"right":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"bottom":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"diagonalDown":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"diagonalUp":{"hasNoneStyle":false,"lineStyle":"None","lineWidth":0},"horizontal":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5},"vertical":{"hasNoneStyle":false,"lineStyle":"Single","lineWidth":0.5}},"shading":{},"leftIndent":0,"tableAlignment":"Left","topMargin":0,"rightMargin":5.4,"leftMargin":5.4,"bottomMargin":0,"preferredWidthType":"Auto","bidi":false,"allowAutoFit":false},"description":null,"title":null,"columnCount":5},{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[]}],"headersFooters":{"header":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"footer":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"evenHeader":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"evenFooter":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"firstPageHeader":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"firstPageFooter":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]}}}],"characterFormat":{"bold":false,"italic":false,"fontSize":11,"fontFamily":"Calibri","underline":"None","strikethrough":"None","baselineAlignment":"Normal","highlightColor":"NoColor","fontColor":"empty","boldBidi":false,"italicBidi":false,"fontSizeBidi":11,"fontFamilyBidi":"Calibri","allCaps":false},"paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":0,"afterSpacing":8,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","listFormat":{},"bidi":false},"defaultTabWidth":36,"trackChanges":false,"enforcement":false,"hashValue":"","saltValue":"","formatting":false,"protectionType":"NoProtection","dontUseHTMLParagraphAutoSpacing":false,"formFieldShading":true,"compatibilityMode":"Word2013","styles":[{"name":"Normal","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontColor":"empty"},"next":"Normal"},{"name":"Default Paragraph Font","type":"Character","characterFormat":{"fontColor":"empty"}},{"name":"Heading 1","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":12,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level1","listFormat":{}},"characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":16,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 1 Char","next":"Normal"},{"name":"Heading 1 Char","type":"Character","characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":16,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 2","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level2","listFormat":{}},"characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 2 Char","next":"Normal"},{"name":"Heading 2 Char","type":"Character","characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 3","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level3","listFormat":{}},"characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 3 Char","next":"Normal"},{"name":"Heading 3 Char","type":"Character","characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 4","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level4","listFormat":{}},"characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496","italicBidi":true,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 4 Char","next":"Normal"},{"name":"Heading 4 Char","type":"Character","characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496","italicBidi":true,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 5","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level5","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 5 Char","next":"Normal"},{"name":"Heading 5 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 6","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level6","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 6 Char","next":"Normal"},{"name":"Heading 6 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"}],"lists":[],"abstractLists":[],"comments":[],"revisions":[],"customXml":[],"footnotes":{"separator":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[{"characterFormat":{"fontColor":"empty"},"text":"\u0003"}]}],"continuationSeparator":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[{"characterFormat":{"fontColor":"empty"},"text":"\u0004"}]}],"continuationNotice":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"endnotes":{"separator":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[{"characterFormat":{"fontColor":"empty"},"text":"\u0003"}]}],"continuationSeparator":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontColor":"empty"},"inlines":[{"characterFormat":{"fontColor":"empty"},"text":"\u0004"}]}],"continuationNotice":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]}};
describe('Table clipping if the last row height type is exactly', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, enableLocalPaste: false, enableComment: true });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('Table clipping if the last row height type is exactly', function () {
        editor.open(JSON.stringify(tableclip));
        //check whether the table was clipped if not the table will split to 2nd page
        expect(editor.documentHelper.pages.length).toBe(1);
        
    });
});
describe('Paste optionv validation', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, enableLocalPaste: false, enableComment: true });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('Paste option validation', function () {
        editor.openBlank();
        editor.editor.insertText('Hello');
        editor.selection.selectAll();
        editor.selection.copy();
        editor.editor.paste();
        editor.editor.applyPasteOptions('KeepSourceFormatting');
        expect(editor.editor.previousParaFormat).toBe(undefined);
        
    });
});
describe('Paste option rearrange validation', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, enableLocalPaste: false, enableComment: true, enableRtl: true });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('Paste option rearrange validation', function () {
        editor.openBlank();
        editor.editor.insertText('כתובת');
        editor.editor.insertText(':');
        editor.editor.insertText('  ');
        editor.editor.insertText('כתובת');
        editor.selection.selectAll();
        editor.selection.copy();
        editor.editor.paste();
        editor.editor.applyPasteOptions('KeepTextOnly');
        expect((((editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0] as ParagraphWidget).childWidgets[0] as LineWidget).children[1] as TextElementBox).text).toBe(':  ');   
    });
});
let rtlDel: any = {"sections":[{"sectionFormat":{"pageWidth":612,"pageHeight":792,"leftMargin":63.79999923706055,"rightMargin":37.900001525878906,"topMargin":72,"bottomMargin":72,"differentFirstPage":false,"differentOddAndEvenPages":false,"headerDistance":0,"footerDistance":8.5,"bidi":true},"blocks":[{"paragraphFormat":{"textAlignment":"Right","styleName":"List Paragraph","listFormat":{"listId":8,"listLevelNumber":0},"bidi":true},"characterFormat":{"fontSize":10,"fontFamily":"Calibri","fontColor":"empty","bidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Calibri"},"inlines":[{"characterFormat":{"bold":true,"fontSize":10,"fontFamily":"Calibri","fontColor":"empty","bidi":true,"boldBidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Calibri"},"text":"ניהול מו"},{"characterFormat":{"bold":true,"fontSize":10,"fontFamily":"Calibri","fontColor":"empty","bidi":true,"boldBidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Calibri"},"text":"\""},{"characterFormat":{"bold":true,"fontSize":10,"fontFamily":"Calibri","fontColor":"empty","bidi":true,"boldBidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Calibri"},"text":"מ"},{"characterFormat":{"fontSize":10,"fontFamily":"Calibri","fontColor":"empty","bidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Calibri"},"text":" "},{"characterFormat":{"fontSize":10,"fontFamily":"Calibri","fontColor":"empty","bidi":true,"fontSizeBidi":10,"fontFamilyBidi":"Calibri"},"text":"עם ספקים בארץ ובחול"},{"characterFormat":{"fontSize":10,"fontFamily":"Calibri","fontColor":"empty","fontSizeBidi":10,"fontFamilyBidi":"Calibri"},"text":" "}]}],"headersFooters":{"header":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"footer":{"blocks":[{"paragraphFormat":{"textAlignment":"Center","styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8.5,"fontColor":"empty","fontSizeBidi":8.5},"inlines":[]}]},"evenHeader":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"evenFooter":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"firstPageHeader":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"firstPageFooter":{"blocks":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]}}}],"characterFormat":{"bold":false,"italic":false,"fontSize":11,"fontFamily":"Times New Roman","underline":"None","strikethrough":"None","baselineAlignment":"Normal","highlightColor":"NoColor","fontColor":"empty","boldBidi":false,"italicBidi":false,"fontSizeBidi":11,"fontFamilyBidi":"Times New Roman","allCaps":false},"paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":0,"afterSpacing":0,"lineSpacing":1,"lineSpacingType":"Multiple","listFormat":{},"bidi":false,"keepLinesTogether":false,"keepWithNext":false,"widowControl":true},"defaultTabWidth":36,"trackChanges":false,"enforcement":false,"hashValue":"","saltValue":"","formatting":false,"protectionType":"NoProtection","dontUseHTMLParagraphAutoSpacing":false,"formFieldShading":true,"compatibilityMode":3,"styles":[{"name":"Normal","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontSize":12,"fontColor":"empty","fontSizeBidi":12},"next":"Normal"},{"name":"Default Paragraph Font","type":"Character","characterFormat":{"fontColor":"empty"}},{"name":"apple-converted-space","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"Header","type":"Paragraph","paragraphFormat":{"listFormat":{},"tabs":[{"position":207.64999389648438,"deletePosition":0,"tabJustification":"Center","tabLeader":"None"},{"position":415.29998779296875,"deletePosition":0,"tabJustification":"Right","tabLeader":"None"}]},"characterFormat":{"fontColor":"empty"},"basedOn":"Normal","link":"Header Char","next":"Header"},{"name":"Header Char","type":"Character","characterFormat":{"fontSize":12,"fontColor":"empty","fontSizeBidi":12},"basedOn":"Default Paragraph Font"},{"name":"Footer","type":"Paragraph","paragraphFormat":{"listFormat":{},"tabs":[{"position":207.64999389648438,"deletePosition":0,"tabJustification":"Center","tabLeader":"None"},{"position":415.29998779296875,"deletePosition":0,"tabJustification":"Right","tabLeader":"None"}]},"characterFormat":{"fontColor":"empty"},"basedOn":"Normal","link":"Footer Char","next":"Footer"},{"name":"Footer Char","type":"Character","characterFormat":{"fontSize":12,"fontColor":"empty","fontSizeBidi":12},"basedOn":"Default Paragraph Font"},{"name":"Hyperlink","type":"Character","characterFormat":{"underline":"Single","fontColor":"#0000FFFF"},"basedOn":"Default Paragraph Font"},{"name":"Unresolved Mention1","type":"Character","characterFormat":{"fontColor":"#808080FF"},"basedOn":"Default Paragraph Font"},{"name":"FollowedHyperlink","type":"Character","characterFormat":{"underline":"Single","fontColor":"#800080FF"},"basedOn":"Default Paragraph Font"},{"name":"List Paragraph","type":"Paragraph","paragraphFormat":{"leftIndent":36,"listFormat":{},"contextualSpacing":true},"characterFormat":{"fontColor":"empty"},"basedOn":"Normal","next":"List Paragraph"},{"name":"annotation reference","type":"Character","characterFormat":{"fontSize":8,"fontColor":"empty","fontSizeBidi":8},"basedOn":"Default Paragraph Font"},{"name":"annotation text","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontSize":10,"fontColor":"empty","fontSizeBidi":10},"basedOn":"Normal","link":"Comment Text Char","next":"annotation text"},{"name":"Comment Text Char","type":"Character","characterFormat":{"fontColor":"empty"},"basedOn":"Default Paragraph Font"},{"name":"annotation subject","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"bold":true,"fontColor":"empty","boldBidi":true},"basedOn":"annotation text","link":"Comment Subject Char","next":"annotation text"},{"name":"Comment Subject Char","type":"Character","characterFormat":{"bold":true,"fontColor":"empty","boldBidi":true},"basedOn":"Comment Text Char"},{"name":"Balloon Text","type":"Paragraph","paragraphFormat":{"listFormat":{}},"characterFormat":{"fontSize":9,"fontFamily":"Tahoma","fontColor":"empty","fontSizeBidi":9,"fontFamilyBidi":"Tahoma"},"basedOn":"Normal","link":"Balloon Text Char","next":"Balloon Text"},{"name":"Balloon Text Char","type":"Character","characterFormat":{"fontSize":9,"fontFamily":"Tahoma","fontColor":"empty","fontSizeBidi":9,"fontFamilyBidi":"Tahoma"},"basedOn":"Default Paragraph Font"},{"name":"Heading 1","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":12,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level1","listFormat":{}},"characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":16,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 1 Char","next":"Normal"},{"name":"Heading 1 Char","type":"Character","characterFormat":{"fontSize":16,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":16,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 2","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level2","listFormat":{}},"characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 2 Char","next":"Normal"},{"name":"Heading 2 Char","type":"Character","characterFormat":{"fontSize":13,"fontFamily":"Calibri Light","fontColor":"#2F5496","fontSizeBidi":13,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 3","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level3","listFormat":{}},"characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 3 Char","next":"Normal"},{"name":"Heading 3 Char","type":"Character","characterFormat":{"fontSize":12,"fontFamily":"Calibri Light","fontColor":"#1F3763","fontSizeBidi":12,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 4","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level4","listFormat":{}},"characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496","italicBidi":true,"fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 4 Char","next":"Normal"},{"name":"Heading 4 Char","type":"Character","characterFormat":{"italic":true,"fontFamily":"Calibri Light","fontColor":"#2F5496","italicBidi":true,"fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 5","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level5","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 5 Char","next":"Normal"},{"name":"Heading 5 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#2F5496","fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"},{"name":"Heading 6","type":"Paragraph","paragraphFormat":{"leftIndent":0,"rightIndent":0,"firstLineIndent":0,"textAlignment":"Left","beforeSpacing":2,"afterSpacing":0,"lineSpacing":1.0791666507720947,"lineSpacingType":"Multiple","outlineLevel":"Level6","listFormat":{}},"characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyBidi":"Calibri Light"},"basedOn":"Normal","link":"Heading 6 Char","next":"Normal"},{"name":"Heading 6 Char","type":"Character","characterFormat":{"fontFamily":"Calibri Light","fontColor":"#1F3763","fontFamilyBidi":"Calibri Light"},"basedOn":"Default Paragraph Font"}],"lists":[{"abstractListId":8,"levelOverrides":[],"listId":8}],"abstractLists":[{"abstractListId":8,"levels":[{"characterFormat":{"fontFamily":"Symbol","fontColor":"empty","fontFamilyBidi":"Symbol"},"paragraphFormat":{"leftIndent":36,"firstLineIndent":-18,"listFormat":{}},"followCharacter":"Tab","listLevelPattern":"Bullet","numberFormat":"","restartLevel":0,"startAt":0},{"characterFormat":{"fontFamily":"Courier New","fontColor":"empty","fontFamilyBidi":"Courier New"},"paragraphFormat":{"leftIndent":72,"firstLineIndent":-18,"listFormat":{}},"followCharacter":"Tab","listLevelPattern":"Bullet","numberFormat":"o","restartLevel":0,"startAt":0},{"characterFormat":{"fontFamily":"Wingdings","fontColor":"empty","fontFamilyBidi":"Wingdings"},"paragraphFormat":{"leftIndent":108,"firstLineIndent":-18,"listFormat":{}},"followCharacter":"Tab","listLevelPattern":"Bullet","numberFormat":"","restartLevel":0,"startAt":0},{"characterFormat":{"fontFamily":"Symbol","fontColor":"empty","fontFamilyBidi":"Symbol"},"paragraphFormat":{"leftIndent":144,"firstLineIndent":-18,"listFormat":{}},"followCharacter":"Tab","listLevelPattern":"Bullet","numberFormat":"","restartLevel":0,"startAt":0},{"characterFormat":{"fontFamily":"Courier New","fontColor":"empty","fontFamilyBidi":"Courier New"},"paragraphFormat":{"leftIndent":180,"firstLineIndent":-18,"listFormat":{}},"followCharacter":"Tab","listLevelPattern":"Bullet","numberFormat":"o","restartLevel":0,"startAt":0},{"characterFormat":{"fontFamily":"Wingdings","fontColor":"empty","fontFamilyBidi":"Wingdings"},"paragraphFormat":{"leftIndent":216,"firstLineIndent":-18,"listFormat":{}},"followCharacter":"Tab","listLevelPattern":"Bullet","numberFormat":"","restartLevel":0,"startAt":0},{"characterFormat":{"fontFamily":"Symbol","fontColor":"empty","fontFamilyBidi":"Symbol"},"paragraphFormat":{"leftIndent":252,"firstLineIndent":-18,"listFormat":{}},"followCharacter":"Tab","listLevelPattern":"Bullet","numberFormat":"","restartLevel":0,"startAt":0},{"characterFormat":{"fontFamily":"Courier New","fontColor":"empty","fontFamilyBidi":"Courier New"},"paragraphFormat":{"leftIndent":288,"firstLineIndent":-18,"listFormat":{}},"followCharacter":"Tab","listLevelPattern":"Bullet","numberFormat":"o","restartLevel":0,"startAt":0},{"characterFormat":{"fontFamily":"Wingdings","fontColor":"empty","fontFamilyBidi":"Wingdings"},"paragraphFormat":{"leftIndent":324,"firstLineIndent":-18,"listFormat":{}},"followCharacter":"Tab","listLevelPattern":"Bullet","numberFormat":"","restartLevel":0,"startAt":0}]}],"comments":[],"revisions":[],"customXml":[],"footnotes":{"separator":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8.5,"fontColor":"empty","fontSizeBidi":8.5},"inlines":[{"characterFormat":{"fontSize":8.5,"fontColor":"empty","fontSizeBidi":8.5},"text":"\u0003"}]}],"continuationSeparator":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8.5,"fontColor":"empty","fontSizeBidi":8.5},"inlines":[{"characterFormat":{"fontSize":8.5,"fontColor":"empty","fontSizeBidi":8.5},"text":"\u0004"}]}],"continuationNotice":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]},"endnotes":{"separator":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8.5,"fontColor":"empty","fontSizeBidi":8.5},"inlines":[{"characterFormat":{"fontSize":8.5,"fontColor":"empty","fontSizeBidi":8.5},"text":"\u0003"}]}],"continuationSeparator":[{"paragraphFormat":{"styleName":"Normal","listFormat":{}},"characterFormat":{"fontSize":8.5,"fontColor":"empty","fontSizeBidi":8.5},"inlines":[{"characterFormat":{"fontSize":8.5,"fontColor":"empty","fontSizeBidi":8.5},"text":"\u0004"}]}],"continuationNotice":[{"paragraphFormat":{"listFormat":{}},"characterFormat":{},"inlines":[]}]}};
describe('RTL delete validation', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, enableLocalPaste: false, enableComment: true });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('RTL delete validation', function () {
        editor.open(JSON.stringify(rtlDel));
        editor.selection.select('0;0;30', '0;0;0');
        expect((editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0] as ParagraphWidget).childWidgets.length).toBe(1);                
    });
});
describe('undo redo validation', () => {
    let editor: DocumentEditor = undefined;
    beforeAll(() => {
        document.body.innerHTML = '';
        let ele: HTMLElement = createElement('div', { id: 'container' });
        document.body.appendChild(ele);
        editor = new DocumentEditor({ enableEditor: true, enableLocalPaste: false, enableEditorHistory: true, enableComment: true });
        DocumentEditor.Inject(Editor, Selection, EditorHistory);
        (editor.documentHelper as any).containerCanvasIn = TestHelper.containerCanvas;
        (editor.documentHelper as any).selectionCanvasIn = TestHelper.selectionCanvas;
        (editor.documentHelper.render as any).pageCanvasIn = TestHelper.pageCanvas;
        (editor.documentHelper.render as any).selectionCanvasIn = TestHelper.pageSelectionCanvas;
        editor.appendTo('#container');
    });
    afterAll((done) => {
        editor.destroy();
        document.body.removeChild(document.getElementById('container'));
        editor = undefined;
        document.body.innerHTML = '';
        setTimeout(() => {
            done();
        }, 1000);
    });
    it('undo redo validation', function () {
        editor.openBlank();
        editor.editor.insertText('h');
        editor.editor.insertText('e');
        editor.editor.insertText('l');
        editor.editor.insertText('l');
        editor.editor.insertText('0');
        editor.editorHistory.undo();
        editor.editorHistory.redo();
        expect((editor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0] as ParagraphWidget).childWidgets.length).toBe(1);        
    });
});