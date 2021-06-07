import { Emprestimo } from './../model/emprestimo.interface';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../model/user.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirestoredbService {

  constructor(private afs: AngularFirestore) { }

  getFakeUser(): Promise<User>{
    return new Promise((resolve)=>{
      return this.afs.collection('usuario').doc('ritCXCcIQ4qSIyYXAxCI').valueChanges().subscribe((resp)=>{
        let user: User = resp;
        return resolve(user);
      })
    })
  }

  getEmprestimosDoUsuario(): Observable<Emprestimo[]>{
    return this.afs.collection('usuario').doc('ritCXCcIQ4qSIyYXAxCI').collection('emprestimos').valueChanges();
  }

}
