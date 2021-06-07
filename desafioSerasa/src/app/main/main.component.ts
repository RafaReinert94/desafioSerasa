import { FirestoredbService } from './../db/firestoredb.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  usuario: User

  constructor(private fsdb: FirestoredbService, private router: Router) { }

  async ngOnInit() {

    this.usuario = await this.fsdb.getFakeUser();
    console.log(this.usuario);
  }

  goEmprestimos(){
    this.router.navigate(['emprestimos']);
  }



}
