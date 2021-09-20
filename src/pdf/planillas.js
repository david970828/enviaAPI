export class Guias extends FillPdf {
  constructor(source, fileName) {
    super(source, fileName);
    this.destination = process.env.FOLDER_PLANILLAS;
  }
  fill = async (data) => {
    //TODO
  };
}
