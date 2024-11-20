import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray,ReactiveFormsModule } from '@angular/forms';
import { ActionsService } from '../../services/actions.service'; 
import { NgFor,NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

interface Pregunta {
  pregunta: string;
  tipo: number | string; // Ajusta el tipo de 'tipo' según lo que uses
}
@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [NgFor,NgIf,ReactiveFormsModule],
  templateUrl: '../nueva/nueva.component.html',
  styleUrl: '../nueva/nueva.component.scss'
})
export class EditComponent implements OnInit {

  public formAnswers = new FormGroup({
      nameAnswer : new FormControl(null, Validators.required),
      preguntas : new FormArray([])
  });
  public preguntas = this.formAnswers.get('preguntas') as FormArray;
  public validated = false;
  public dateSave = false;
  private item: number = 0;
  private ID: any;


  constructor(private action: ActionsService, private rutaActiva: ActivatedRoute, private ruta: Router) {
      this.ID = rutaActiva.snapshot.params['ID'];
      action.dA.subscribe(a => {
          if (a === 'deleteItem'){ this.delete(); }
      });
  }

  ngOnInit(): void {
      const encuesta = this.action.getEncuestas(this.ID)[0];
      this.formAnswers.setValue({nameAnswer: encuesta.nameAnswer, preguntas: []});
      // Declara el tipo de cada elemento como Pregunta
      encuesta.preguntas.forEach((e: Pregunta) => {
        this.preguntas.push(new FormGroup({
          pregunta: new FormControl(e.pregunta, Validators.required),
          tipo: new FormControl(e.tipo, Validators.required)
        }));
      });
      

  }
  getPregunta(index: number): FormGroup {
    return this.preguntas.at(index) as FormGroup;
  }

newAnswer(){
  this.preguntas.push(new FormGroup({
    pregunta: new FormControl(null, Validators.required),
    tipo: new FormControl(null, Validators.required)
  }));
}

  save(){
      if (this.formAnswers.invalid !== true){
          const res = this.action.updateStorage(this.formAnswers.value, this.ID);
          if (res){
              this.dateSave = true;
              this.formAnswers.reset();
              this.preguntas.clear();
              setTimeout(() => {this.ruta.navigate(['/dashboard/list']); }, 1000);
          }
      }else{
          this.validated = true;
          setTimeout(() => {this.validated = false; }, 5000);
      }
  }

delete(){ this.preguntas.removeAt(this.item); }

itemValue(i: any): void {
  this.item = i;
}

}