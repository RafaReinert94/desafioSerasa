import { Emprestimo } from './../model/emprestimo.interface';
import { FirestoredbService } from './../db/firestoredb.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getLocaleDateFormat } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { ThrowStmt } from '@angular/compiler';

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
  vencimentoPrimeiraParcela: Date = null;

  //data utilizada para os emprestimos
  today = new Date();



  emprestimoContratado: Emprestimo;

  valorTotal:number;

  ngOnInit(): void {
    this.emprestimosUsuario = this.fsdb.getEmprestimosDoUsuario();
    this.emprestimos = this.fsdb.emprestimosDisponiveis();
  }

  modalInformacoesEmprestimo(informacoesEmprestimo, emprestimo:Emprestimo){
    this.vencimentoPrimeiraParcela = null;
    this.parcelas=[];

    for (let index = 0; index < this.numMaximoDeParcelas; index++) {

      this.parcelas[index] = {
        value: index+1,
        viewValue: ''+(index+1)+' x '+ parseFloat(((emprestimo.valor*((1+(emprestimo.taxa/100))**(index+1)))/(index+1)).toFixed(2)),
        valorParcelas: parseFloat(((emprestimo.valor*((1+(emprestimo.taxa/100))**(index+1)))/(index+1)).toFixed(2)),
      };
    }
    this.valorTotal = 0;
    this.modalService.open(informacoesEmprestimo);
  }

  contratarEmprestimo(emprestimo: Emprestimo){
    emprestimo.parcelasJaPagas = [];
    let dataVencimentoParcela = new Date();
    for (let index = 0; index < emprestimo.parcelas; index++) {
      dataVencimentoParcela.setMonth(dataVencimentoParcela.getMonth()+(1));
      emprestimo.parcelasJaPagas[index] = {
        valorParcelas: this.parcelaEscolhida.valorParcelas,
        dataVencimento: dataVencimentoParcela
       }

    }
    emprestimo.dataDaContratação = new Date();
    emprestimo.parcelasPagas = 0;
    emprestimo.parcelas = this.parcelaEscolhida.value;
    emprestimo.valorTotal = this.valorTotal;
    this.fsdb.salvarEmprestimo(emprestimo);
  }

  calcularValorTotal(parcela, emprestimo:Emprestimo){
    let vencimentoParcela = new Date();
    vencimentoParcela.setMonth(vencimentoParcela.getMonth()+(1));
    this.vencimentoPrimeiraParcela = vencimentoParcela
    this.parcelaEscolhida = parcela;
    this.valorTotal = parseFloat((parcela.value * parseFloat(((emprestimo.valor*((1+(emprestimo.taxa/100))**(parcela.value)))/(parcela.value)).toFixed(2))).toFixed(2));
  }




}
