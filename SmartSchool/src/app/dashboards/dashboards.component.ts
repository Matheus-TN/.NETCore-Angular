import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent implements OnInit {

  public dashboardTitle = 'Principal';

  public dashboards = [
    {name: 'Cadastro1' },
    {name: 'Cadastro2' },
    {name: 'Cadastro3' },
    {name: 'Cadastro4' },
    {name: 'Cadastro5' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
