import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import { AlfrescoController } from '../alfresco';
import { documentPath } from '../util';

export class FillPdf {
  constructor(source, fileName) {
    this.source = documentPath(source);
    this.fileName = documentPath(fileName);
    this.Alfresco = null;
  }
  initializeFill = async () => {
    this.Alfresco = await AlfrescoController.getInstance();
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
    this.saveDocument()
      .then(async () => {
        return await this.Alfresco.uploadFile(
          this.fileName,
          process.env.FOLDER_GUIAS
        );
      })
      .then((res) => {
        fs.unlinkSync(this.fileName);
      });
  };
  getDocumentSaved = () => this.documentSaved;
}
