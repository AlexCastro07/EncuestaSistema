import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionsService } from '../../services/actions.service';
import { NgIf,NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [NgIf,NgFor,FormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.scss'
})
export class EncuestaComponent implements OnInit {
  private ID: any;
  public encuesta: any;
  public pregunta: any;
  public contador = 0;
  public respuesta: any; // Permite que 'respuesta' sea un string o null
  public respuestas = Array(0);

  constructor(private rutaActiva: ActivatedRoute, private action: ActionsService, private ruta: Router) {
    this.ID = rutaActiva.snapshot.params['ID'];

  }

  ngOnInit(): void {
    this.encuesta = this.action.getEncuestas(this.ID)[0];
    if (this.encuesta.preguntas.length > 0){
      this.pregunta = this.encuesta.preguntas[this.contador];
      this.contador++;
    }
  }

  save() {
    this.respuestas.push(parseInt(this.respuesta));
    this.next();
  }
  

  next(){
    this.pregunta = this.encuesta.preguntas[this.contador];
    this.contador++;
    this.respuesta = null;
    if (this.contador > this.encuesta.preguntas.length){
      this.action.setRespuesta({ID: this.ID, respuestas: this.respuestas });
      this.ruta.navigate(['']);
    }
}
}