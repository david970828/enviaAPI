import { Guias } from './guias';
import { Planillas } from './planillas';

export class Documentos {
  constructor() {}
  crearGuia = async (sourceName, destinationName, data) => {
    this.guia = new Guias(sourceName, destinationName);
    try {
      return await this.guia.fill(data);
    } catch (e) {
      console.log(e);
    }
  };
  crearPlanilla = async (sourceName, destinationName, data) => {
    this.planilla = new Planillas(sourceName, destinationName);
    try {
      return await this.planilla.fill(data);
    } catch (error) {
      console.log(error);
    }
  };
}
