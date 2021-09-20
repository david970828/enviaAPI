import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import { AlfrescoController } from '../alfresco';
import { documentPath } from '../util';

export class FillPdf {
  constructor(source, fileName) {
    this.source = documentPath(source);
    this.fileName = documentPath(fileName);
    this.Alfresco = new AlfrescoController();
    this.destination = '';
  }
  initializeFill = async () => {
    const fileToUpload = fs.readFileSync(this.source);
    this.pdfDoc = await PDFDocument.load(fileToUpload);
    this.form = this.pdfDoc.getForm();
  };
  setField = async (fieldName, fieldText) => {
    const field = this.form.getTextField(fieldName);
    field.setText(
      typeof fieldText !== 'number' ? fieldText : fieldText.toString()
    );
  };
  saveDocument = async () => {
    this.documentSaved = await this.pdfDoc.save();
    fs.writeFileSync(this.fileName, this.documentSaved);
  };
  saveOnAlfresco = async () => {
    await this.Alfresco.loginAlfresco();
    this.saveDocument()
      .then(async () => {
        return await this.Alfresco.uploadFile(this.fileName, this.destination);
      })
      .then((res) => {
        fs.unlinkSync(this.fileName);
      });
  };
  getDocumentSaved = () => this.documentSaved;
}
