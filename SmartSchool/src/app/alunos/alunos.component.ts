import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Aluno } from '../models/Aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  public alunoTitle = 'Alunos';
  public alunoSelecionado!: Aluno;
  public textSimple!: string;
  public alunoForm!: FormGroup;
  public modalRef!: BsModalRef;
  public modo!: 'post' | 'put';

  // public alunos: Map<string, any> = new Map<string, any>();
  public alunos!: Aluno[];
    // { id: 1, nome: 'Marta', sobrenome: 'abc', telefone: 12345678 },
    // { id: 2, nome: 'Paula', sobrenome: 'def', telefone: 12345679 },
    // { id: 3, nome: 'Laura', sobrenome: 'ghi', telefone: 12345670 },
    // { id: 4, nome: 'Luiz', sobrenome: 'jkl', telefone: 12345671 },
    // { id: 5, nome: 'Lucas', sobrenome: 'mno', telefone: 12345672 },
    // { id: 6, nome: 'Pedro', sobrenome: 'pqr', telefone: 12345673 },
    // { id: 7, nome: 'Paulo', sobrenome: 'srt', telefone: 12345674 },
   // ];

  // tslint:disable-next-line:typedef
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private alunoService: AlunoService) {
    this.criarForm();
  }

  ngOnInit(): void {
    this.carregarAlunos();
  }

  // tslint:disable-next-line:typedef
  carregarAlunos(){
    this.alunoService.getAll().subscribe(
      (alunos: Aluno[]) => {
        this.alunos = alunos;
      },
      (erro: any) => {
        console.error(erro);      }
    );
  }

  // tslint:disable-next-line:typedef
  alunoSelect(aluno: Aluno) {
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  // tslint:disable-next-line:typedef
  alunoNovo() {
    this.alunoSelecionado = new Aluno();
    this.alunoForm.patchValue(this.alunoSelecionado);
  }

  // tslint:disable-next-line:typedef
  criarForm() {
    this.alunoForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  // tslint:disable-next-line:typedef
  salvarAluno(aluno: Aluno) {
    (aluno.id === 0) ? this.modo = 'post' : this.modo = 'put';
    this.alunoService[this.modo](aluno).subscribe(
      // tslint:disable-next-line: no-shadowed-variable
      (retorno: any) => {
        console.log(retorno);
        this.carregarAlunos();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  // tslint:disable-next-line:typedef
  deletarAluno(id: number) {
    this.alunoService.delete(id).subscribe(
      (model) => {
        console.log(model),
        this.carregarAlunos();
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  // tslint:disable-next-line:typedef
  alunoSubmit() {
    this.salvarAluno(this.alunoForm.value);
  }

  // tslint:disable-next-line:typedef
  voltar() {
    // tslint:disable-next-line:no-unused-expression
    this.alunoSelecionado = null as any;
  }
}
