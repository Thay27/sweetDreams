import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FirebasePath } from 'src/app/core/shared/firebase-path';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class MontagemService {

  constructor(private db: AngularFireDatabase,
              private afAuth: AngularFireAuth
              ) { }

  getOpcoes(montagemNome: string = null) {
    return this.db.list(FirebasePath.ITENS, q => {
      if (montagemNome) {
        return q.orderByChild('montagemNome').equalTo(montagemNome);
      } else {
        return q.orderByChild('nome');
      }
    }).snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.payload.key, ...m.payload.val() }));
      })
    )
  }

getAll(montagemKey: string = null) {
    return this.db.list(FirebasePath.BOLOS, q => {
      if (montagemKey) {
        return q.orderByChild('bolos').equalTo(montagemKey);
      } else {
        return q.orderByChild('nome');
      }
    }).snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.payload.key, ...m.payload.val() }));
      })
    )
  }


  // getItensMontagem(){
  //   const itens = { montagemDecoracao: '', montagemCobertura: '', montagemRecheio: '', montagemPeso: '', montagemMassa: ''};
  //   if (this.afAuth) {
  //   }
  // }

  getCarrinhoItensRef(){
    const path = `${FirebasePath.CARRINHO}${this.afAuth.auth.currentUser.uid}/${FirebasePath.ITENS}`;
    return this.db.list(path);
  }


  insert(itemMontagem: any){
    return this.getCarrinhoItensRef().push(itemMontagem);
  }


  getCategoriasAll(){
    return this.db.list(FirebasePath.MONTAGEM)
    .snapshotChanges().pipe(
      map(changes => {
        return changes.map(m => ({key: m.payload.key, ...m.payload.val() }));
      })
    )
  }

  calcularTotal(preco: number, quantidade: number){
    return preco * quantidade;
  }

  // Buscar Produtos por uma Key
  getByNome(nome: string){
                 // 'produtos/'+'-L5sWLlqdjxFeH6a19Q-'
                 //  path ='produtos/-L5sWLlqdjxFeH6a19Q-'
    const path = `${FirebasePath.ITENS}${nome}`;
    return this.db.object(path).snapshotChanges().pipe(
      map(change => {
        return ({ nome: change.key, ...change.payload.val() });
      })
    )
  }

  // getOpcoes(op:string){
  //   return this.db.list(FirebasePath.MONTAGEM, q => {
  //     if (itensKey) {
  //       return q.orderByChild('montagemKey').equalTo(montagemKey);
  //     } else {
  //       return q.orderByChild('nome');
  //     }
  //   }).snapshotChanges().pipe(
  //     map(changes => {
  //       return changes.map(m => ({key: m.payload.key, ...m.payload.val() }));
  //     })
  //   )
  // }



}