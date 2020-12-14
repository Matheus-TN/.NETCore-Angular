import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Professor } from '../models/professor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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

  public professores = [
    { id: 1, nome: 'Professor1', disciplina: 'Matematica' },
    { id: 2, nome: 'Professor2', disciplina: 'Fisica' },
    { id: 3, nome: 'Professor3', disciplina: 'Portugues' },
    { id: 4, nome: 'Professor4', disciplina: 'Ingles' },
    { id: 5, nome: 'Professor5', disciplina: 'Programacao' },
  ];

  // tslint:disable-next-line:typedef
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }


  constructor(private fb: FormBuilder,
              private modalService: BsModalService) {
    this.criarForm();
  }
  // tslint:disable-next-line:typedef
  ngOnInit() {
  }

  // tslint:disable-next-line:typedef
  professorSelect(professor: Professor) {
    this.professorSelecionado = professor;
    this.professorForm.patchValue(professor);
  }

  // tslint:disable-next-line:typedef
  voltar() {
    this.professorSelecionado = null;
  }

  // tslint:disable-next-line:typedef
  criarForm() {
    this.professorForm = this.fb.group({
      nome: ['', Validators.required],
      disciplina: ['', Validators.required],
    });
  }

  // tslint:disable-next-line:typedef
  professorSubmit() {
    console.log(this.professorForm.value);
  }
}
