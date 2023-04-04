import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual:number = 1
  limitPorPagina:number = 6
  haMaisPensamentos: boolean = true
  filtro: string = ''
  favoritos: boolean = false
  listaFavoritos: Pensamento[] = []
  titulo: string = 'Meu Mural'

  constructor(
    private service: PensamentoService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.listarTodosPensamentos()
  }

  listarTodosPensamentos(){
    this.service.listar(this.paginaAtual, this.limitPorPagina, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    })
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.limitPorPagina, this.filtro, this.favoritos)
      .subscribe((pensamentos) => {
        this.listaPensamentos.push(...pensamentos)
        if(!pensamentos.length){
          this.haMaisPensamentos = false
        }
      })
  }

  pesquisarPensamentos(){
    this.haMaisPensamentos = true
    this.service.listar(this.paginaAtual, this.limitPorPagina, this.filtro, this.favoritos)
      .subscribe((listaPensamentos) => {
        this.listaPensamentos = listaPensamentos
      })
  }

  listarFavoritos(){
    this.titulo = 'Meus Favoritos'
    this.favoritos = true
    this.haMaisPensamentos = true
    this.service.listar(this.paginaAtual, this.limitPorPagina, this.filtro, this.favoritos)
      .subscribe((pensamentosFavoritos) => {
        this.listaPensamentos = pensamentosFavoritos
        this.listaFavoritos = pensamentosFavoritos
      })
  }

  recarregarComponente(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }
}

