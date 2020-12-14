import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfis',
  templateUrl: './perfis.component.html',
  styleUrls: ['./perfis.component.css']
})
export class PerfisComponent implements OnInit {

  public perfilTitle = 'Perfis';

  public perfis = [
    { name: 'Perfil1' },
    { name: 'Perfil2' },
    { name: 'Perfil3' },
    { name: 'Perfil4' },
    { name: 'Perfil5' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
