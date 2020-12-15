import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Professor } from '../models/Professor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ProfessorService } from './professor.service';

@Component({
  selector: 'app-professores',
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {

  public professorTitle = 'Professores';
  public professorSelecionado!: Professor;
  public professorForm!: FormGroup;
  public modalRef!: BsModalRef;
  public modo!: 'post' | 'put';

  public professores!: Professor[];
  //   { id: 1, nome: 'Professor1', disciplina: 'Matematica' },
  //   { id: 2, nome: 'Professor2', disciplina: 'Fisica' },
  //   { id: 3, nome: 'Professor3', disciplina: 'Portugues' },
  //   { id: 4, nome: 'Professor4', disciplina: 'Ingles' },
  //   { id: 5, nome: 'Professor5', disciplina: 'Programacao' },
  // ];

  // tslint:disable-next-line:typedef
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private professorService: ProfessorService) {
    this.criarForm();
  }
  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.carregarProfessores();
  }

  // tslint:disable-next-line:typedef
  carregarProfessores(){
    this.professorService.getAll().subscribe(
      (professores: Professor[]) => {
        this.professores = professores;
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  // tslint:disable-next-line:typedef
  professorSelect(professor: Professor) {
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  // tslint:disable-next-line:typedef
  professorNovo() {
    this.professorSelecionado = new Professor();
    this.professorForm.patchValue(this.professorSelecionado);
  }


  // tslint:disable-next-line:typedef
  criarForm() {
    this.professorForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      // disciplina: ['', Validators.required],
    });
  }

  // tslint:disable-next-line:typedef
  salvarProfessor(professor: Professor) {
    (professor.id === 0 ) ? this.modo = 'post' : this.modo = 'put';
    this.professorService[this.modo](professor).subscribe(
      // tslint:disable-next-line: no-shadowed-variable
      (retorno: any) => {
        console.log(retorno);
        this.carregarProfessores();
      },
      (erro: any) => {
        console.log(erro);
      }
    );
  }

  // tslint:disable-next-line:typedef
  deletarProfessor(id: number) {
    this.professorService.delete(id).subscribe(
      (model) => {
        console.log(model),
        this.carregarProfessores();
      },
      (erro: any) => {
        console.error(erro);
      }
    );
  }

  // tslint:disable-next-line:typedef
  professorSubmit() {
    this.salvarProfessor(this.professorForm.value);
  }

  // tslint:disable-next-line:typedef
  voltar() {
    // tslint:disable-next-line:no-unused-expression
    this.professorSelecionado = null as any;
  }
}
