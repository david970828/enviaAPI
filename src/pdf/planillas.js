import { deconstructToTablePaquete } from '../util';
import { HEADERS_PLANILLA } from '../util/constants';
import { FillPdf } from './fillPdf';

export class Planillas extends FillPdf {
  constructor(source, fileName) {
    super(source, fileName);
    this.destination = process.env.FOLDER_PLANILLAS;
  }
  fill = async (data) => {
    await this.initializeFill();
    await this.insertTableInPDF(data);
    await this.saveOnAlfresco();
  };
}
