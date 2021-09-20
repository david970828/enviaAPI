import { Guias } from './guias';
import { v4 } from 'uuid';

export class Documentos {
  constructor() {}
  crearGuia = async (sourceName, destinationName, data) => {
    this.guias = new Guias(sourceName, v4());
    try {
      await this.guias.fill(data);
    } catch (e) {
      console.log(e);
    }
  };
}
