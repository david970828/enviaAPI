import { Guias } from './guias';

export class Documentos {
  constructor() {}
  crearGuia = async (sourceName, destinationName, data) => {
    this.guias = new Guias(sourceName, destinationName);
    try {
      await this.guias.fill(data);
    } catch (e) {
      console.log(e);
    }
  };
}
