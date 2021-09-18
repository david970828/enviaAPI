import { PDFDocument } from 'pdf-lib';
import fs from 'fs';

export class FillPdf {
  constructor(source) {
    this.source = source;
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
    fs.writeFileSync('./file.pdf', this.documentSaved);
  };
}
