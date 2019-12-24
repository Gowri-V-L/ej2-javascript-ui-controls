import { createElement, Browser, closest } from '@syncfusion/ej2-base';
import {
    Toolbar as Tool, ClickEventArgs, MenuItemModel, Menu, MenuModel,
    BeforeOpenCloseMenuEventArgs as Menuopen, MenuEventArgs
} from '@syncfusion/ej2-navigations';
import { PdfViewer, PdfViewerBase, Toolbar, MeasureAnnotation } from '../index';
import { DropDownButton, BeforeOpenCloseMenuEventArgs, OpenCloseMenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { ColorPicker, Slider, ColorPickerEventArgs, ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { PdfAnnotationBaseModel, PdfFontModel } from '../../diagram/pdf-annotation-model';
import { ShapeAnnotation } from '../annotation';
import { cloneObject } from '../../diagram/drawing-util';
import { FreeTextAnnotation } from '../annotation/free-text-annotation';
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

/**
 * @hidden
 */
export class AnnotationToolbar {
    private pdfViewer: PdfViewer;
    private pdfViewerBase: PdfViewerBase;
    /**
     * @private
     */
    public primaryToolbar: Toolbar;
    /**
     * @private
     */
    public toolbarElement: HTMLElement;
    private highlightItem: HTMLElement;
    private underlineItem: HTMLElement;
    private strikethroughItem: HTMLElement;
    private deleteItem: HTMLElement;
    /**
     * @private
     */
    public freeTextEditItem: HTMLElement;
    /**
     * @private
     */
    public colorDropDownElement: HTMLElement;
    private strokeDropDownElement: HTMLElement;
    private thicknessElement: HTMLElement;
    private shapeElement: HTMLElement;
    private calibrateElement: HTMLElement;
    private stampElement: HTMLElement;
    private opacityDropDownElement: HTMLElement;
    private colorDropDown: DropDownButton;
    private opacityDropDown: DropDownButton;
    private strokeDropDown: DropDownButton;
    private thicknessDropDown: DropDownButton;
    private shapeDropDown: DropDownButton;
    private calibrateDropDown: DropDownButton;
    private commentItem: HTMLElement;
    private closeItem: HTMLElement;
    private opacityIndicator: HTMLElement;
    private thicknessIndicator: HTMLElement;
    private toolbar: Tool;
    /**
     * @private
     */
    public colorPalette: ColorPicker;
    private strokeColorPicker: ColorPicker;
    private opacitySlider: Slider;
    private thicknessSlider: Slider;
    private toolbarBorderHeight: number = 1;
    /**
     * @private
     */
    public isToolbarHidden: boolean = false;
    /**
     * @private
     */
    public isMobileAnnotEnabled: boolean = false;
    private isHighlightEnabled: boolean = false;
    private isUnderlineEnabled: boolean = false;
    private isStrikethroughEnabled: boolean = false;
    private isHighlightBtnVisible: boolean = true;
    private isUnderlineBtnVisible: boolean = true;
    private isStrikethroughBtnVisible: boolean = true;
    private isColorToolVisible: boolean = true;
    private isOpacityToolVisible: boolean = true;
    private isDeleteAnnotationToolVisible: boolean = true;
    private isCurrentAnnotationOpacitySet: boolean = false;
    private isStampBtnVisible: boolean = false;
    private isShapeBtnVisible: boolean = false;
    private isFreeTextBtnVisible: boolean = false;
    private isCalibrateBtnVisible: boolean = false;
    private isStrokeColorToolVisible: boolean = false;
    private isThicknessToolVisible: boolean = false;
    // tslint:disable-next-line
    private menuItems: any;
    private fontSize: ComboBox;
    private fontFamily: ComboBox;

    private stampMenu: MenuItemModel[] = [];
    private stampParentID: string = '';
    private fontColorPalette: ColorPicker;
    private fontFamilyElement: HTMLElement;
    private fontSizeElement: HTMLElement;
    private fontColorElement: HTMLElement;
    private textAlignElement: HTMLElement;
    private textPropElement: HTMLElement;
    private alignmentToolbar: Tool;
    private propertiesToolbar: Tool;
    private fontColorDropDown: DropDownButton;
    private textAlignDropDown: DropDownButton;
    private textPropertiesDropDown: DropDownButton;
    /**
     * @private
     */
    public handWrittenSignatureItem: HTMLElement;
    constructor(viewer: PdfViewer, viewerBase: PdfViewerBase, toolbar: Toolbar) {
        this.pdfViewer = viewer;
        this.pdfViewerBase = viewerBase;
        this.primaryToolbar = toolbar;
    }

    /**
     * @private
     */
    public initializeAnnotationToolbar(): void {
        // tslint:disable-next-line:max-line-length
        this.toolbarElement = createElement('div', { id: this.pdfViewer.element.id + '_annotation_toolbar', className: 'e-pv-annotation-toolbar' });
        this.pdfViewerBase.viewerMainContainer.appendChild(this.toolbarElement);
        this.toolbar = new Tool({
            width: '', height: '', overflowMode: 'Popup',
            items: this.createToolbarItems(), clicked: this.onToolbarClicked.bind(this),
            created: () => {
                this.createDropDowns();
            }
        });
        this.toolbar.isStringTemplate = true;
        if (this.pdfViewer.enableRtl) {
            this.toolbar.enableRtl = true;
        }
        this.toolbar.appendTo(this.toolbarElement);
        this.afterToolbarCreation();
        this.createStampContainer();
        this.showAnnotationToolbar(null);
        this.applyAnnotationToolbarSettings();
        this.updateToolbarItems();
    }
    public createMobileAnnotationToolbar(isEnable: boolean): void {
        if (Browser.isDevice) {
            if (this.toolbarElement == null && isEnable) {
                this.isMobileAnnotEnabled = true;
                // tslint:disable-next-line:max-line-length
                this.toolbarElement = createElement('div', { id: this.pdfViewer.element.id + '_annotation_toolbar', className: 'e-pv-annotation-toolbar' });
                this.pdfViewerBase.viewerMainContainer.insertBefore(this.toolbarElement, this.pdfViewerBase.viewerContainer);
                this.toolbar = new Tool({
                    width: '', height: '', overflowMode: 'Popup',
                    items: this.createMobileToolbarItems(), clicked: this.onToolbarClicked.bind(this),
                    created: () => {
                        this.createDropDowns();
                    }
                });
                this.toolbar.isStringTemplate = true;
                if (this.pdfViewer.enableRtl) {
                    this.toolbar.enableRtl = true;
                }
                this.pdfViewerBase.navigationPane.goBackToToolbar();
                this.pdfViewer.toolbarModule.showToolbar(false);
                this.toolbar.appendTo(this.toolbarElement);
                this.deleteItem = this.pdfViewerBase.getElement('_annotation_delete');
                this.deleteItem.firstElementChild.id = this.pdfViewer.element.id + '_annotation_delete';
            } else if (this.toolbarElement != null) {
                if (isEnable) {
                    this.isMobileAnnotEnabled = true;
                    this.pdfViewerBase.navigationPane.goBackToToolbar();
                    this.pdfViewer.toolbarModule.showToolbar(false);
                    this.toolbarElement.style.display = 'block';
                } else if (!isEnable) {
                    this.isMobileAnnotEnabled = false;
                    this.pdfViewer.toolbarModule.showToolbar(true);
                    this.hideMobileAnnotationToolbar();
                }
            }
        } else {
            this.isMobileAnnotEnabled = true;
        }
    }
    public hideMobileAnnotationToolbar(): void {
        if (this.toolbarElement != null) {
            this.toolbarElement.style.display = 'none';
        }
    }
    // tslint:disable-next-line
    private createMobileToolbarItems(): any[] {
        let colorTemplate: string = this.getTemplate('span', '_annotation_color', 'e-pv-annotation-color-container');
        let opacityTemplate: string = this.getTemplate('span', '_annotation_opacity', 'e-pv-annotation-opacity-container');
        // tslint:disable-next-line
        let items: any[] = [];
        items.push({ prefixIcon: 'e-pv-backward-icon e-pv-icon', tooltipText: this.pdfViewer.localeObj.getConstant('Go Back'), id: this.pdfViewer.element.id + '_backward', click: this.goBackToToolbar.bind(this) });
        // tslint:disable-next-line:max-line-length
        items.push({ template: colorTemplate, align: 'right' });
        items.push({ template: opacityTemplate, align: 'right' });
        items.push({ type: 'Separator', align: 'right' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-annotation-delete-icon e-pv-icon', className: 'e-pv-annotation-delete-container', id: this.pdfViewer.element.id + '_annotation_delete', align: 'right' });
        return items;
    }
    private goBackToToolbar(): void {
        this.isMobileAnnotEnabled = false;
        this.hideMobileAnnotationToolbar();
        this.pdfViewer.toolbarModule.showToolbar(true);
        let page: number = this.pdfViewerBase.getSelectTextMarkupCurrentPage();
        if (page) {
            this.pdfViewer.annotationModule.textMarkupAnnotationModule.selectTextMarkupCurrentPage = null;
            this.pdfViewer.annotationModule.textMarkupAnnotationModule.clearAnnotationSelection(page);
        }
    }
    // tslint:disable-next-line
    private createToolbarItems(): any[] {
        let colorTemplate: string = this.getTemplate('span', '_annotation_color', 'e-pv-annotation-color-container');
        let strokeTemplate: string = this.getTemplate('span', '_annotation_stroke', 'e-pv-annotation-stroke-container');
        let thicknessTemplate: string = this.getTemplate('span', '_annotation_thickness', 'e-pv-annotation-thickness-container');
        let opacityTemplate: string = this.getTemplate('span', '_annotation_opacity', 'e-pv-annotation-opacity-container');
        let shapesTemplate: string = this.getTemplate('span', '_annotation_shapes', 'e-pv-annotation-shapes-container');
        let calibrateTemplate: string = this.getTemplate('span', '_annotation_calibrate', 'e-pv-annotation-calibrate-container');
        let stampTemplate: string = this.getTemplate('span', '_annotation_stamp', 'e-pv-annotation-stamp-container');
        let fontFamilyTemplate: string = this.getTemplate('input', '_annotation_fontname', 'e-pv-annotation-fontname-container');
        let fontSizeTemplate: string = this.getTemplate('input', '_annotation_fontsize', 'e-pv-annotation-fontsize-container');
        let textColorTemplate: string = this.getTemplate('span', '_annotation_textcolor', 'e-pv-annotation-textcolor-container');
        let alignmentTemplate: string = this.getTemplate('span', '_annotation_textalign', 'e-pv-annotation-textalign-container');
        let textPropertiesTemplate: string = this.getTemplate('span', '_annotation_textproperties', 'e-pv-annotation-textprop-container');

        // tslint:disable-next-line
        let items: any[] = [];
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-highlight-icon e-pv-icon', className: 'e-pv-highlight-container', id: this.pdfViewer.element.id + '_highlight', align: 'Left' });
        items.push({ prefixIcon: 'e-pv-underline-icon e-pv-icon', className: 'e-pv-underline-container', id: this.pdfViewer.element.id + '_underline', align: 'Left' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-strikethrough-icon e-pv-icon', className: 'e-pv-strikethrough-container', id: this.pdfViewer.element.id + '_strikethrough', align: 'Left' });
        items.push({ type: 'Separator', align: 'Left' });
        items.push({ template: shapesTemplate, align: 'Left' });
        items.push({ type: 'Separator', align: 'Left' });
        items.push({ template: calibrateTemplate, align: 'Left' });
        items.push({ type: 'Separator', align: 'Left' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-freetext-icon e-pv-icon', className: 'e-pv-annotation-freetextedit-container', id: this.pdfViewer.element.id + '_annotation_freeTextEdit', align: 'Left' });
        items.push({ type: 'Separator', align: 'Left' });
        items.push({ template: stampTemplate, align: 'Left' });
        items.push({ type: 'Separator', align: 'Left' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-handwritten-icon e-pv-icon', className: 'e-pv-annotation-handwritten-container', id: this.pdfViewer.element.id + '_annotation_signature', align: 'Left' });
        items.push({ type: 'Separator', align: 'Left' });
        items.push({ template: fontFamilyTemplate, align: 'Left' });
        items.push({ template: fontSizeTemplate, align: 'Left' });
        items.push({ template: textColorTemplate, align: 'Left' });
        items.push({ template: alignmentTemplate, align: 'Left' });
        items.push({ template: textPropertiesTemplate, align: 'Left' });
        items.push({ type: 'Separator', align: 'Left' });
        items.push({ template: colorTemplate, align: 'Left' });
        items.push({ template: strokeTemplate, align: 'Left' });
        items.push({ template: thicknessTemplate, align: 'Left' });
        items.push({ template: opacityTemplate, align: 'Left' });
        items.push({ type: 'Separator', align: 'Left' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-annotation-delete-icon e-pv-icon', className: 'e-pv-annotation-delete-container', id: this.pdfViewer.element.id + '_annotation_delete', align: 'Left' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-comment-panel-icon e-pv-icon', className: 'e-pv-comment-panel-icon-container', id: this.pdfViewer.element.id + '_annotation_commentPanel', align: 'Right' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-annotation-tools-close-icon e-pv-icon', className: 'e-pv-annotation-tools-close-container', id: this.pdfViewer.element.id + '_annotation_close', align: 'Right' });
        return items;
    }

    private getTemplate(elementName: string, id: string, className: string): string {
        let element: HTMLElement = createElement(elementName, { id: this.pdfViewer.element.id + id });
        if (className) {
            element.className = className;
        }
        return element.outerHTML;
    }
    // tslint:disable-next-line
    private createStampContainer(): any {
        this.stampElement = this.pdfViewerBase.getElement('_annotation_stamp');
        // tslint:disable-next-line:max-line-length
        this.primaryToolbar.createTooltip(this.pdfViewerBase.getElement('_annotation_stamp'), this.pdfViewer.localeObj.getConstant('Add Stamp'));
        let contextMenuElement: HTMLElement = createElement('ul', { id: 'contextMenuElement' });
        this.pdfViewerBase.getElement('_annotation_stamp').appendChild(contextMenuElement);
        this.stampMenu = [
            {
                iconCss: 'e-pv-stamp-icon e-pv-icon',
                items: [
                    {
                        text: 'Dynamic',
                        items: [
                            { text: 'Revised' },
                            { text: 'Reviewed' },
                            { text: 'Received' },
                            { text: 'Approved' },
                            { text: 'Confidential' },
                        ]
                    },
                    {
                        text: 'Sign Here',
                        items: [
                            { text: 'Witness' },
                            { text: 'Initial Here' },
                            { text: 'Sign Here' },
                            { text: 'Accepted' },
                            { text: 'Rejected' },
                        ]
                    },
                    {
                        text: 'Standard Business',
                        items: [
                            { text: 'Approved' },
                            { text: 'Not Approved' },
                            { text: 'Draft' },
                            { text: 'Final' },
                            { text: 'Completed' },
                            { text: 'Confidential' },
                            { text: 'For Public Release' },
                            { text: 'Not For Public Release' },
                            { text: 'For Comment' },
                            { text: 'Void' },
                            { text: 'Preliminary Results ' },
                            { text: 'Information Only ' },
                        ]
                    },
                    { separator: true },
                    { text: 'Custom Stamp', items: [] }
                ],
            },
        ];
        let menuOptions: MenuModel = {
            items: this.stampMenu,
            cssClass: 'e-custom-scroll',
            showItemOnClick: true,
            enableScrolling: true,
            beforeOpen: (args: Menuopen): void => {
                this.resetFreeTextAnnot();
                if (args.parentItem.text === '' && this.pdfViewer.customStampSettings.isAddToSubMenu && args.items.length > 0) {
                    // tslint:disable-next-line
                    let currentElements: any = null;
                    for (let i: number = 0; i < args.items.length; i++) {
                        if (args.items[i].text === 'Custom Stamp') {
                            args.items[i].items = [];
                            currentElements = args.items[i];
                            break;
                        }
                    }
                    // tslint:disable-next-line
                    let elements: any = this.pdfViewerBase.customStampCollection;
                    // tslint:disable-next-line
                    let stampElements: any = this.pdfViewer.customStampItems;
                    if (elements.length === 0 && stampElements && stampElements.length > 0) {
                        for (let n: number = 0; n < stampElements.length; n++) {
                            // tslint:disable-next-line:max-line-length
                            elements.push({ customStampName: stampElements[n].customStampName, customStampImageSource: stampElements[n].customStampImageSource });
                        }
                    }
                    for (let m: number = 0; m < elements.length; m++) {
                        if (currentElements != null) {
                            currentElements.items.push({ text: elements[m].customStampName });
                        }
                    }
                }
                if (args.parentItem.text === 'Standard Business') {
                    (closest(args.element, '.e-menu-wrapper') as HTMLElement).style.height = '320px';
                }
                this.stampParentID = args.parentItem.text;
                this.menuItems.showItemOnClick = false;
            },
            beforeClose: (args: Menuopen) => {
                // tslint:disable-next-line:max-line-length
                if ((args.parentItem && args.parentItem.text !== 'Custom Stamp' && args.parentItem.text !== 'Standard Business' && args.parentItem.text !== 'Dynamic' && args.parentItem.text !== 'Sign Here') || !args.parentItem) {
                    this.menuItems.showItemOnClick = true;
                }
            },
            select: (args: MenuEventArgs): void => {
                this.pdfViewerBase.isAlreadyAdded = false;
                if (args.item.text === 'Custom Stamp') {
                    this.updateInteractionTools();
                    this.pdfViewer.annotation.stampAnnotationModule.isStampAddMode = true;
                    // tslint:disable-next-line
                    let stampImage: any = createElement('input', { id: this.pdfViewer.element.id + '_stampElement', attrs: { 'type': 'file' } });
                    stampImage.setAttribute('accept', '.jpg,.jpeg');
                    stampImage.style.position = 'absolute';
                    stampImage.style.left = '0px';
                    stampImage.style.top = '0px';
                    stampImage.style.visibility = 'hidden';
                    document.body.appendChild(stampImage);
                    stampImage.click();
                    stampImage.addEventListener('change', this.addStampImage);
                    document.body.removeChild(stampImage);
                    // tslint:disable-next-line:max-line-length
                } else if (this.stampParentID === 'Custom Stamp' && args.item.text !== '') {
                    // tslint:disable-next-line
                    let elements: any = this.pdfViewerBase.customStampCollection;
                    for (let n: number = 0; n < elements.length; n++) {
                        if (elements[n].customStampName === args.item.text) {
                            this.pdfViewer.annotation.stampAnnotationModule.isStampAddMode = true;
                            this.pdfViewer.annotationModule.stampAnnotationModule.isStampAnnotSelected = true;
                            this.pdfViewerBase.stampAdded = true;
                            this.pdfViewerBase.isAlreadyAdded = true;
                            // tslint:disable-next-line:max-line-length
                            this.pdfViewer.annotationModule.stampAnnotationModule.createCustomStampAnnotation(elements[n].customStampImageSource);
                            this.pdfViewerBase.stampAdded = false;
                        }
                    }
                    // tslint:disable-next-line:max-line-length
                } else if (args.item.text !== 'Dynamic' && args.item.text !== '' && args.item.text !== 'Standard Business' && (this.stampParentID === 'Sign Here' || args.item.text !== 'Sign Here')) {
                    this.updateInteractionTools();
                    this.pdfViewer.annotation.stampAnnotationModule.isStampAddMode = true;
                    this.pdfViewer.annotationModule.stampAnnotationModule.isStampAnnotSelected = true;
                    this.pdfViewerBase.stampAdded = true;
                    if (this.stampParentID === 'Dynamic') {
                        this.pdfViewerBase.isDynamicStamp = true;
                        this.pdfViewer.annotationModule.stampAnnotationModule.retrieveDynamicStampAnnotation(args.item.text);
                    } else {
                        this.pdfViewerBase.isDynamicStamp = false;
                        this.pdfViewer.annotationModule.stampAnnotationModule.retrievestampAnnotation(args.item.text);
                    }
                }
            },
        };
        this.menuItems = new Menu(menuOptions, '#contextMenuElement');
        contextMenuElement.parentElement.classList.add('e-pv-stamp');
        return contextMenuElement;
    }
    // tslint:disable-next-line
    private addStampImage = (args: any): void => {
        // tslint:disable-next-line
        let proxy: any = this;
        // tslint:disable-next-line
        let upoadedFiles: any = args.target.files;
        if (args.target.files[0] !== null) {
            let uploadedFile: File = upoadedFiles[0];
            if (uploadedFile.type.split('/')[0] === 'image') {
                let reader: FileReader = new FileReader();
                // tslint:disable-next-line
                reader.onload = (e: any): void => {
                    let uploadedFileUrl: string = e.currentTarget.result;
                    proxy.pdfViewer.annotation.stampAnnotationModule.isStampAddMode = true;
                    proxy.pdfViewer.annotationModule.stampAnnotationModule.isStampAnnotSelected = true;
                    proxy.pdfViewerBase.stampAdded = true;
                    this.pdfViewer.annotationModule.stampAnnotationModule.createCustomStampAnnotation(uploadedFileUrl);
                    proxy.pdfViewerBase.stampAdded = false;
                };
                reader.readAsDataURL(uploadedFile);
            }
        }
    }
    private createDropDowns(): void {
        if (!Browser.isDevice) {
            this.shapeElement = this.pdfViewerBase.getElement('_annotation_shapes');
            let shapeToolbar: Tool = this.createShapeOptions(this.shapeElement.id, true);
            // tslint:disable-next-line:max-line-length
            this.shapeDropDown = this.createDropDownButton(this.shapeElement, 'e-pv-annotation-shape-icon', shapeToolbar.element, this.pdfViewer.localeObj.getConstant('Add Shapes'));
            this.calibrateElement = this.pdfViewerBase.getElement('_annotation_calibrate');
            let calibrateToolbar: Tool = this.createShapeOptions(this.calibrateElement.id, false);
            // tslint:disable-next-line:max-line-length
            this.calibrateDropDown = this.createDropDownButton(this.calibrateElement, 'e-pv-annotation-calibrate-icon', calibrateToolbar.element, this.pdfViewer.localeObj.getConstant('Calibrate'));
        }
        this.colorDropDownElement = this.pdfViewerBase.getElement('_annotation_color');
        this.colorPalette = this.createColorPicker(this.colorDropDownElement.id);
        this.colorPalette.change = this.onColorPickerChange.bind(this);
        // tslint:disable-next-line:max-line-length
        this.colorDropDown = this.createDropDownButton(this.colorDropDownElement, 'e-pv-annotation-color-icon', this.colorPalette.element.parentElement, this.pdfViewer.localeObj.getConstant('Color edit'));
        this.colorDropDown.beforeOpen = this.colorDropDownBeforeOpen.bind(this);
        this.colorDropDown.open = this.colorDropDownOpen.bind(this);
        this.pdfViewerBase.getElement('_annotation_color-popup').addEventListener('click', this.onColorPickerCancelClick.bind(this));
        if (!Browser.isDevice) {
            this.strokeDropDownElement = this.pdfViewerBase.getElement('_annotation_stroke');
            this.strokeColorPicker = this.createColorPicker(this.strokeDropDownElement.id);
            this.strokeColorPicker.change = this.onStrokePickerChange.bind(this);
            // tslint:disable-next-line:max-line-length
            this.strokeDropDown = this.createDropDownButton(this.strokeDropDownElement, 'e-pv-annotation-stroke-icon', this.strokeColorPicker.element.parentElement, this.pdfViewer.localeObj.getConstant('Stroke edit'));
            this.strokeDropDown.beforeOpen = this.strokeDropDownBeforeOpen.bind(this);
            this.strokeDropDown.open = this.strokeDropDownOpen.bind(this);
            this.pdfViewerBase.getElement('_annotation_stroke-popup').addEventListener('click', this.onStrokePickerCancelClick.bind(this));
            this.thicknessElement = this.pdfViewerBase.getElement('_annotation_thickness');
            let thicknessContainer: HTMLElement = this.createThicknessSlider(this.thicknessElement.id);
            // tslint:disable-next-line:max-line-length
            this.thicknessDropDown = this.createDropDownButton(this.thicknessElement, 'e-pv-annotation-thickness-icon', thicknessContainer, this.pdfViewer.localeObj.getConstant('Change thickness'));
            this.thicknessDropDown.beforeOpen = this.thicknessDropDownBeforeOpen.bind(this);
            this.thicknessSlider.change = this.thicknessChange.bind(this);
            this.thicknessSlider.changed = this.thicknessChange.bind(this);
            this.thicknessDropDown.open = this.thicknessDropDownOpen.bind(this);
        }
        this.opacityDropDownElement = this.pdfViewerBase.getElement('_annotation_opacity');
        let sliderContainer: HTMLElement = this.createSlider(this.opacityDropDownElement.id);
        // tslint:disable-next-line:max-line-length
        this.opacityDropDown = this.createDropDownButton(this.opacityDropDownElement, 'e-pv-annotation-opacity-icon', sliderContainer, this.pdfViewer.localeObj.getConstant('Opacity edit'));
        this.opacityDropDown.beforeOpen = this.opacityDropDownBeforeOpen.bind(this);
        this.opacitySlider.change = this.opacityChange.bind(this);
        this.opacitySlider.changed = this.opacityChange.bind(this);
        this.opacityDropDown.open = this.opacityDropDownOpen.bind(this);
        if (!Browser.isDevice) {
            this.fontFamilyElement = this.pdfViewerBase.getElement('_annotation_fontname');
            this.createDropDownListForFamily(this.fontFamilyElement);
            this.fontFamilyElement.style.textAlign = 'left';
            this.fontFamilyElement.addEventListener('change', (): void => { this.onFontFamilyChange.bind(this); });
            this.fontSizeElement = this.pdfViewerBase.getElement('_annotation_fontsize');
            this.createDropDownListForSize(this.fontSizeElement);
            this.fontColorElement = this.pdfViewerBase.getElement('_annotation_textcolor');
            this.fontColorPalette = this.createColorPicker(this.fontColorElement.id);
            this.fontColorPalette.change = this.onFontColorChange.bind(this);
            // tslint:disable-next-line:max-line-length
            this.fontColorDropDown = this.createDropDownButton(this.fontColorElement, 'e-pv-annotation-textcolor-icon', this.fontColorPalette.element.parentElement, this.pdfViewer.localeObj.getConstant('Font color'));
            this.textAlignElement = this.pdfViewerBase.getElement('_annotation_textalign');
            this.alignmentToolbar = this.createShapeOptions(this.textAlignElement.id, undefined, true);
            // tslint:disable-next-line:max-line-length
            this.textAlignDropDown = this.createDropDownButton(this.textAlignElement, 'e-pv-annotation-textalign-icon', this.alignmentToolbar.element, this.pdfViewer.localeObj.getConstant('Text Align'));
            this.textAlignDropDown.beforeOpen = this.textAlignDropDownBeforeOpen.bind(this);
            this.textPropElement = this.pdfViewerBase.getElement('_annotation_textproperties');
            this.propertiesToolbar = this.createShapeOptions(this.textPropElement.id, undefined, false, true);
            // tslint:disable-next-line:max-line-length
            this.textPropertiesDropDown = this.createPropDropDownButton(this.textPropElement, 'e-pv-annotation-textprop-icon', this.propertiesToolbar.element, this.pdfViewer.localeObj.getConstant('Text Properties'));
            this.textPropertiesDropDown.beforeOpen = this.textPropertiesDropDownBeforeOpen.bind(this);
        }
    }

    private opacityDropDownOpen(args: OpenCloseMenuEventArgs): void {
        if (Browser.isDevice) {
            // tslint:disable-next-line:max-line-length
            let opacityElement: HTMLElement = this.pdfViewerBase.getElement('_annotation_opacity-popup');
            opacityElement.style.left = '0px';
        } else {
            this.calculateToolbarPosition(args);
        }
    }

    private onColorPickerCancelClick(event: MouseEvent): void {
        if ((event.target as HTMLElement).classList.contains('e-cancel')) {
            this.colorDropDown.toggle();
        }
    }

    private onStrokePickerCancelClick(event: MouseEvent): void {
        if ((event.target as HTMLElement).classList.contains('e-cancel')) {
            this.strokeDropDown.toggle();
        }
    }

    private colorDropDownBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        this.colorPalette.noColor = false;
        if (this.pdfViewer.annotationModule.textMarkupAnnotationModule) {
            if (this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
                this.colorPalette.value = this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation.color;
            } else {
                this.setCurrentColorInPicker();
            }
        }
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            this.colorPalette.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.fill;
            this.colorPalette.noColor = true;
        } else {
            this.setCurrentColorInPicker();
        }
        this.colorPalette.refresh();
        this.updateColorInIcon(this.colorDropDownElement, this.colorPalette.value);
    }

    /**
     * @private
     */
    public setCurrentColorInPicker(): void {
        if (this.pdfViewer.annotationModule.textMarkupAnnotationModule) {
            switch (this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAddMode) {
                case 'Highlight':
                    // tslint:disable-next-line:max-line-length
                    this.setColorInPicker(this.colorPalette, this.pdfViewer.annotationModule.textMarkupAnnotationModule.highlightColor);
                    break;
                case 'Underline':
                    // tslint:disable-next-line:max-line-length
                    this.setColorInPicker(this.colorPalette, this.pdfViewer.annotationModule.textMarkupAnnotationModule.underlineColor);
                    break;
                case 'Strikethrough':
                    // tslint:disable-next-line:max-line-length
                    this.setColorInPicker(this.colorPalette, this.pdfViewer.annotationModule.textMarkupAnnotationModule.strikethroughColor);
                    break;
            }
        }
        if (this.pdfViewer.annotation.shapeAnnotationModule) {
            switch (this.pdfViewer.annotationModule.shapeAnnotationModule.currentAnnotationMode) {
                case 'Line':
                    // tslint:disable-next-line:max-line-length
                    this.setColorInPicker(this.colorPalette, this.pdfViewer.annotationModule.shapeAnnotationModule.lineFillColor);
                    break;
                case 'Arrow':
                    // tslint:disable-next-line:max-line-length
                    this.setColorInPicker(this.colorPalette, this.pdfViewer.annotationModule.shapeAnnotationModule.arrowFillColor);
                    break;
                case 'Rectangle':
                    // tslint:disable-next-line:max-line-length
                    this.setColorInPicker(this.colorPalette, this.pdfViewer.annotationModule.shapeAnnotationModule.rectangleFillColor);
                    break;
                case 'Circle':
                    // tslint:disable-next-line:max-line-length
                    this.setColorInPicker(this.colorPalette, this.pdfViewer.annotationModule.shapeAnnotationModule.circleFillColor);
                    break;
                case 'Polygon':
                    // tslint:disable-next-line:max-line-length
                    this.setColorInPicker(this.colorPalette, this.pdfViewer.annotationModule.shapeAnnotationModule.polygonFillColor);
                    break;
            }
        }
        this.updateColorInIcon(this.colorDropDownElement, this.colorPalette.value);
    }

    private colorDropDownOpen(): void {
        if (Browser.isDevice) {
            // tslint:disable-next-line:max-line-length
            this.pdfViewerBase.getElement('_annotation_color-popup').style.left = '0px';
        }
        this.colorPalette.refresh();
    }

    private strokeDropDownBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            this.strokeColorPicker.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeColor;
        } else {
            this.setCurrentStrokeColorInPicker();
        }
        this.strokeColorPicker.refresh();
        this.updateColorInIcon(this.strokeDropDownElement, this.strokeColorPicker.value);
    }

    private setCurrentStrokeColorInPicker(): void {
        if (this.pdfViewer.annotation.shapeAnnotationModule) {
            switch (this.pdfViewer.annotationModule.shapeAnnotationModule.currentAnnotationMode) {
                case 'Line':
                    // tslint:disable-next-line:max-line-length
                    this.setColorInPicker(this.strokeColorPicker, this.pdfViewer.annotationModule.shapeAnnotationModule.lineStrokeColor);
                    break;
                case 'Arrow':
                    // tslint:disable-next-line:max-line-length
                    this.setColorInPicker(this.strokeColorPicker, this.pdfViewer.annotationModule.shapeAnnotationModule.arrowStrokeColor);
                    break;
                case 'Rectangle':
                    // tslint:disable-next-line:max-line-length
                    this.setColorInPicker(this.strokeColorPicker, this.pdfViewer.annotationModule.shapeAnnotationModule.rectangleStrokeColor);
                    break;
                case 'Circle':
                    // tslint:disable-next-line:max-line-length
                    this.setColorInPicker(this.strokeColorPicker, this.pdfViewer.annotationModule.shapeAnnotationModule.circleStrokeColor);
                    break;
                case 'Polygon':
                    // tslint:disable-next-line:max-line-length
                    this.setColorInPicker(this.strokeColorPicker, this.pdfViewer.annotationModule.shapeAnnotationModule.polygonStrokeColor);
                    break;
            }
        }
    }

    private strokeDropDownOpen(): void {
        this.strokeColorPicker.refresh();
    }

    private onFontColorChange(args: ColorPickerEventArgs): void {
        let currentColor: string = (args.currentValue.hex === '') ? '#ffffff00' : args.currentValue.hex;
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            this.pdfViewer.annotation.modifyFontColor(currentColor);
        }
        this.updateColorInIcon(this.fontColorElement, currentColor);
        this.fontColorDropDown.toggle();
    }

    // tslint:disable-next-line
    private onFontFamilyChange(args: any): void {
        let currentValue: string = (args && args.fontFamily && args.fontFamily.value) ? args.fontFamily.value : '';
        if (this.pdfViewer.selectedItems.annotations.length === 1 && currentValue) {
            this.pdfViewer.annotation.modifyFontFamily(currentValue);
        }
    }

    // tslint:disable-next-line
    private onFontSizeChange(args: any): void {
        let currentValue: string = (args && args.fontSize && args.fontSize.value) ? args.fontSize.value : '';
        if (this.pdfViewer.selectedItems.annotations.length === 1 && currentValue) {
            let fontSize: number = parseFloat(currentValue);
            this.pdfViewer.annotation.modifyFontSize(fontSize);
        }
    }

    private textAlignDropDownBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            if (args.element.getElementsByTagName('button') && args.element.getElementsByTagName('button').length > 0) {
                // tslint:disable-next-line
                let dropDownOptions: any = args.element.getElementsByTagName('button');
                // tslint:disable-next-line
                let selectedAnnotation: any = this.pdfViewer.selectedItems.annotations[0];
                for (let n: number = 0; n < dropDownOptions.length; n++) {
                    if (dropDownOptions[n]) {
                        dropDownOptions[n].classList.remove('textprop-option-active');
                        // tslint:disable-next-line:max-line-length
                        if (dropDownOptions[n].id === (this.pdfViewer.element.id + '_left_align') && selectedAnnotation.textAlign === 'Left') {
                            dropDownOptions[n].classList.add('textprop-option-active');
                        }
                        // tslint:disable-next-line:max-line-length
                        if (dropDownOptions[n].id === (this.pdfViewer.element.id + '_right_align') && selectedAnnotation.textAlign === 'Right') {
                            dropDownOptions[n].classList.add('textprop-option-active');
                        }
                        // tslint:disable-next-line:max-line-length
                        if (dropDownOptions[n].id === (this.pdfViewer.element.id + '_center_align') && selectedAnnotation.textAlign === 'Center') {
                            dropDownOptions[n].classList.add('textprop-option-active');
                        }
                        // tslint:disable-next-line:max-line-length
                        if (dropDownOptions[n].id === (this.pdfViewer.element.id + '_justify_align') && selectedAnnotation.textAlign === 'Justify') {
                            dropDownOptions[n].classList.add('textprop-option-active');
                        }
                    }
                }
            }
        }
    }

    private textPropertiesDropDownBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            if (args.element.getElementsByTagName('button') && args.element.getElementsByTagName('button').length > 0) {
                // tslint:disable-next-line
                let dropDownOptions: any = args.element.getElementsByTagName('button');
                // tslint:disable-next-line
                let selectedAnnotation: any = this.pdfViewer.selectedItems.annotations[0];
                for (let n: number = 0; n < dropDownOptions.length; n++) {
                    if (dropDownOptions[n]) {
                        dropDownOptions[n].classList.remove('textprop-option-active');
                        if (dropDownOptions[n].id === (this.pdfViewer.element.id + '_bold') && selectedAnnotation.font.isBold) {
                            dropDownOptions[n].classList.add('textprop-option-active');
                        }
                        if (dropDownOptions[n].id === (this.pdfViewer.element.id + '_italic') && selectedAnnotation.font.isItalic) {
                            dropDownOptions[n].classList.add('textprop-option-active');
                        }
                        if (dropDownOptions[n].id === (this.pdfViewer.element.id + '_strikeout') && selectedAnnotation.font.isStrikeout) {
                            dropDownOptions[n].classList.add('textprop-option-active');
                        }
                        // tslint:disable-next-line:max-line-length
                        if (dropDownOptions[n].id === (this.pdfViewer.element.id + '_underline_textinput') && selectedAnnotation.font.isUnderline) {
                            dropDownOptions[n].classList.add('textprop-option-active');
                        }
                    }
                }
            }
        }
    }

    // tslint:disable-next-line
    private onClickTextAlignment(args: any): void {
        let currentValue: string = (args && args.item && args.item.value) ? args.item.value : '';
        if (this.pdfViewer.selectedItems.annotations.length === 1 && currentValue) {
            this.pdfViewer.annotation.modifyTextAlignment(currentValue);
            this.updateTextAlignInIcon(currentValue);
        }
    }

    // tslint:disable-next-line
    private onClickTextProperties(args: any): void {
        let currentValue: string = (args && args.item && args.item.value) ? args.item.value : '';
        if (this.pdfViewer.selectedItems.annotations.length === 1 && currentValue) {
            let fontInfo: PdfFontModel = { isBold: undefined, isItalic: undefined, isStrikeout: undefined, isUnderline: undefined };
            if (currentValue === 'bold') {
                fontInfo.isBold = !(this.pdfViewer.selectedItems.annotations[0].font.isBold);
            } else if (currentValue === 'italic') {
                fontInfo.isItalic = !(this.pdfViewer.selectedItems.annotations[0].font.isItalic);
            } else if (currentValue === 'underline') {
                fontInfo.isUnderline = !(this.pdfViewer.selectedItems.annotations[0].font.isUnderline);
            } else if (currentValue === 'strikeout') {
                fontInfo.isStrikeout = !(this.pdfViewer.selectedItems.annotations[0].font.isStrikeout);
            }
            this.pdfViewer.annotation.modifyTextProperties(fontInfo, currentValue);
            this.updateTextPropertySelection(currentValue);
        }
    }

    private opacityChange(args: ChangeEventArgs): void {
        if (this.pdfViewer.annotationModule.textMarkupAnnotationModule) {
            if (this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
                if (this.isCurrentAnnotationOpacitySet && args.name === 'changed') {
                    this.isCurrentAnnotationOpacitySet = false;
                } else {
                    this.pdfViewer.annotationModule.textMarkupAnnotationModule.modifyOpacityProperty(args);
                }
            } else {
                switch (this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAddMode) {
                    case 'Highlight':
                        this.pdfViewer.annotationModule.textMarkupAnnotationModule.highlightOpacity = args.value / 100;
                        break;
                    case 'Underline':
                        this.pdfViewer.annotationModule.textMarkupAnnotationModule.underlineOpacity = args.value / 100;
                        break;
                    case 'Strikethrough':
                        this.pdfViewer.annotationModule.textMarkupAnnotationModule.strikethroughOpacity = args.value / 100;
                        break;
                }
            }
        }
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            // tslint:disable-next-line
            let currentAnnotations: any = this.pdfViewer.selectedItems.annotations[0];
            // tslint:disable-next-line:max-line-length
            if (currentAnnotations != null && (currentAnnotations.shapeAnnotationType === 'Stamp' || currentAnnotations.shapeAnnotationType === 'Image')) {
                let clonedObject: PdfAnnotationBaseModel = cloneObject(currentAnnotations);
                let redoClonedObject: PdfAnnotationBaseModel = cloneObject(currentAnnotations);
                redoClonedObject.opacity = args.value / 100;
                this.pdfViewer.nodePropertyChange(currentAnnotations, { opacity: args.value / 100 });
                this.pdfViewer.annotation.triggerAnnotationPropChange(currentAnnotations, false, false, false, true);
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.annotation.addAction(this.pdfViewer.selectedItems.annotations[0].pageIndex, null, this.pdfViewer.selectedItems.annotations[0], 'stampOpacity', '', clonedObject, redoClonedObject);
                // tslint:disable-next-line:max-line-length
                this.pdfViewer.annotation.stampAnnotationModule.updateSessionStorage(this.pdfViewer.selectedItems.annotations[0], null, 'opacity');
            } else {
                if (args.name === 'changed') {
                    this.pdfViewer.annotation.modifyOpacity(args);
                }
            }
        } else {
            if (this.pdfViewer.annotation.shapeAnnotationModule) {
                switch (this.pdfViewer.annotation.shapeAnnotationModule.currentAnnotationMode) {
                    case 'Line':
                        this.pdfViewer.annotation.shapeAnnotationModule.lineOpacity = args.value / 100;
                        break;
                    case 'Arrow':
                        this.pdfViewer.annotation.shapeAnnotationModule.arrowOpacity = args.value / 100;
                        break;
                    case 'Rectangle':
                        this.pdfViewer.annotation.shapeAnnotationModule.rectangleOpacity = args.value / 100;
                        break;
                    case 'Circle':
                        this.pdfViewer.annotation.shapeAnnotationModule.circleOpacity = args.value / 100;
                        break;
                    case 'Polygon':
                        this.pdfViewer.annotation.shapeAnnotationModule.polygonOpacity = args.value / 100;
                        break;
                }
            }
            if (this.pdfViewer.drawingObject) {
                this.pdfViewer.drawingObject.opacity = args.value / 100;
            }
        }
        this.updateOpacityIndicator();
    }

    private opacityDropDownBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
        if (this.pdfViewer.annotationModule.textMarkupAnnotationModule) {
            if (this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
                this.isCurrentAnnotationOpacitySet = true;
                // tslint:disable-next-line:max-line-length
                this.opacitySlider.value = this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation.opacity * 100;
            } else {
                switch (this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAddMode) {
                    case 'Highlight':
                        this.opacitySlider.value = this.pdfViewer.annotationModule.textMarkupAnnotationModule.highlightOpacity * 100;
                        break;
                    case 'Underline':
                        this.opacitySlider.value = this.pdfViewer.annotationModule.textMarkupAnnotationModule.underlineOpacity * 100;
                        break;
                    case 'Strikethrough':
                        this.opacitySlider.value = this.pdfViewer.annotationModule.textMarkupAnnotationModule.strikethroughOpacity * 100;
                        break;
                }
            }
        }
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            this.opacitySlider.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.opacity * 100;
        } else {
            if (this.pdfViewer.annotation.shapeAnnotationModule) {
                switch (this.pdfViewer.annotation.shapeAnnotationModule.currentAnnotationMode) {
                    case 'Line':
                        this.opacitySlider.value = this.pdfViewer.annotation.shapeAnnotationModule.lineOpacity * 100;
                        break;
                    case 'Arrow':
                        this.opacitySlider.value = this.pdfViewer.annotation.shapeAnnotationModule.arrowOpacity * 100;
                        break;
                    case 'Rectangle':
                        this.opacitySlider.value = this.pdfViewer.annotation.shapeAnnotationModule.rectangleOpacity * 100;
                        break;
                    case 'Circle':
                        this.opacitySlider.value = this.pdfViewer.annotation.shapeAnnotationModule.circleOpacity * 100;
                        break;
                    case 'Polygon':
                        this.opacitySlider.value = this.pdfViewer.annotation.shapeAnnotationModule.polygonOpacity * 100;
                        break;
                }
            }
        }
        this.updateOpacityIndicator();
    }

    private thicknessDropDownBeforeOpen(): void {
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            this.thicknessSlider.value = this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeWidth;
        } else {
            if (this.pdfViewer.annotation.shapeAnnotationModule) {
                switch (this.pdfViewer.annotation.shapeAnnotationModule.currentAnnotationMode) {
                    case 'Line':
                        this.thicknessSlider.value = this.pdfViewer.annotation.shapeAnnotationModule.lineThickness;
                        break;
                    case 'Arrow':
                        this.thicknessSlider.value = this.pdfViewer.annotation.shapeAnnotationModule.arrowThickness;
                        break;
                    case 'Rectangle':
                        this.thicknessSlider.value = this.pdfViewer.annotation.shapeAnnotationModule.rectangleThickness;
                        break;
                    case 'Circle':
                        this.thicknessSlider.value = this.pdfViewer.annotation.shapeAnnotationModule.circleThickness;
                        break;
                    case 'Polygon':
                        this.thicknessSlider.value = this.pdfViewer.annotation.shapeAnnotationModule.polygonThickness;
                        break;
                }
            }
        }
        this.updateThicknessIndicator();
    }

    // tslint:disable-next-line
    private thicknessDropDownOpen(args: OpenCloseMenuEventArgs): void {
        if (!Browser.isDevice) {
            this.calculateToolbarPosition(args);
        }
    }
    private calculateToolbarPosition(args: OpenCloseMenuEventArgs): void {
        if (args.element && args.element.parentElement) {
            let leftValue: number = parseFloat(args.element.parentElement.style.left);
            let width: number = args.element.parentElement.offsetWidth;
            if ((leftValue + width) < (this.pdfViewer.element.offsetWidth + 10)) {
                args.element.parentElement.style.left = (leftValue - width) + 'px';
            }
        }
    }

    private thicknessChange(args: ChangeEventArgs): void {
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            if (args.name === 'changed') {
                this.pdfViewer.annotation.modifyThickness(args.value);
            }
        } else {
            if (this.pdfViewer.annotation.shapeAnnotationModule) {
                switch (this.pdfViewer.annotation.shapeAnnotationModule.currentAnnotationMode) {
                    case 'Line':
                        this.pdfViewer.annotation.shapeAnnotationModule.lineThickness = args.value;
                        break;
                    case 'Arrow':
                        this.pdfViewer.annotation.shapeAnnotationModule.arrowThickness = args.value;
                        break;
                    case 'Rectangle':
                        this.pdfViewer.annotation.shapeAnnotationModule.rectangleThickness = args.value;
                        break;
                    case 'Circle':
                        this.pdfViewer.annotation.shapeAnnotationModule.circleThickness = args.value;
                        break;
                    case 'Polygon':
                        this.pdfViewer.annotation.shapeAnnotationModule.polygonThickness = args.value;
                        break;
                }
            }
            this.pdfViewer.drawingObject.thickness = args.value;
        }
        this.updateThicknessIndicator();
    }

    private createDropDownButton(element: HTMLElement, iconClass: string, target: HTMLElement, tooltipText: string): DropDownButton {
        // tslint:disable-next-line:max-line-length
        let dropDownButton: DropDownButton = new DropDownButton({ iconCss: iconClass + ' e-pv-icon', target: target });
        if (this.pdfViewer.enableRtl) {
            dropDownButton.enableRtl = true;
        }
        dropDownButton.appendTo(element);
        this.primaryToolbar.createTooltip(element, tooltipText);
        return dropDownButton;
    }

    private createShapeOptions(idString: string, isShape: boolean, isAlign?: boolean, isTextProp?: boolean): Tool {
        let toolbarElement: HTMLElement = createElement('div', { id: idString + '_target', className: 'e-pv-shapes-toolbar' });
        document.body.appendChild(toolbarElement);
        let toolbar: Tool;
        if (isAlign) {
            toolbar = new Tool({ items: this.textAlignmentToolbarItems(), overflowMode: 'MultiRow' }, toolbarElement);
            toolbar.isStringTemplate = true;
            this.afterAlignmentToolbarCreation();
        } else if (isTextProp) {
            toolbar = new Tool({ items: this.textPropertiesToolbarItems(), overflowMode: 'MultiRow' }, toolbarElement);
            toolbar.isStringTemplate = true;
            this.afterPropertiesToolbarCreation();
        } else {
            if (isShape) {
                // tslint:disable-next-line:max-line-length
                toolbar = new Tool({ items: this.createShapeToolbarItems(), overflowMode: 'MultiRow', clicked: this.onShapeToolbarClicked.bind(this) }, toolbarElement);
                toolbar.isStringTemplate = true;
                this.afterShapeToolbarCreation();
            } else {
                // tslint:disable-next-line:max-line-length
                toolbar = new Tool({ items: this.createCalibrateToolbarItems(), overflowMode: 'MultiRow', clicked: this.onCalibrateToolbarClicked.bind(this) }, toolbarElement);
                toolbar.isStringTemplate = true;
                this.afterCalibrateToolbarCreation();
            }
        }
        return toolbar;
    }
    private createPropDropDownButton(element: HTMLElement, iconClass: string, target: HTMLElement, tooltipText: string): DropDownButton {
        // tslint:disable-next-line:max-line-length
        let dropDownButton: DropDownButton = new DropDownButton({ iconCss: iconClass + ' e-pv-icon', target: target, cssClass: 'e-caret-hide' });
        if (this.pdfViewer.enableRtl) {
            dropDownButton.enableRtl = true;
        }
        dropDownButton.appendTo(element);
        this.primaryToolbar.createTooltip(element, tooltipText);
        return dropDownButton;
    }
    // tslint:disable-next-line
    private textAlignmentToolbarItems(): any[] {
        // tslint:disable-next-line
        let items: any[] = [];
        items.push({ prefixIcon: 'e-pv-left-align-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_left_align', align: 'Left', value: 'Left', click: this.onClickTextAlignment.bind(this) });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-right-align-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_right_align', align: 'Left', value: 'Right', click: this.onClickTextAlignment.bind(this) });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-center-align-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_center_align', align: 'Left', value: 'Center', click: this.onClickTextAlignment.bind(this) });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-justfiy-align-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_justify_align', align: 'Left', value: 'Justify', click: this.onClickTextAlignment.bind(this) });
        // tslint:disable-next-line:max-line-length
        return items;
    }

    private afterAlignmentToolbarCreation(): void {
        // tslint:disable-next-line:max-line-length
        this.primaryToolbar.addClassToolbarItem('_left_align', 'e-pv-left-align', this.pdfViewer.localeObj.getConstant('Align left'));
        this.primaryToolbar.addClassToolbarItem('_right_align', 'e-pv-right-align', this.pdfViewer.localeObj.getConstant('Align right'));
        // tslint:disable-next-line:max-line-length
        this.primaryToolbar.addClassToolbarItem('_center_align', 'e-pv-center-align', this.pdfViewer.localeObj.getConstant('Center'));
        this.primaryToolbar.addClassToolbarItem('_justify_align', 'e-pv-justfiy-align', this.pdfViewer.localeObj.getConstant('Justify'));
    }

    private afterPropertiesToolbarCreation(): void {
        // tslint:disable-next-line:max-line-length
        this.primaryToolbar.addClassToolbarItem('_bold', 'e-pv-bold', this.pdfViewer.localeObj.getConstant('Bold'));
        this.primaryToolbar.addClassToolbarItem('_italic', 'e-pv-italic', this.pdfViewer.localeObj.getConstant('Italic'));
        // tslint:disable-next-line:max-line-length
        this.primaryToolbar.addClassToolbarItem('_strikeout', 'e-pv-strikeout', this.pdfViewer.localeObj.getConstant('Strikethroughs'));
        this.primaryToolbar.addClassToolbarItem('_underline_textinput', 'e-pv-underlinetext', this.pdfViewer.localeObj.getConstant('Underlines'));
    }
    private createDropDownListForSize(fontSelectElement: HTMLElement): void {
        // tslint:disable-next-line:max-line-length
        let fontSize: string[] = ['8px', '9px', '10px', '11px', '12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '36px', '48px', '72px', '96px'];
        this.fontSize = new ComboBox({
            dataSource: fontSize,
            cssClass: 'e-pv-prop-dropdown',
            allowCustom: true,
            showClearButton: false,
            width: '80px',
        });
        this.fontSize.value = '16px';
        this.fontSize.appendTo(fontSelectElement);
        this.fontSize.addEventListener('change', (): void => { this.onFontSizeChange(this); });

    }

    private createDropDownListForFamily(fontSelectElement: HTMLElement): void {
        let fontStyle: { [key: string]: Object }[] = [{ FontName: 'Algerian' }, { FontName: 'Arial' },
        { FontName: 'Calibri' }, { FontName: 'Cambria' }, { FontName: 'Cambria Math' }, { FontName: 'Candara' },
        { FontName: 'Courier New' }, { FontName: 'Georgia' }, { FontName: 'Impact' }, { FontName: 'Segoe Print' },
        { FontName: 'Segoe Script' }, { FontName: 'Segoe UI' }, { FontName: 'Symbol' },
        { FontName: 'Times New Roman' }, { FontName: 'Verdana' }, { FontName: 'Windings' }, { FontName: 'Helvetica' }
        ];
        this.fontFamily = new ComboBox({
            dataSource: fontStyle,
            query: new Query().select(['FontName']),
            fields: { text: 'FontName', value: 'FontName' },
            cssClass: 'e-pv-prop-dropdown',
            itemTemplate: '<span style="font-family: ${FontName};">${FontName}</span>',
            allowCustom: true,
            showClearButton: false,
            width: '100px',
        });
        this.fontFamily.isStringTemplate = true;
        this.fontFamily.value = 'Helvetica';
        this.fontFamily.appendTo(fontSelectElement);
        this.fontFamily.addEventListener('change', (): void => { this.onFontFamilyChange(this); });
    }
    // tslint:disable-next-line
    private textPropertiesToolbarItems(): any[] {
        // tslint:disable-next-line
        let items: any[] = [];
        items.push({ prefixIcon: 'e-pv-bold-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_bold', align: 'Left', value: 'bold', click: this.onClickTextProperties.bind(this) });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-italic-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_italic', align: 'Left', value: 'italic', click: this.onClickTextProperties.bind(this) });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-strikeout-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_strikeout', align: 'Left', value: 'strikeout', click: this.onClickTextProperties.bind(this) });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-underlinetext-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_underline_textinput', align: 'Left', value: 'underline', click: this.onClickTextProperties.bind(this) });
        return items;
    }
    // tslint:disable-next-line
    private createShapeToolbarItems(): any[] {
        // tslint:disable-next-line
        let items: any[] = [];
        items.push({ prefixIcon: 'e-pv-shape-line-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_shape_line', text: this.pdfViewer.localeObj.getConstant('Line Shape'), align: 'Left' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-shape-arrow-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_shape_arrow', text: this.pdfViewer.localeObj.getConstant('Arrow Shape'), align: 'Left' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-shape-rectangle-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_shape_rectangle', text: this.pdfViewer.localeObj.getConstant('Rectangle Shape'), align: 'Left' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-shape-circle-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_shape_circle', text: this.pdfViewer.localeObj.getConstant('Circle Shape'), align: 'Left' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-shape-pentagon-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_shape_pentagon', text: this.pdfViewer.localeObj.getConstant('Pentagon Shape'), align: 'Left' });
        return items;
    }

    // tslint:disable-next-line
    private createCalibrateToolbarItems(): any[] {
        // tslint:disable-next-line
        let items: any[] = [];
        items.push({ prefixIcon: 'e-pv-calibrate-distance-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_calibrate_distance', text: this.pdfViewer.localeObj.getConstant(''), align: 'Left' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-calibrate-perimeter-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_calibrate_perimeter', text: this.pdfViewer.localeObj.getConstant(''), align: 'Left' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-calibrate-area-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_calibrate_area', text: this.pdfViewer.localeObj.getConstant(''), align: 'Left' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-calibrate-radius-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_calibrate_radius', text: this.pdfViewer.localeObj.getConstant(''), align: 'Left' });
        // tslint:disable-next-line:max-line-length
        items.push({ prefixIcon: 'e-pv-calibrate-volume-icon e-pv-icon', cssClass: '', id: this.pdfViewer.element.id + '_calibrate_volume', text: this.pdfViewer.localeObj.getConstant(''), align: 'Left' });
        return items;
    }

    private onShapeToolbarClicked = (args: ClickEventArgs): void => {
        let elementId: string = this.pdfViewer.element.id;
        let shapeAnnotationModule: ShapeAnnotation = this.pdfViewer.annotation.shapeAnnotationModule;
        this.deselectAllItems();
        this.resetFreeTextAnnot();
        switch ((args.originalEvent.target as HTMLElement).id) {
            case elementId + '_shape_line':
            case elementId + '_shape_lineIcon':
                shapeAnnotationModule.setAnnotationType('Line');
                this.onShapeDrawSelection(true);
                this.updateColorInIcon(this.colorDropDownElement, shapeAnnotationModule.lineFillColor);
                this.updateColorInIcon(this.strokeDropDownElement, shapeAnnotationModule.lineStrokeColor);
                break;
            case elementId + '_shape_arrow':
            case elementId + '_shape_arrowIcon':
                shapeAnnotationModule.setAnnotationType('Arrow');
                this.onShapeDrawSelection(true);
                this.updateColorInIcon(this.colorDropDownElement, shapeAnnotationModule.arrowFillColor);
                this.updateColorInIcon(this.strokeDropDownElement, shapeAnnotationModule.arrowStrokeColor);
                break;
            case elementId + '_shape_rectangle':
            case elementId + '_shape_rectangleIcon':
                shapeAnnotationModule.setAnnotationType('Rectangle');
                this.onShapeDrawSelection(true);
                this.updateColorInIcon(this.colorDropDownElement, shapeAnnotationModule.rectangleFillColor);
                this.updateColorInIcon(this.strokeDropDownElement, shapeAnnotationModule.rectangleStrokeColor);
                break;
            case elementId + '_shape_circle':
            case elementId + '_shape_circleIcon':
                shapeAnnotationModule.setAnnotationType('Circle');
                this.onShapeDrawSelection(true);
                this.updateColorInIcon(this.colorDropDownElement, shapeAnnotationModule.circleFillColor);
                this.updateColorInIcon(this.strokeDropDownElement, shapeAnnotationModule.circleStrokeColor);
                break;
            case elementId + '_shape_pentagon':
            case elementId + '_shape_pentagonIcon':
                shapeAnnotationModule.setAnnotationType('Polygon');
                this.onShapeDrawSelection(true);
                this.updateColorInIcon(this.colorDropDownElement, shapeAnnotationModule.polygonFillColor);
                this.updateColorInIcon(this.strokeDropDownElement, shapeAnnotationModule.polygonStrokeColor);
                break;
        }
        // this.pdfViewer.clearSelection();
    }

    private onCalibrateToolbarClicked(args: ClickEventArgs): void {
        let elementId: string = this.pdfViewer.element.id;
        let measureModule: MeasureAnnotation = this.pdfViewer.annotation.measureAnnotationModule;
        this.deselectAllItems();
        this.resetFreeTextAnnot();
        switch ((args.originalEvent.target as HTMLElement).id) {
            case elementId + '_calibrate_distance':
            case elementId + '_calibrate_distanceIcon':
                measureModule.setAnnotationType('Distance');
                this.onShapeDrawSelection(false);
                this.updateColorInIcon(this.colorDropDownElement, measureModule.distanceFillColor);
                this.updateColorInIcon(this.strokeDropDownElement, measureModule.distanceStrokeColor);
                break;
            case elementId + '_calibrate_perimeter':
            case elementId + '_calibrate_perimeterIcon':
                measureModule.setAnnotationType('Perimeter');
                this.onShapeDrawSelection(false);
                this.updateColorInIcon(this.colorDropDownElement, measureModule.perimeterFillColor);
                this.updateColorInIcon(this.strokeDropDownElement, measureModule.perimeterStrokeColor);
                break;
            case elementId + '_calibrate_area':
            case elementId + '_calibrate_areaIcon':
                measureModule.setAnnotationType('Area');
                this.onShapeDrawSelection(false);
                this.updateColorInIcon(this.colorDropDownElement, measureModule.areaFillColor);
                this.updateColorInIcon(this.strokeDropDownElement, measureModule.areaStrokeColor);
                break;
            case elementId + '_calibrate_radius':
            case elementId + '_calibrate_radiusIcon':
                measureModule.setAnnotationType('Radius');
                this.onShapeDrawSelection(false);
                this.updateColorInIcon(this.colorDropDownElement, measureModule.radiusFillColor);
                this.updateColorInIcon(this.strokeDropDownElement, measureModule.radiusStrokeColor);
                break;
            case elementId + '_calibrate_volume':
            case elementId + '_calibrate_volumeIcon':
                measureModule.setAnnotationType('Volume');
                this.onShapeDrawSelection(false);
                this.updateColorInIcon(this.colorDropDownElement, measureModule.volumeFillColor);
                this.updateColorInIcon(this.strokeDropDownElement, measureModule.volumeStrokeColor);
                break;
        }
    }

    private onShapeDrawSelection(isShape: boolean): void {
        this.updateInteractionTools();
        this.enableAnnotationPropertiesTools(true);
        if (isShape) {
            this.shapeDropDown.toggle();
        } else {
            this.calibrateDropDown.toggle();
        }
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            this.pdfViewer.clearSelection(this.pdfViewer.selectedItems.annotations[0].pageIndex);
        }
    }

    private afterShapeToolbarCreation(): void {
        this.primaryToolbar.addClassToolbarItem('_shape_line', 'e-pv-shape-line', this.pdfViewer.localeObj.getConstant('Add line'));
        this.primaryToolbar.addClassToolbarItem('_shape_arrow', 'e-pv-shape-arrow', this.pdfViewer.localeObj.getConstant('Add arrow'));
        // tslint:disable-next-line:max-line-length
        this.primaryToolbar.addClassToolbarItem('_shape_rectangle', 'e-pv-shape-rectangle', this.pdfViewer.localeObj.getConstant('Add rectangle'));
        // tslint:disable-next-line:max-line-length
        this.primaryToolbar.addClassToolbarItem('_shape_circle', 'e-pv-shape-circle', this.pdfViewer.localeObj.getConstant('Add circle'));
        this.primaryToolbar.addClassToolbarItem('_shape_pentagon', 'e-pv-shape-pentagon', this.pdfViewer.localeObj.getConstant('Add polygon'));
    }

    private afterCalibrateToolbarCreation(): void {
        // tslint:disable-next-line:max-line-length
        this.primaryToolbar.addClassToolbarItem('_calibrate_distance', 'e-pv-calibrate-distance', this.pdfViewer.localeObj.getConstant('Calibrate Distance'));
        this.primaryToolbar.addClassToolbarItem('_calibrate_perimeter', 'e-pv-calibrate-perimeter', this.pdfViewer.localeObj.getConstant('Calibrate Perimeter'));
        // tslint:disable-next-line:max-line-length
        this.primaryToolbar.addClassToolbarItem('_calibrate_area', 'e-pv-calibrate-area', this.pdfViewer.localeObj.getConstant('Calibrate Area'));
        this.primaryToolbar.addClassToolbarItem('_calibrate_radius', 'e-pv-calibrate-radius', this.pdfViewer.localeObj.getConstant('Calibrate Radius'));
        // tslint:disable-next-line:max-line-length
        this.primaryToolbar.addClassToolbarItem('_calibrate_volume', 'e-pv-calibrate-volume', this.pdfViewer.localeObj.getConstant('Calibrate Volume'));
    }

    private createColorPicker(idString: string): ColorPicker {
        let inputElement: HTMLElement = createElement('input', { id: idString + '_target' });
        document.body.appendChild(inputElement);
        let colorPicker: ColorPicker = new ColorPicker({
            inline: true, mode: 'Palette', cssClass: 'e-show-value', enableOpacity: false,
            value: '#000000', showButtons: false, modeSwitcher: false
        });
        if (this.pdfViewer.enableRtl) {
            colorPicker.enableRtl = true;
        }
        colorPicker.appendTo(inputElement);
        return colorPicker;
    }

    private onColorPickerChange(args: ColorPickerEventArgs): void {
        let currentColor: string = (args.currentValue.hex === '') ? '#ffffff00' : args.currentValue.hex;
        if (this.pdfViewer.annotationModule.textMarkupAnnotationModule) {
            if (this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
                this.pdfViewer.annotationModule.textMarkupAnnotationModule.modifyColorProperty(currentColor);
            } else {
                switch (this.pdfViewer.annotationModule.textMarkupAnnotationModule.currentTextMarkupAddMode) {
                    case 'Highlight':
                        this.pdfViewer.annotationModule.textMarkupAnnotationModule.highlightColor = currentColor;
                        break;
                    case 'Underline':
                        this.pdfViewer.annotationModule.textMarkupAnnotationModule.underlineColor = currentColor;
                        break;
                    case 'Strikethrough':
                        this.pdfViewer.annotationModule.textMarkupAnnotationModule.strikethroughColor = currentColor;
                        break;
                }
            }
        }
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            this.pdfViewer.annotation.modifyFillColor(currentColor);
        } else {
            if (this.pdfViewer.annotation.shapeAnnotationModule) {
                switch (this.pdfViewer.annotation.shapeAnnotationModule.currentAnnotationMode) {
                    case 'Line':
                        this.pdfViewer.annotation.shapeAnnotationModule.lineFillColor = currentColor;
                        break;
                    case 'Arrow':
                        this.pdfViewer.annotation.shapeAnnotationModule.arrowFillColor = currentColor;
                        break;
                    case 'Rectangle':
                        this.pdfViewer.annotation.shapeAnnotationModule.rectangleFillColor = currentColor;
                        break;
                    case 'Circle':
                        this.pdfViewer.annotation.shapeAnnotationModule.circleFillColor = currentColor;
                        break;
                    case 'Polygon':
                        this.pdfViewer.annotation.shapeAnnotationModule.polygonFillColor = currentColor;
                        break;
                }
            }
            if (this.pdfViewer.drawingObject) {
                this.pdfViewer.drawingObject.fillColor = currentColor;
            }
        }
        this.updateColorInIcon(this.colorDropDownElement, currentColor);
        this.colorDropDown.toggle();
    }

    private onStrokePickerChange(args: ColorPickerEventArgs): void {
        let currentColor: string = (args.currentValue.hex === '') ? '#ffffff00' : args.currentValue.hex;
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            this.pdfViewer.annotation.modifyStrokeColor(currentColor);
        } else {
            if (this.pdfViewer.annotation.shapeAnnotationModule) {
                switch (this.pdfViewer.annotation.shapeAnnotationModule.currentAnnotationMode) {
                    case 'Line':
                        this.pdfViewer.annotation.shapeAnnotationModule.lineStrokeColor = currentColor;
                        break;
                    case 'Arrow':
                        this.pdfViewer.annotation.shapeAnnotationModule.arrowStrokeColor = currentColor;
                        break;
                    case 'Rectangle':
                        this.pdfViewer.annotation.shapeAnnotationModule.rectangleStrokeColor = currentColor;
                        break;
                    case 'Circle':
                        this.pdfViewer.annotation.shapeAnnotationModule.circleStrokeColor = currentColor;
                        break;
                    case 'Polygon':
                        this.pdfViewer.annotation.shapeAnnotationModule.polygonStrokeColor = currentColor;
                        break;
                }
            }
            this.pdfViewer.drawingObject.strokeColor = currentColor;
        }
        this.updateColorInIcon(this.strokeDropDownElement, currentColor);
        this.strokeDropDown.toggle();
    }

    /**
     * @private
     */
    public updateColorInIcon(element: HTMLElement, color: string): void {
        (element.childNodes[0] as HTMLElement).style.borderBottomColor = color;
    }

    /**
     * @private
     */
    public updateTextPropertySelection(currentOption: string): void {
        if (currentOption === 'bold') {
            document.getElementById(this.pdfViewer.element.id + '_bold').classList.toggle('textprop-option-active');
        } else if (currentOption === 'italic') {
            document.getElementById(this.pdfViewer.element.id + '_italic').classList.toggle('textprop-option-active');
        } else if (currentOption === 'underline') {
            document.getElementById(this.pdfViewer.element.id + '_underline_textinput').classList.toggle('textprop-option-active');
            document.getElementById(this.pdfViewer.element.id + '_strikeout').classList.remove('textprop-option-active');
        } else if (currentOption === 'strikeout') {
            document.getElementById(this.pdfViewer.element.id + '_strikeout').classList.toggle('textprop-option-active');
            document.getElementById(this.pdfViewer.element.id + '_underline_textinput').classList.remove('textprop-option-active');
        }
    }

    /**
     * @private
     */
    public updateFontFamilyInIcon(family: string): void {
        this.fontFamily.value = family;
    }

    /**
     * @private
     */
    public updateTextAlignInIcon(align: string): void {
        let className: string = 'e-btn-icon e-pv-left-align-icon e-pv-icon';
        let leftAlign: HTMLElement = document.getElementById(this.pdfViewer.element.id + '_left_align');
        let rightAlign: HTMLElement = document.getElementById(this.pdfViewer.element.id + '_right_align');
        let centerAlign: HTMLElement = document.getElementById(this.pdfViewer.element.id + '_center_align');
        let justifyAlign: HTMLElement = document.getElementById(this.pdfViewer.element.id + '_justify_align');

        leftAlign.classList.remove('textprop-option-active');
        rightAlign.classList.remove('textprop-option-active');
        centerAlign.classList.remove('textprop-option-active');
        justifyAlign.classList.remove('textprop-option-active');
        if (align === 'Left') {
            leftAlign.classList.add('textprop-option-active');
        } else if (align === 'Right') {
            className = 'e-btn-icon e-pv-right-align-icon e-pv-icon';
            rightAlign.classList.add('textprop-option-active');
        } else if (align === 'Center') {
            className = 'e-btn-icon e-pv-center-align-icon e-pv-icon';
            centerAlign.classList.add('textprop-option-active');
        } else if (align === 'Justify') {
            className = 'e-btn-icon e-pv-justfiy-align-icon e-pv-icon';
            justifyAlign.classList.add('textprop-option-active');
        }
        document.getElementById(this.pdfViewer.element.id + '_annotation_textalign').children[0].className = className;
    }

    /**
     * @private
     */
    public updateFontSizeInIcon(size: number): void {
        this.fontSize.value = size + 'px';
    }

    private updateOpacityIndicator(): void {
        // tslint:disable-next-line
        this.opacityIndicator.textContent = parseInt(Math.round(this.opacitySlider.value as number).toString()) + '%';
    }

    private updateThicknessIndicator(): void {
        this.thicknessIndicator.textContent = this.thicknessSlider.value + ' pt';
    }

    private createSlider(idString: string): HTMLElement {
        let outerContainer: HTMLElement = createElement('div', { className: 'e-pv-annotation-opacity-popup-container' });
        document.body.appendChild(outerContainer);
        let label: HTMLElement = createElement('span', { id: idString + '_label', className: 'e-pv-annotation-opacity-label' });
        label.textContent = this.pdfViewer.localeObj.getConstant('Opacity');
        let sliderElement: HTMLElement = createElement('div', { id: idString + '_slider' });
        this.opacitySlider = new Slider({ type: 'MinRange', cssClass: 'e-pv-annotation-opacity-slider', max: 100, min: 0 });
        // tslint:disable-next-line:max-line-length
        this.opacityIndicator = createElement('div', { id: idString + '_opacity_indicator', className: 'e-pv-annotation-opacity-indicator' });
        this.opacityIndicator.textContent = '100%';
        if (!this.pdfViewer.enableRtl) {
            outerContainer.appendChild(label);
            outerContainer.appendChild(sliderElement);
            this.opacitySlider.appendTo(sliderElement);
            this.opacitySlider.element.parentElement.classList.add('e-pv-annotation-opacity-slider-container');
            outerContainer.appendChild(this.opacityIndicator);
        } else {
            outerContainer.appendChild(this.opacityIndicator);
            outerContainer.appendChild(sliderElement);
            this.opacitySlider.enableRtl = true;
            this.opacitySlider.appendTo(sliderElement);
            this.opacitySlider.element.parentElement.classList.add('e-pv-annotation-opacity-slider-container');
            outerContainer.appendChild(label);
        }
        return outerContainer;
    }

    private createThicknessSlider(idString: string): HTMLElement {
        let outerContainer: HTMLElement = createElement('div', { className: 'e-pv-annotation-thickness-popup-container' });
        document.body.appendChild(outerContainer);
        let label: HTMLElement = createElement('span', { id: idString + '_label', className: 'e-pv-annotation-thickness-label' });
        label.textContent = this.pdfViewer.localeObj.getConstant('Line Thickness');
        let sliderElement: HTMLElement = createElement('div', { id: idString + '_slider' });
        this.thicknessSlider = new Slider({ type: 'MinRange', cssClass: 'e-pv-annotation-thickness-slider', max: 12, min: 0 });
        // tslint:disable-next-line:max-line-length
        this.thicknessIndicator = createElement('div', { id: idString + '_thickness_indicator', className: 'e-pv-annotation-thickness-indicator' });
        this.thicknessIndicator.textContent = '0 pt';
        if (!this.pdfViewer.enableRtl) {
            outerContainer.appendChild(label);
            outerContainer.appendChild(sliderElement);
            this.thicknessSlider.appendTo(sliderElement);
            outerContainer.appendChild(this.thicknessIndicator);
        } else {
            outerContainer.appendChild(this.thicknessIndicator);
            outerContainer.appendChild(sliderElement);
            this.thicknessSlider.enableRtl = true;
            this.thicknessSlider.appendTo(sliderElement);
            outerContainer.appendChild(label);
        }
        this.thicknessSlider.element.parentElement.classList.add('e-pv-annotation-thickness-slider-container');
        return outerContainer;
    }

    private afterToolbarCreation(): void {
        // tslint:disable-next-line:max-line-length
        this.highlightItem = this.primaryToolbar.addClassToolbarItem('_highlight', 'e-pv-highlight', this.pdfViewer.localeObj.getConstant('Highlight'));
        this.underlineItem = this.primaryToolbar.addClassToolbarItem('_underline', 'e-pv-underline', this.pdfViewer.localeObj.getConstant('Underline'));
        // tslint:disable-next-line:max-line-length
        this.strikethroughItem = this.primaryToolbar.addClassToolbarItem('_strikethrough', 'e-pv-strikethrough', this.pdfViewer.localeObj.getConstant('Strikethrough'));
        this.deleteItem = this.primaryToolbar.addClassToolbarItem('_annotation_delete', 'e-pv-annotation-delete', this.pdfViewer.localeObj.getConstant('Delete'));
        // tslint:disable-next-line:max-line-length
        this.freeTextEditItem = this.primaryToolbar.addClassToolbarItem('_annotation_freeTextEdit', 'e-pv-annotation-freeTextEdit', this.pdfViewer.localeObj.getConstant('Free Text'));
        this.handWrittenSignatureItem = this.primaryToolbar.addClassToolbarItem('_annotation_signature', 'e-pv-annotation-handwrittensign', this.pdfViewer.localeObj.getConstant('Draw Signature'));

        // tslint:disable-next-line:max-line-length
        this.commentItem = this.primaryToolbar.addClassToolbarItem('_annotation_commentPanel', 'e-pv-annotation-comment-panel', this.pdfViewer.localeObj.getConstant('Comment Panel'));
        this.closeItem = this.primaryToolbar.addClassToolbarItem('_annotation_close', 'e-pv-annotation-tools-close', null);
        this.selectAnnotationDeleteItem(false);
        this.enableTextMarkupAnnotationPropertiesTools(false);
        this.enableCommentPanelTool(this.pdfViewer.enableCommentPanel);
    }

    private onToolbarClicked(args: ClickEventArgs): void {
        switch ((args.originalEvent.target as HTMLElement).id) {
            case this.pdfViewer.element.id + '_highlight':
            case this.pdfViewer.element.id + '_highlightIcon':
                this.pdfViewer.tool = '';
                this.resetFreeTextAnnot();
                this.handleHighlight();
                break;
            case this.pdfViewer.element.id + '_underline':
            case this.pdfViewer.element.id + '_underlineIcon':
                this.pdfViewer.tool = '';
                this.resetFreeTextAnnot();
                this.handleUnderline();
                break;
            case this.pdfViewer.element.id + '_strikethrough':
            case this.pdfViewer.element.id + '_strikethroughIcon':
                this.pdfViewer.tool = '';
                this.resetFreeTextAnnot();
                this.handleStrikethrough();
                break;
            case this.pdfViewer.element.id + '_annotation_delete':
            case this.pdfViewer.element.id + '_annotation_deleteIcon':
                this.pdfViewer.annotationModule.deleteAnnotation();
                this.resetFreeTextAnnot();
                break;
            case this.pdfViewer.element.id + '_annotation_commentPanel':
            case this.pdfViewer.element.id + '_annotation_commentPanelIcon':
                let commentPanel: HTMLElement = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
                if (this.pdfViewer.annotation && this.pdfViewer.annotation.textMarkupAnnotationModule) {
                    this.pdfViewer.annotation.textMarkupAnnotationModule.showHideDropletDiv(true);
                }
                if (commentPanel.style.display === 'block') {
                    this.pdfViewerBase.navigationPane.closeCommentPanelContainer();
                } else {
                    this.pdfViewer.annotationModule.showCommentsPanel();
                }
                break;
            case this.pdfViewer.element.id + '_annotation_close':
            case this.pdfViewer.element.id + '_annotation_closeIcon':
                let commentsPanel: HTMLElement = document.getElementById(this.pdfViewer.element.id + '_commantPanel');
                if (commentsPanel.style.display === 'block') {
                    this.pdfViewerBase.navigationPane.closeCommentPanelContainer();
                }
                this.showAnnotationToolbar(this.primaryToolbar.annotationItem);
                break;
            case this.pdfViewer.element.id + '_annotation_freeTextEdit':
            case this.pdfViewer.element.id + '_annotation_freeTextEditIcon':
                this.resetFreeTextAnnot();
                this.handleFreeTextEditor();
                break;
            case this.pdfViewer.element.id + '_annotation_signature':
            case this.pdfViewer.element.id + '_annotation_signatureIcon':
                this.deselectAllItems();
                this.showSignaturepanel();
        }
    }
    private resetFreeTextAnnot(): void {
        if (this.pdfViewer.annotationModule && this.pdfViewer.annotationModule.freeTextAnnotationModule) {
            this.pdfViewer.annotation.freeTextAnnotationModule.isNewFreeTextAnnot = false;
            this.pdfViewer.annotation.freeTextAnnotationModule.isNewAddedAnnot = false;
            if (this.freeTextEditItem) {
                this.primaryToolbar.deSelectItem(this.freeTextEditItem);
                this.enableFreeTextAnnotationPropertiesTools(false);
            }
        }
    }

    private showSignaturepanel(): void {
        this.pdfViewerBase.isToolbarSignClicked = true;
        this.pdfViewerBase.signatureModule.showSignatureDialog(true);
    }
    private handleFreeTextEditor(): void {
        this.enableFreeTextAnnotationPropertiesTools(true);
        this.pdfViewer.clearSelection(this.pdfViewer.currentPageNumber - 1);
        if (this.pdfViewer.annotationModule.textMarkupAnnotationModule) {
            this.pdfViewer.annotationModule.textMarkupAnnotationModule.isTextMarkupAnnotationMode = false;
        }
        this.isStrikethroughEnabled = false;
        this.isHighlightEnabled = false;
        this.isUnderlineEnabled = false;
        let freeTextAnnotationModule: FreeTextAnnotation = this.pdfViewer.annotation.freeTextAnnotationModule;
        freeTextAnnotationModule.setAnnotationType('FreeText');
        freeTextAnnotationModule.isNewFreeTextAnnot = true;
        freeTextAnnotationModule.isNewAddedAnnot = true;
        this.updateInteractionTools();
        this.primaryToolbar.deSelectItem(this.highlightItem);
        this.primaryToolbar.deSelectItem(this.underlineItem);
        this.primaryToolbar.deSelectItem(this.strikethroughItem);
        this.primaryToolbar.selectItem(this.freeTextEditItem);
        this.updateColorInIcon(this.colorDropDownElement, this.pdfViewer.annotationModule.freeTextAnnotationModule.fillColor);
        this.updateColorInIcon(this.strokeDropDownElement, this.pdfViewer.annotationModule.freeTextAnnotationModule.borderColor);
        this.updateColorInIcon(this.fontColorElement, this.pdfViewer.annotationModule.freeTextAnnotationModule.fontColor);
        this.updateFontFamilyInIcon(this.pdfViewer.annotationModule.freeTextAnnotationModule.fontFamily);
        this.updateFontSizeInIcon(this.pdfViewer.annotationModule.freeTextAnnotationModule.fontSize);
    }

    /**
     * @private
     */
    public showAnnotationToolbar(element: HTMLElement): void {
        if (!this.isToolbarHidden) {
            // tslint:disable-next-line
            let annotationModule: any = this.pdfViewer.annotationModule;
            if (element) {
                this.adjustViewer(false);
                this.primaryToolbar.deSelectItem(element);
            }
            // tslint:disable-next-line:max-line-length           
            if (annotationModule && annotationModule.textMarkupAnnotationModule && annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation) {
                this.enablePropertiesTool(annotationModule);
            } else {
                this.deselectAllItems();
            }
            this.toolbarElement.style.display = 'none';
            if (this.pdfViewerBase.isPanMode) {
                this.primaryToolbar.updateInteractionTools(false);
            } else {
                this.primaryToolbar.updateInteractionTools(true);
            }
        } else {
            let toolBarInitialStatus: string = this.toolbarElement.style.display;
            this.toolbarElement.style.display = 'block';
            if (element) {
                this.primaryToolbar.selectItem(element);
                if (toolBarInitialStatus === 'none') {
                    this.adjustViewer(true);
                }
            }
        }
        // tslint:disable-next-line:max-line-length           
        if (this.pdfViewer.magnification && this.pdfViewer.magnification.fitType === 'fitToPage') {
            this.pdfViewer.magnification.fitToPage();
        }
        this.enableAnnotationAddTools(true);
        this.isToolbarHidden = !this.isToolbarHidden;
    }
    // tslint:disable-next-line
    private enablePropertiesTool(annotationModule: any): void {
        this.isHighlightEnabled = false;
        this.isUnderlineEnabled = false;
        this.isStrikethroughEnabled = false;
        if (this.pdfViewerBase.isTextMarkupAnnotationModule()) {
            annotationModule.textMarkupAnnotationModule.isTextMarkupAnnotationMode = false;
        }
        this.primaryToolbar.deSelectItem(this.highlightItem);
        this.primaryToolbar.deSelectItem(this.underlineItem);
        this.primaryToolbar.deSelectItem(this.strikethroughItem);
        this.enableTextMarkupAnnotationPropertiesTools(true);
        // tslint:disable-next-line:max-line-length  
        this.updateColorInIcon(this.colorDropDownElement, annotationModule.textMarkupAnnotationModule.currentTextMarkupAnnotation.color);
        this.selectAnnotationDeleteItem(true);
    }
    private applyAnnotationToolbarSettings(): void {
        if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem) {
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('HighlightTool') !== -1) {
                this.showHighlightTool(true);
            } else {
                this.showHighlightTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('UnderlineTool') !== -1) {
                this.showUnderlineTool(true);
            } else {
                this.showUnderlineTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('StrikethroughTool') !== -1) {
                this.showStrikethroughTool(true);
            } else {
                this.showStrikethroughTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('ShapeTool') !== -1) {
                this.showShapeAnnotationTool(true);
            } else {
                this.showShapeAnnotationTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('CalibrateTool') !== -1) {
                this.showCalibrateAnnotationTool(true);
            } else {
                this.showCalibrateAnnotationTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('ColorEditTool') !== -1) {
                this.showColorEditTool(true);
            } else {
                this.showColorEditTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('StrokeColorEditTool') !== -1) {
                this.showStrokeColorEditTool(true);
            } else {
                this.showStrokeColorEditTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('ThicknessEditTool') !== -1) {
                this.showThicknessEditTool(true);
            } else {
                this.showThicknessEditTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('OpacityEditTool') !== -1) {
                this.showOpacityEditTool(true);
            } else {
                this.showOpacityEditTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('AnnotationDeleteTool') !== -1) {
                this.showAnnotationDeleteTool(true);
            } else {
                this.showAnnotationDeleteTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('StampAnnotationTool') !== -1) {
                this.showStampAnnotationTool(true);
            } else {
                this.showStampAnnotationTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('HandWrittenSignatureTool') !== -1) {
                this.showSignatureTool(true);
            } else {
                this.showSignatureTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('FreeTextAnnotationTool') !== -1) {
                this.showFreeTextAnnotationTool(true);
            } else {
                this.showFreeTextAnnotationTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('FontFamilyAnnotationTool') !== -1) {
                this.showFontFamilyAnnotationTool(true);
            } else {
                this.showFontFamilyAnnotationTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('FontSizeAnnotationTool') !== -1) {
                this.showFontSizeAnnotationTool(true);
            } else {
                this.showFontSizeAnnotationTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('FontStylesAnnotationTool') !== -1) {
                this.showFontStylesAnnotationTool(true);
            } else {
                this.showFontStylesAnnotationTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('FontAlignAnnotationTool') !== -1) {
                this.showFontAlignAnnotationTool(true);
            } else {
                this.showFontAlignAnnotationTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('FontColorAnnotationTool') !== -1) {
                this.showFontColorAnnotationTool(true);
            } else {
                this.showFontColorAnnotationTool(false);
            }
            if (this.pdfViewer.annotationToolbarSettings.annotationToolbarItem.indexOf('CommentPanelTool') !== -1) {
                this.showCommentPanelTool(true);
            } else {
                this.showCommentPanelTool(false);
            }
            this.showSeparator();
    }
}

    private showSeparator(): void {
        if ((!this.isHighlightBtnVisible && !this.isUnderlineBtnVisible && !this.isStrikethroughBtnVisible)
            || !this.isShapeBtnVisible) {
            this.applyHideToToolbar(false, 3, 3);
        }
        if (!this.isShapeBtnVisible || !this.isCalibrateBtnVisible) {
            this.applyHideToToolbar(false, 5, 5);
        }
        if (!this.isCalibrateBtnVisible || !this.isStampBtnVisible) {
            this.applyHideToToolbar(false, 7, 7);
        }
        // tslint:disable-next-line:max-line-length
        if (!this.isStampBtnVisible || (!this.isColorToolVisible && !this.isStrokeColorToolVisible && !this.isThicknessToolVisible && !this.isOpacityToolVisible)) {
            this.applyHideToToolbar(false, 9, 9);
        }
        // tslint:disable-next-line:max-line-length
        if ((!this.isColorToolVisible && !this.isStrokeColorToolVisible && !this.isThicknessToolVisible && !this.isOpacityToolVisible) && (!this.isHighlightBtnVisible &&
            !this.isUnderlineBtnVisible && !this.isStrikethroughBtnVisible) && !this.isShapeBtnVisible && !this.isCalibrateBtnVisible && !this.isStampBtnVisible || !this.isDeleteAnnotationToolVisible) {
            this.applyHideToToolbar(false, 14, 14);
        }
    }

    private showHighlightTool(isShow: boolean): void {
        this.isHighlightBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 0, 0);
    }

    private showUnderlineTool(isShow: boolean): void {
        this.isUnderlineBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 1, 1);
    }

    private showStrikethroughTool(isShow: boolean): void {
        this.isStrikethroughBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 2, 2);
    }

    private showShapeAnnotationTool(isShow: boolean): void {
        this.isShapeBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 4, 4);
    }

    private showCalibrateAnnotationTool(isShow: boolean): void {
        this.isCalibrateBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 6, 6);
    }

    private showFreeTextAnnotationTool(isShow: boolean): void {
        this.isFreeTextBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 8, 8);
    }

    private showStampAnnotationTool(isShow: boolean): void {
        this.isStampBtnVisible = isShow;
        this.applyHideToToolbar(isShow, 10, 10);
    }
    private showSignatureTool(isShow: boolean): void {
        this.applyHideToToolbar(isShow, 12, 12);
    }
    private showFontFamilyAnnotationTool(isShow: boolean): void {
        this.applyHideToToolbar(isShow, 13, 13);
    }
    private showFontSizeAnnotationTool(isShow: boolean): void {
        this.applyHideToToolbar(isShow, 14, 14);
    }
    private showFontAlignAnnotationTool(isShow: boolean): void {
        this.applyHideToToolbar(isShow, 15, 15);
    }
    private showFontColorAnnotationTool(isShow: boolean): void {
        this.applyHideToToolbar(isShow, 16, 16);
    }
    private showFontStylesAnnotationTool(isShow: boolean): void {
        this.applyHideToToolbar(isShow, 17, 17);
    }
    private showColorEditTool(isShow: boolean): void {
        this.isColorToolVisible = isShow;
        this.applyHideToToolbar(isShow, 19, 19);
    }

    private showStrokeColorEditTool(isShow: boolean): void {
        this.isStrokeColorToolVisible = isShow;
        this.applyHideToToolbar(isShow, 20, 20);
    }

    private showThicknessEditTool(isShow: boolean): void {
        this.isThicknessToolVisible = isShow;
        this.applyHideToToolbar(isShow, 21, 21);
    }

    private showOpacityEditTool(isShow: boolean): void {
        this.isOpacityToolVisible = isShow;
        this.applyHideToToolbar(isShow, 22, 22);
    }

    private showAnnotationDeleteTool(isShow: boolean): void {
        this.isDeleteAnnotationToolVisible = isShow;
        this.applyHideToToolbar(isShow, 24, 24);
    }

    private showCommentPanelTool(isShow: boolean): void {
        this.applyHideToToolbar(isShow, 25, 25);
    }

    private applyHideToToolbar(show: boolean, startIndex: number, endIndex: number): void {
        let isHide: boolean = !show;
        for (let index: number = startIndex; index <= endIndex; index++) {
            this.toolbar.hideItem(index, isHide);
        }
    }

    /**
     * @private
     */
    public adjustViewer(isAdjust: boolean): void {
        let splitterElement: HTMLElement = this.pdfViewerBase.getElement('_sideBarToolbarSplitter');
        let toolbarContainer: HTMLElement = this.pdfViewerBase.getElement('_toolbarContainer');
        let toolbarHeight: number = this.getToolbarHeight(toolbarContainer);
        let annotationToolbarHeight: number = this.getToolbarHeight(this.toolbarElement);
        let sideBarToolbar: HTMLElement = this.pdfViewerBase.navigationPane.sideBarToolbar;
        let sideBarContentContainer: HTMLElement = this.pdfViewerBase.navigationPane.sideBarContentContainer;
        let commentsContainer: HTMLElement = this.pdfViewerBase.navigationPane.commentPanelContainer;
        let commentPanelResizer: HTMLElement = this.pdfViewerBase.navigationPane.commentPanelResizer;
        if (isAdjust) {
            if (this.pdfViewer.enableToolbar) {
                sideBarToolbar.style.top = (toolbarHeight + annotationToolbarHeight) + 'px';
                sideBarContentContainer.style.top = (toolbarHeight + annotationToolbarHeight) + 'px';
                splitterElement.style.top = (toolbarHeight + annotationToolbarHeight) + 'px';
                commentsContainer.style.top = (toolbarHeight + annotationToolbarHeight) + 'px';
                commentPanelResizer.style.top = (toolbarHeight + annotationToolbarHeight) + 'px';
            } else {
                sideBarToolbar.style.top = (annotationToolbarHeight) + 'px';
                sideBarContentContainer.style.top = (annotationToolbarHeight) + 'px';
                splitterElement.style.top = (annotationToolbarHeight) + 'px';
                commentsContainer.style.top = (annotationToolbarHeight) + 'px';
                commentPanelResizer.style.top = (toolbarHeight + annotationToolbarHeight) + 'px';
            }
            // tslint:disable-next-line:max-line-length
            this.pdfViewerBase.viewerContainer.style.height = this.updateViewerHeight(this.getElementHeight(this.pdfViewerBase.viewerContainer), (annotationToolbarHeight + toolbarHeight)) + 'px';
            sideBarToolbar.style.height = this.getNavigationToolbarHeight(annotationToolbarHeight + toolbarHeight) + 'px';
            splitterElement.style.height = this.getNavigationToolbarHeight(annotationToolbarHeight + toolbarHeight) + 'px';
        } else {
            if (this.pdfViewer.enableToolbar) {
                // tslint:disable-next-line:max-line-length
                sideBarToolbar.style.top = toolbarHeight + 'px';
                sideBarContentContainer.style.top = toolbarHeight + 'px';
                splitterElement.style.top = toolbarHeight + 'px';
                commentsContainer.style.top = toolbarHeight + 'px';
                commentPanelResizer.style.top = toolbarHeight + 'px';
            } else {
                sideBarToolbar.style.top = 1 + 'px';
                sideBarToolbar.style.height = '100%';
                sideBarContentContainer.style.top = 1 + 'px';
                sideBarContentContainer.style.height = '100%';
                splitterElement.style.top = 1 + 'px';
                splitterElement.style.height = '100%';
                commentsContainer.style.top = 1 + 'px';
                commentsContainer.style.height = '100%';
                commentPanelResizer.style.top = 1 + 'px';
                commentPanelResizer.style.height = '100%';
            }
            // tslint:disable-next-line:max-line-length
            this.pdfViewerBase.viewerContainer.style.height = this.resetViewerHeight(this.getElementHeight(this.pdfViewerBase.viewerContainer), annotationToolbarHeight) + 'px';
            sideBarToolbar.style.height = this.getNavigationToolbarHeight(toolbarHeight);
            splitterElement.style.height = this.getNavigationToolbarHeight(toolbarHeight);
            if (this.pdfViewerBase.viewerContainer.style.height === '0px') {
                // tslint:disable-next-line
                this.pdfViewerBase.viewerContainer.style.height = (parseInt(this.pdfViewer.element.style.height) - parseInt(sideBarToolbar.style.top)) + 'px';
            }
        }
        this.updateContentContainerHeight(isAdjust);
    }

    private updateContentContainerHeight(isAdjust: boolean): void {
        let annotationToolbarHeight: number = this.getToolbarHeight(this.toolbarElement);
        let sideBarClientRect: ClientRect = this.pdfViewerBase.navigationPane.sideBarContentContainer.getBoundingClientRect();
        if (sideBarClientRect.height !== 0) {
            if (isAdjust) {
                // tslint:disable-next-line:max-line-length
                this.pdfViewerBase.navigationPane.sideBarContentContainer.style.height = sideBarClientRect.height - annotationToolbarHeight + 'px';
            } else {
                // tslint:disable-next-line:max-line-length
                this.pdfViewerBase.navigationPane.sideBarContentContainer.style.height = sideBarClientRect.height + annotationToolbarHeight + 'px';
            }
        }
    }

    private getToolbarHeight(element: HTMLElement): number {
        let toolbarHeight: number = element.getBoundingClientRect().height;
        if (toolbarHeight === 0 && element === this.pdfViewerBase.getElement('_toolbarContainer')) {
            // getComputedStyle gets the value from style and toolbar border height is added to it.
            // tslint:disable-next-line
            toolbarHeight = parseFloat(window.getComputedStyle(element)['height']) + this.toolbarBorderHeight;
        }
        return toolbarHeight;
    }

    private getNavigationToolbarHeight(toolbarHeight: number): string {
        let height: number = this.pdfViewer.element.getBoundingClientRect().height;
        return (height !== 0) ? height - toolbarHeight + 'px' : '';
    }

    private handleHighlight(): void {
        if (!this.isHighlightEnabled) {
            this.updateInteractionTools();
            this.clearShapeMode();
            this.clearMeasureMode();
            this.pdfViewer.annotationModule.textMarkupAnnotationModule.drawTextMarkupAnnotations('Highlight');
            this.primaryToolbar.selectItem(this.highlightItem);
            this.primaryToolbar.deSelectItem(this.underlineItem);
            this.primaryToolbar.deSelectItem(this.strikethroughItem);
            this.primaryToolbar.deSelectItem(this.freeTextEditItem);
            this.enableTextMarkupAnnotationPropertiesTools(true);
            this.setCurrentColorInPicker();
            this.updateColorInIcon(this.colorDropDownElement, this.pdfViewer.annotationModule.textMarkupAnnotationModule.highlightColor);
            this.isHighlightEnabled = true;
            this.isUnderlineEnabled = false;
            this.isStrikethroughEnabled = false;
        } else {
            this.deselectAllItems();
        }
    }

    private handleUnderline(): void {
        if (!this.isUnderlineEnabled) {
            this.updateInteractionTools();
            this.clearShapeMode();
            this.clearMeasureMode();
            this.pdfViewer.annotationModule.textMarkupAnnotationModule.drawTextMarkupAnnotations('Underline');
            this.primaryToolbar.selectItem(this.underlineItem);
            this.primaryToolbar.deSelectItem(this.highlightItem);
            this.primaryToolbar.deSelectItem(this.strikethroughItem);
            this.primaryToolbar.deSelectItem(this.freeTextEditItem);
            this.enableTextMarkupAnnotationPropertiesTools(true);
            this.setCurrentColorInPicker();
            this.updateColorInIcon(this.colorDropDownElement, this.pdfViewer.annotationModule.textMarkupAnnotationModule.underlineColor);
            this.isUnderlineEnabled = true;
            this.isHighlightEnabled = false;
            this.isStrikethroughEnabled = false;
        } else {
            this.deselectAllItems();
        }
    }

    private handleStrikethrough(): void {
        if (!this.isStrikethroughEnabled) {
            this.updateInteractionTools();
            this.clearShapeMode();
            this.clearMeasureMode();
            this.pdfViewer.annotationModule.textMarkupAnnotationModule.drawTextMarkupAnnotations('Strikethrough');
            this.primaryToolbar.selectItem(this.strikethroughItem);
            this.primaryToolbar.deSelectItem(this.highlightItem);
            this.primaryToolbar.deSelectItem(this.underlineItem);
            this.primaryToolbar.deSelectItem(this.freeTextEditItem);
            this.enableTextMarkupAnnotationPropertiesTools(true);
            this.setCurrentColorInPicker();
            // tslint:disable-next-line:max-line-length
            this.updateColorInIcon(this.colorDropDownElement, this.pdfViewer.annotationModule.textMarkupAnnotationModule.strikethroughColor);
            this.isStrikethroughEnabled = true;
            this.isHighlightEnabled = false;
            this.isUnderlineEnabled = false;
        } else {
            this.deselectAllItems();
        }
    }

    /**
     * @private
     */
    public deselectAllItems(): void {
        this.isHighlightEnabled = false;
        this.isUnderlineEnabled = false;
        this.isStrikethroughEnabled = false;
        if (this.pdfViewerBase.isTextMarkupAnnotationModule()) {
            this.pdfViewer.annotationModule.textMarkupAnnotationModule.isTextMarkupAnnotationMode = false;
            this.pdfViewer.annotationModule.textMarkupAnnotationModule.showHideDropletDiv(true);
        }
        if (!Browser.isDevice) {
            this.primaryToolbar.deSelectItem(this.highlightItem);
            this.primaryToolbar.deSelectItem(this.underlineItem);
            this.primaryToolbar.deSelectItem(this.strikethroughItem);
            this.primaryToolbar.deSelectItem(this.freeTextEditItem);
        }
        this.resetFreeTextAnnot();
        this.clearTextMarkupMode();
        this.clearShapeMode();
        this.clearMeasureMode();
        this.pdfViewer.tool = '';
        if (!Browser.isDevice) {
            this.enableTextMarkupAnnotationPropertiesTools(false);
            this.enableFreeTextAnnotationPropertiesTools(false);
            this.updateColorInIcon(this.colorDropDownElement, '#000000');
            this.updateColorInIcon(this.strokeDropDownElement, '#000000');
            this.updateColorInIcon(this.fontColorElement, '#000000');
            this.selectAnnotationDeleteItem(false);
        }
        if (this.pdfViewer.annotationModule) {
            this.pdfViewer.annotationModule.freeTextAnnotationModule.isNewFreeTextAnnot = false;
        }
    }

    private updateInteractionTools(): void {
        this.pdfViewerBase.initiateTextSelectMode();
        this.pdfViewer.toolbar.updateInteractionTools(true);
    }

    /**
     * @private
     */
    public selectAnnotationDeleteItem(isEnable: boolean): void {
        this.toolbar.enableItems(this.deleteItem.parentElement, isEnable);
    }

    /**
     * @private
     */
    public enableTextMarkupAnnotationPropertiesTools(isEnable: boolean): void {
        this.toolbar.enableItems(this.colorDropDownElement.parentElement, isEnable);
        this.toolbar.enableItems(this.opacityDropDownElement.parentElement, isEnable);
        if (!Browser.isDevice) {
            this.toolbar.enableItems(this.strokeDropDownElement.parentElement, false);
            this.toolbar.enableItems(this.thicknessElement.parentElement, false);
            this.toolbar.enableItems(this.fontFamilyElement.parentElement, false);
            this.toolbar.enableItems(this.fontSizeElement.parentElement, false);
            this.toolbar.enableItems(this.fontColorElement.parentElement, false);
            this.toolbar.enableItems(this.textAlignElement.parentElement, false);
            this.toolbar.enableItems(this.textPropElement.parentElement, false);
        }
    }

    /**
     * @private
     */
    public enableAnnotationPropertiesTools(isEnable: boolean): void {
        this.toolbar.enableItems(this.colorDropDownElement.parentElement, isEnable);
        this.toolbar.enableItems(this.opacityDropDownElement.parentElement, isEnable);
        this.toolbar.enableItems(this.strokeDropDownElement.parentElement, isEnable);
        this.toolbar.enableItems(this.thicknessElement.parentElement, isEnable);
        if (this.pdfViewer.enableShapeLabel) {
            this.toolbar.enableItems(this.fontFamilyElement.parentElement, isEnable);
            this.toolbar.enableItems(this.fontSizeElement.parentElement, isEnable);
            this.toolbar.enableItems(this.fontColorElement.parentElement, isEnable);
        }
        this.toolbar.enableItems(this.textAlignElement.parentElement, false);
        this.toolbar.enableItems(this.textPropElement.parentElement, false);
    }

    /**
     * @private
     */
    public enableSignaturePropertiesTools(isEnable: boolean): void {
        this.toolbar.enableItems(this.colorDropDownElement.parentElement, false);
        this.toolbar.enableItems(this.opacityDropDownElement.parentElement, isEnable);
        this.toolbar.enableItems(this.strokeDropDownElement.parentElement, isEnable);
        this.toolbar.enableItems(this.thicknessElement.parentElement, isEnable);
        this.toolbar.enableItems(this.textAlignElement.parentElement, false);
        this.toolbar.enableItems(this.textPropElement.parentElement, false);
        this.toolbar.enableItems(this.fontFamilyElement.parentElement, false);
        this.toolbar.enableItems(this.fontSizeElement.parentElement, false);
        this.toolbar.enableItems(this.fontColorElement.parentElement, false);
        this.toolbar.enableItems(this.textAlignElement.parentElement, false);
    }


    /**
     * @private
     */
    public enableStampAnnotationPropertiesTools(isEnable: boolean): void {
        this.toolbar.enableItems(this.opacityDropDownElement.parentElement, isEnable);
        this.toolbar.enableItems(this.colorDropDownElement.parentElement, false);
        this.toolbar.enableItems(this.strokeDropDownElement.parentElement, false);
        this.toolbar.enableItems(this.thicknessElement.parentElement, false);
        this.toolbar.enableItems(this.fontFamilyElement.parentElement, false);
        this.toolbar.enableItems(this.fontSizeElement.parentElement, false);
        this.toolbar.enableItems(this.fontColorElement.parentElement, false);
        this.toolbar.enableItems(this.textAlignElement.parentElement, false);
        this.toolbar.enableItems(this.textPropElement.parentElement, false);
    }

    /**
     * @private
     */
    public enableFreeTextAnnotationPropertiesTools(isEnable: boolean): void {
        this.toolbar.enableItems(this.opacityDropDownElement.parentElement, isEnable);
        this.toolbar.enableItems(this.colorDropDownElement.parentElement, isEnable);
        this.toolbar.enableItems(this.strokeDropDownElement.parentElement, isEnable);
        this.toolbar.enableItems(this.thicknessElement.parentElement, isEnable);
        this.toolbar.enableItems(this.fontFamilyElement.parentElement, isEnable);
        this.toolbar.enableItems(this.fontSizeElement.parentElement, isEnable);
        this.toolbar.enableItems(this.fontColorElement.parentElement, isEnable);
        this.toolbar.enableItems(this.textAlignElement.parentElement, isEnable);
        this.toolbar.enableItems(this.textPropElement.parentElement, isEnable);
    }


    /**
     * @private
     */
    public enableAnnotationAddTools(isEnable: boolean): void {
        if (this.pdfViewer.enableTextMarkupAnnotation) {
            this.toolbar.enableItems(this.highlightItem.parentElement, isEnable);
            this.toolbar.enableItems(this.underlineItem.parentElement, isEnable);
            this.toolbar.enableItems(this.strikethroughItem.parentElement, isEnable);
        }
        if (this.pdfViewer.enableShapeAnnotation) {
            this.toolbar.enableItems(this.shapeElement.parentElement, isEnable);
        }
        if (this.pdfViewer.enableStampAnnotations) {
            this.toolbar.enableItems(this.stampElement.parentElement, isEnable);
        }
        if (this.pdfViewer.enableMeasureAnnotation && this.pdfViewerBase.isCalibrateAnnotationModule()) {
            this.toolbar.enableItems(this.calibrateElement.parentElement, isEnable);
        }
        if (this.pdfViewer.enableFreeText) {
            this.toolbar.enableItems(this.freeTextEditItem.parentElement, isEnable);
        }
        if (this.pdfViewer.enableHandwrittenSignature) {
            this.toolbar.enableItems(this.handWrittenSignatureItem.parentElement, isEnable);
        }
    }

    /**
     * @private
     */
    public isAnnotationButtonsEnabled(): boolean {
        let isButtonsEnabled: boolean = false;
        if (this.isHighlightEnabled || this.isUnderlineEnabled || this.isStrikethroughEnabled) {
            isButtonsEnabled = true;
        }
        return isButtonsEnabled;
    }

    /**
     * @private
     */
    public enableCommentPanelTool(isEnable: boolean): void {
        this.toolbar.enableItems(this.commentItem.parentElement, isEnable);
    }

    private updateToolbarItems(): void {
        if (this.pdfViewer.enableTextMarkupAnnotation) {
            this.enableTextMarkupAddTools(true);
        } else {
            this.enableTextMarkupAddTools(false);
        }
        this.toolbar.enableItems(this.shapeElement.parentElement, this.pdfViewer.enableShapeAnnotation);
        this.toolbar.enableItems(this.stampElement.parentElement, this.pdfViewer.enableStampAnnotations);
        this.toolbar.enableItems(this.calibrateElement.parentElement, this.pdfViewer.enableMeasureAnnotation);
        this.toolbar.enableItems(this.freeTextEditItem.parentElement, this.pdfViewer.enableFreeText);
        this.toolbar.enableItems(this.handWrittenSignatureItem.parentElement, this.pdfViewer.enableHandwrittenSignature);

    }

    private enableTextMarkupAddTools(isEnable: boolean): void {
        this.toolbar.enableItems(this.highlightItem.parentElement, isEnable);
        this.toolbar.enableItems(this.underlineItem.parentElement, isEnable);
        this.toolbar.enableItems(this.strikethroughItem.parentElement, isEnable);
    }

    /**
     * @private
     */
    // for shapes added by drawing package
    public updateAnnnotationPropertyItems(): void {
        if (this.pdfViewer.selectedItems.annotations.length === 1) {
            // tslint:disable-next-line:max-line-length
            this.pdfViewer.toolbar.annotationToolbarModule.updateColorInIcon(this.colorDropDownElement, this.getColorHexValue(this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.fill, 'fillColor'));
            this.pdfViewer.toolbar.annotationToolbarModule.updateColorInIcon(this.strokeDropDownElement, this.getColorHexValue(this.pdfViewer.selectedItems.annotations[0].wrapper.children[0].style.strokeColor, 'strokeColor'));
            if (this.pdfViewer.selectedItems.annotations[0].shapeAnnotationType === 'FreeText') {
                // tslint:disable-next-line
                this.pdfViewer.toolbar.annotationToolbarModule.updateColorInIcon(this.fontColorElement, this.getColorHexValue(this.pdfViewer.selectedItems.annotations[0].fontColor, 'fontColor'));
                this.pdfViewer.toolbar.annotationToolbarModule.updateFontFamilyInIcon(this.pdfViewer.selectedItems.annotations[0].fontFamily);
                this.pdfViewer.toolbar.annotationToolbarModule.updateFontSizeInIcon(this.pdfViewer.selectedItems.annotations[0].fontSize);
                this.pdfViewer.toolbar.annotationToolbarModule.updateTextAlignInIcon(this.pdfViewer.selectedItems.annotations[0].textAlign);
            }
        } else {
            this.pdfViewer.toolbar.annotationToolbarModule.updateColorInIcon(this.colorDropDownElement, '#000000');
            this.pdfViewer.toolbar.annotationToolbarModule.updateColorInIcon(this.strokeDropDownElement, '#000000');
            this.pdfViewer.toolbar.annotationToolbarModule.updateColorInIcon(this.fontColorElement, '#000000');
        }
    }

    private getColorHexValue(colorString: string, type: string): string {
        if (colorString === '#ffffff00') {
            colorString = '#ffffff';
        }
        if (colorString.toLowerCase() === 'red') {
            colorString = '#FF0000';
        }
        if (colorString !== 'transparent') {
            return this.colorPalette.getValue(colorString, 'hex');
        } else {
            if (type === 'fontColor' || type === 'strokeColor') {
                return '#000000';
            } else {
                return '#ffffff';
            }
        }
    }

    private setColorInPicker(colorpick: ColorPicker, colorString: string): void {
        colorpick.setProperties({ 'value': colorString }, true);
    }

    /**
     * @private
     */
    public resetToolbar(): void {
        this.adjustViewer(false);
        this.updateToolbarItems();
        this.toolbarElement.style.display = 'none';
        this.isToolbarHidden = true;
    }

    /**
     * @private
     */
    public clearTextMarkupMode(): void {
        if (this.pdfViewerBase.isTextMarkupAnnotationModule()) {
            this.pdfViewer.annotation.textMarkupAnnotationModule.currentTextMarkupAddMode = '';
        }
    }

    /**
     * @private
     */
    public clearShapeMode(): void {
        if (this.pdfViewerBase.isShapeAnnotationModule()) {
            this.pdfViewer.annotation.shapeAnnotationModule.currentAnnotationMode = '';
        }
    }

    /**
     * @private
     */
    public clearMeasureMode(): void {
        if (this.pdfViewerBase.isCalibrateAnnotationModule()) {
            this.pdfViewer.annotation.measureAnnotationModule.currentAnnotationMode = '';
        }
    }

    /**
     * @private
     */
    public clear(): void {
        this.deselectAllItems();
    }

    /**
     * @private
     */
    public destroy(): void {
        this.colorDropDown.destroy();
        this.opacityDropDown.destroy();
        this.strokeDropDown.destroy();
        this.thicknessDropDown.destroy();
        this.shapeDropDown.destroy();
        this.calibrateDropDown.destroy();
        this.toolbar.destroy();
        this.fontColorDropDown.destroy();
        this.textAlignDropDown.destroy();
        this.textPropertiesDropDown.destroy();
    }

    private getElementHeight(element: HTMLElement): number {
        return element.getBoundingClientRect().height;
    }

    private updateViewerHeight(viewerHeight: number, toolbarHeight: number): number {
        return this.getElementHeight(this.pdfViewer.element) - toolbarHeight;
    }

    private resetViewerHeight(viewerHeight: number, toolbarHeight: number): number {
        return viewerHeight + toolbarHeight;
    }
}