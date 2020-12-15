export class Aluno{
    constructor() {
        this.id = 0;
        this.nome = '';
        this.sobrenome = '';
        this.telefone = 0;
    }

    // tslint:disable-next-line:ban-types
    id!: number;
    nome!: string;
    sobrenome!: string;
    // tslint:disable-next-line:ban-types
    telefone!: number;
}
