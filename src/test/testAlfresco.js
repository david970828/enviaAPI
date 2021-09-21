import { MockGuia } from '../mocks/MockGuia';
import { MockPlanilla } from '../mocks/MockPlanilla';
import { Documentos } from '../pdf/index';

export class Prueba {
  constructor(nameGuia, nameDestination) {
    this.nameGuia = nameGuia;
    this.nameDestination = nameDestination;
    this.documentos = new Documentos();
  }
  prueba = async () => {
    try {
      await this.documentos.crearGuia(
        this.nameGuia,
        this.nameDestination,
        MockGuia
      );
    } catch (err) {
      console.log(err);
    }
  };
  pruebaPlanilla = async () => {
    try {
      await this.documentos.crearPlanilla(
        this.nameGuia,
        this.nameDestination,
        MockPlanilla
      );
    } catch (err) {
      console.log(err);
    }
  };
}
