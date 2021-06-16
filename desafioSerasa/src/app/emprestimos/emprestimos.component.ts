import { Emprestimo } from './../model/emprestimo.interface';
import { FirestoredbService } from './../db/firestoredb.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../model/user.interface';


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

  //usuario fake
  usuario: User;


  //Variaveis referentes ao modal de informaçoes do empréstimo
  numMaximoDeParcelas:number = 24;
  parcelasEmprestimoOferecido:{value, viewValue, valorParcelas}[];
  parcelaEscolhida:{value, viewValue, valorParcelas};
  vencimentoPrimeiraParcela: Date = null;

  //data utilizada para os emprestimos
  today: number  = Date.now();



  emprestimoContratado: Emprestimo;

  valorTotal:number;

  async ngOnInit() {
    this.emprestimosUsuario = this.fsdb.getEmprestimosDoUsuario();
    this.emprestimos = this.fsdb.emprestimosDisponiveis();
    this.usuario = await this.fsdb.getFakeUser()

  }

  modalInformacoesEmprestimo(informacoesEmprestimo, emprestimo:Emprestimo){
    this.vencimentoPrimeiraParcela = null;
    this.parcelasEmprestimoOferecido=[];

    for (let index = 0; index < this.numMaximoDeParcelas; index++) {

      this.parcelasEmprestimoOferecido[index] = {
        value: index+1,
        viewValue: ''+(index+1)+' x '+ parseFloat(((emprestimo.valor*((1+(emprestimo.taxa/100))**(index+1)))/(index+1)).toFixed(2)),
        valorParcelas: parseFloat(((emprestimo.valor*((1+(emprestimo.taxa/100))**(index+1)))/(index+1)).toFixed(2)),
      };
    }
    this.valorTotal = 0;
    this.modalService.open(informacoesEmprestimo);
  }

  contratarEmprestimo(emprestimo: Emprestimo){

    if(this.usuario.score >= emprestimo.scoreMinimo){


      emprestimo.parcelas = [];
      let dataHoje = new Date();
      let dataVencimentoParcela = new Date();

      for (let index = 0; index < this.parcelaEscolhida.value; index++) {
        emprestimo.parcelas[index] = {
          valorParcelas: this.parcelaEscolhida.valorParcelas,
          dataVencimento : dataVencimentoParcela.setMonth(dataVencimentoParcela.getMonth()+(1)),
          dataPagamento: null,
         };
         console.log(emprestimo.parcelas[index]);
      }
      emprestimo.dataDaContratação = this.today;
      emprestimo.parcelasPagas = 0;
      emprestimo.numeroDeParcelas = this.parcelaEscolhida.value;
      emprestimo.valorTotal = this.valorTotal;
      emprestimo.pendencia = true;
      this.fsdb.salvarEmprestimo(emprestimo);


    }else{
      alert("Seu Score é abaixo do recomendado, tente outro empréstimo")
    }


  }

  calcularValorTotal(parcela, emprestimo:Emprestimo){
    let vencimentoParcela = new Date();
    vencimentoParcela.setMonth(vencimentoParcela.getMonth()+(1));
    this.vencimentoPrimeiraParcela = vencimentoParcela
    this.parcelaEscolhida = parcela;
    this.valorTotal = parseFloat((parcela.value * parseFloat(((emprestimo.valor*((1+(emprestimo.taxa/100))**(parcela.value)))/(parcela.value)).toFixed(2))).toFixed(2));
  }

  pagarUmaParcela(emprestimo: Emprestimo){
    emprestimo.parcelas[emprestimo.parcelasPagas].dataPagamento = Date.now();
    emprestimo.parcelasPagas++;
    if(emprestimo.parcelasPagas==emprestimo.numeroDeParcelas){
      emprestimo.pendencia = false;
    };
    let mensagem = "Parcela paga com sucesso!"
    this.fsdb.atualizarEmprestimo(emprestimo,mensagem);
  }


  quitarEmprestimo(emprestimo: Emprestimo){
    let resultado = confirm("Deseja quitar o emprestimo?");
    if(resultado==true){
      for (let index = 0; index < emprestimo.parcelas.length; index++) {
        emprestimo.parcelas[index].dataPagamento = Date.now();
      }
      emprestimo.parcelasPagas = emprestimo.numeroDeParcelas;
      emprestimo.pendencia = false;
      let mensagem = "Emprestimo quitado com sucesso!"
      this.fsdb.atualizarEmprestimo(emprestimo,mensagem);
    }
  }




}
