export class Professor {

    constructor() {
        this.id = 0;
        this.nome = '';
    }

    // tslint:disable-next-line:ban-types
    id!: number;
    nome!: string;
    disciplina!: string;
}
