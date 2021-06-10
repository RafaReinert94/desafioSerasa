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

  //variaveis do banco de dados, utilizando observable
  emprestimosUsuario: Observable<Emprestimo[]>;
  emprestimos: Observable<Emprestimo[]>;


  //Variaveis referentes ao modal de informaçoes do empréstimo
  numMaximoDeParcelas:number = 24;
  parcelas:{value, viewValue, valorParcelas}[];
  parcelaEscolhida:{value, viewValue, valorParcelas};


  emprestimoContratado: Emprestimo;

  valorTotal:number;

  ngOnInit(): void {
    this.emprestimosUsuario = this.fsdb.getEmprestimosDoUsuario();
    this.emprestimos = this.fsdb.emprestimosDisponiveis();
  }

  modalInformacoesEmprestimo(informacoesEmprestimo, emprestimo:Emprestimo){

    this.parcelas=[];

    for (let index = 0; index < this.numMaximoDeParcelas; index++) {
      this.parcelas[index] = {
        value: index+1,
        viewValue: ''+(index+1)+' x '+ parseFloat(((emprestimo.valor*((1+(emprestimo.taxa/100))**(index+1)))/(index+1)).toFixed(2)),
        valorParcelas: parseFloat(((emprestimo.valor*((1+(emprestimo.taxa/100))**(index+1)))/(index+1)).toFixed(2))
      };
    }
    console.log(this.parcelas)
    this.valorTotal = 0;
    this.modalService.open(informacoesEmprestimo);
  }

  contratarEmprestimo(emprestimo: Emprestimo){
    emprestimo.parcelasPagas = 0;
    emprestimo.parcelas = this.parcelaEscolhida.value;
    emprestimo.valorParcela = this.parcelaEscolhida.valorParcelas;
    emprestimo.valorTotal = this.valorTotal;
    this.fsdb.salvarEmprestimo(emprestimo);
  }

  calcularValorTotal(parcela, emprestimo:Emprestimo){
    this.parcelaEscolhida = parcela;
    this.valorTotal = parseFloat((parcela.value * parseFloat(((emprestimo.valor*((1+(emprestimo.taxa/100))**(parcela.value)))/(parcela.value)).toFixed(2))).toFixed(2));
  }




}
