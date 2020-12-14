import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Aluno } from '../models/aluno';

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

  public alunos = [
    { id: 1, nome: 'Marta', sobrenome: 'abc', telefone: 12345678 },
    { id: 2, nome: 'Paula', sobrenome: 'def', telefone: 12345679 },
    { id: 3, nome: 'Laura', sobrenome: 'ghi', telefone: 12345670 },
    { id: 4, nome: 'Luiz', sobrenome: 'jkl', telefone: 12345671 },
    { id: 5, nome: 'Lucas', sobrenome: 'mno', telefone: 12345672 },
    { id: 6, nome: 'Pedro', sobrenome: 'pqr', telefone: 12345673 },
    { id: 7, nome: 'Paulo', sobrenome: 'srt', telefone: 12345674 },
  ];

  // tslint:disable-next-line:typedef
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  constructor(private fb: FormBuilder,
              private modalService: BsModalService) {
    this.criarForm();
  }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  alunoSelect(aluno: Aluno) {
    this.alunoSelecionado = aluno;
    this.alunoForm.patchValue(aluno);
  }

  // tslint:disable-next-line:typedef
  voltar() {
    this.alunoSelecionado = null;
  }

  // tslint:disable-next-line:typedef
  criarForm() {
    this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  // tslint:disable-next-line:typedef
  alunoSubmit() {
    console.log(this.alunoForm.value);
  }
}
