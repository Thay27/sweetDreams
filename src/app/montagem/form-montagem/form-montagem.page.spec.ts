import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormMontagemPage } from './form-montagem.page';

describe('FormMontagemPage', () => {
  let component: FormMontagemPage;
  let fixture: ComponentFixture<FormMontagemPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMontagemPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormMontagemPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
