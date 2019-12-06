import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastService } from '../core/shared/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html', 

  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, private afAuth: AngularFireAuth, private toast: ToastService,) {}

oferta() {
  this.router.navigate(['/carrinho/novo-item/-Lue21DLyCPcZXyWJRqf'])
}

produtos() {
  this.router.navigate(['/catalogo'])
}

monte() {
  this.router.navigate(['/montagem'])
}

logar() {
  this.afAuth.auth.onAuthStateChanged(user => {
    if (!user) {
      this.router.navigate(['/login'])
    } else {
     this.router.navigate(['/perfil']);
    }
  })

}

comprar() {
  this.afAuth.auth.onAuthStateChanged(user => {
    if (!user) {
      this.toast.show('Por favor, efetue o login para acessar o carrinho');
    } else {
     this.router.navigate(['/carrinho']);
    }
  })

}


}
