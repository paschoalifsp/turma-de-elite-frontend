import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import User from "../../../../shared/model/user";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit {

  dataSource = new MatTableDataSource<User>([
    {name: 'André M Gomes',email: 'andre.gomes@aluno.ifsp.edu.br'},
    {name: 'André M Gomes',email: 'andre.gomes@aluno.ifsp.edu.br'},
    {name: 'André M Gomes',email: 'andre.gomes@aluno.ifsp.edu.br'},
    {name: 'André M Gomes',email: 'andre.gomes@aluno.ifsp.edu.br'},
  ]);

  displayedColumns = ['name','email','actions'];

  constructor() { }

  ngOnInit(): void {
  }

}
