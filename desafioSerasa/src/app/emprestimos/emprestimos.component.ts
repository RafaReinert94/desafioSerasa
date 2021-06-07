import { Emprestimo } from './../model/emprestimo.interface';
import { FirestoredbService } from './../db/firestoredb.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-emprestimos',
  templateUrl: './emprestimos.component.html',
  styleUrls: ['./emprestimos.component.scss']
})
export class EmprestimosComponent implements OnInit {

  constructor(private fsdb: FirestoredbService) { }


  emprestimos: Observable<Emprestimo[]>;

  ngOnInit(): void {
    this.emprestimos = this.fsdb.getEmprestimosDoUsuario();
  }



}
