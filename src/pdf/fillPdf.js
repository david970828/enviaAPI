import { PDFDocument } from 'pdf-lib';
import fs from 'fs';
import { AlfrescoController } from '../alfresco';
import { documentPath } from '../util';
import 'jspdf-autotable';
import { generatePDF } from '../util/generatePdf';

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
    const node = await this.Alfresco.uploadFile(
      this.fileName,
      this.destination
    );
    fs.unlinkSync(this.fileName, (err, res) => {
      if (err) console.log(err);
      console.log(res);
    });
    return node;
  };
  getDocumentSaved = () => this.documentSaved;
  makeTable = async (body) => {
    const doc = await generatePDF(body);
    doc.save(this.fileName);
  };
  insertTableInPDF = async (body) => {
    try {
      await this.makeTable(body);
    } catch (e) {
      console.log(e);
    }
  };
}
