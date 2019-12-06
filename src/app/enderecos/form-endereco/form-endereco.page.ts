import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EnderecoService } from '../shared/endereco.service';
import { ToastService } from 'src/app/core/shared/toast.service';

@Component({
  selector: 'app-form-endereco',
  templateUrl: './form-endereco.page.html',
  styleUrls: ['./form-endereco.page.scss'],
})
export class FormEnderecoPage implements OnInit {
  formEndereco: FormGroup;
  key: string;

  constructor(private enderecoService: EnderecoService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private toast: ToastService,
              private afAuth: AngularFireAuth,
              private router: Router){ }

  ngOnInit() {
    this.criarEndereco();
  }

  get rua() { return this.formEndereco.get('rua'); }
  get cep() { return this.formEndereco.get('cep'); }
  get numero() { return this.formEndereco.get('numero'); }
  get bairro() { return this.formEndereco.get('bairro'); }
  get complemento() { return this.formEndereco.get('complemento'); }
  get referencia() { return this.formEndereco.get('referencia'); }



  criarEndereco() {
    this.formEndereco = this.formBuilder.group({
      rua: ['', Validators.required],
      cep: ['', Validators.required],
      numero: ['', Validators.required],
      bairro: ['', Validators.required],
      complemento: [''],
      referencia: ['']

    });
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
        this.router.navigate(['/login'])
      } else {
       this.router.navigate(['/carrinho']);
      }
    })
  }

  voltar(){
    this.router.navigate(['/endereco'])
  }

  onSubmit(){
    if (this.formEndereco.valid){
      let result : Promise<{}>;
      if (this.key){
        result = this.enderecoService.update(this.formEndereco.value, this.key);
      } else {
        result = this.enderecoService.insert(this.formEndereco.value);
      }

      result
        .then( () => {
          this.toast.show('Endereço salvo com sucesso');
          if(!this.key){
            this.criarEndereco();
          }
        })
        .catch( () => {
          this.toast.show('Erro ao salvar o endereço');
        })
    }
  }

}
