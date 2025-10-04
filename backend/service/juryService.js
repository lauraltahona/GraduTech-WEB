import { JuryRepository } from '../repository/jury-repository.js';

export class JuryService {
  static async createJury({carrera, usuario}) {
    const jury =  await JuryRepository.createJury({carrera, usuario});
    return jury;
  }

  static async getAllJurys() {
    const jurys = await JuryRepository.getAllJurys();
    return jurys;
  }

  static async getJuradoById(idJurado) {
    const jurado = await JuryRepository.getJuradoById(idJurado);
    return jurado;
  }
    

}
