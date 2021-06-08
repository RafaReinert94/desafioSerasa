import { Emprestimo } from './../model/emprestimo.interface';
import { FirestoredbService } from './../db/firestoredb.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-emprestimos',
  templateUrl: './emprestimos.component.html',
  styleUrls: ['./emprestimos.component.scss']
})
export class EmprestimosComponent implements OnInit {

  constructor(private fsdb: FirestoredbService, private modalService: NgbModal) { }


  emprestimosUsuario: Observable<Emprestimo[]>;
  emprestimos: Observable<Emprestimo[]>;

  parcelas = [
    {value: 1, viewValue: '1 x Parcela'},
    {value: 2, viewValue: '2 x Parcelas'},
    {value: 3, viewValue: '3 x Parcelas'},
    {value: 4, viewValue: '4 x Parcelas'},
    {value: 5, viewValue: '5 x Parcelas'},
    {value: 6, viewValue: '6 x Parcelas'},
    {value: 7, viewValue: '7 x Parcelas'},
    {value: 8, viewValue: '8 x Parcelas'},
    {value: 9, viewValue: '9 x Parcelas'},
    {value: 10, viewValue: '10 x Parcelas'},
    {value: 11, viewValue: '11 x Parcelas'},
    {value: 12, viewValue: '12 x Parcelas'},
    {value: 13, viewValue: '13 x Parcelas'},
    {value: 14, viewValue: '14 x Parcelas'},
    {value: 15, viewValue: '15 x Parcelas'},
    {value: 16, viewValue: '16 x Parcelas'},
    {value: 17, viewValue: '17 x Parcelas'},
    {value: 18, viewValue: '18 x Parcelas'},
    {value: 19, viewValue: '19 x Parcelas'},
    {value: 20, viewValue: '20 x Parcelas'},
    {value: 21, viewValue: '21 x Parcelas'},
    {value: 22, viewValue: '22 x Parcelas'},
    {value: 23, viewValue: '23 x Parcelas'},
    {value: 24, viewValue: '24 x Parcelas'},

  ];

  emprestimoContratado: Emprestimo;

  valorTotal:number;

  ngOnInit(): void {
    this.emprestimosUsuario = this.fsdb.getEmprestimosDoUsuario();
    this.emprestimos = this.fsdb.emprestimosDisponiveis();
  }

  modalInformacoesEmprestimo(informacoesEmprestimo){
    this.valorTotal = 0;
    this.modalService.open(informacoesEmprestimo);
  }

  contratarEmprestimo(parcela:number, ){

  }

  calcularValorTotal(parcela, emprestimo:Emprestimo){
    this.valorTotal = parseFloat((emprestimo.valor*((1+(emprestimo.taxa/100))**parcela.value)).toFixed(2));

  }




}
