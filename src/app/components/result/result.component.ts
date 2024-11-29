import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { ActionsService } from '../../services/actions.service'; 
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import {Chart, registerables} from 'chart.js';


Chart.register(...registerables);
@Component({
  selector: 'app-result',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit, AfterViewInit {

  @ViewChildren('myChart') ctx!: QueryList<ElementRef>;


  public preguntas: any;
  public respuestas: any = Array(0);
  private ID: string;
  public contador: any[] = [];
  public totalRespuesta: any;

  myChart: any;

  constructor(private action: ActionsService, private ruta: ActivatedRoute) {
    this.ID = ruta.snapshot.params['ID'];
    this.preguntas = action.getEncuestas(this.ID)[0];
    this.respuestas = action.getRespuestas(this.ID);
  }

  tipoRes(tipo: string): Array<string> {
    if (tipo === '0') {
      return ['No', 'Si'];
    }
    if (tipo === '1') {
      return ['1', '2', '3', '4', '5'];
    }
    if (tipo === '2') {
      return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    }
    return [];  // Retorno por defecto si no se cumple ninguna condición
  }
  

  resultados(tipo: string, numPre: number): number[] {
    let res: any[] = [];  // Inicializar 'res' con un array vacío
  
    if (tipo === '0') {res = [0, 0];} 
    if (tipo === '1') {res = [0, 0, 0, 0, 0];} 
    if (tipo === '2') {res = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];}
  
    this.respuestas.forEach((element: any )=> res[element.respuestas[numPre]]++);
    return res;
  }

  ngAfterViewInit() {
    this.ctx.forEach((e:any, i:any) => {
      this.myChart = new Chart(e.nativeElement.getContext('2d'), {
        type: 'bar',
        data: {
          labels: this.tipoRes(this.preguntas.preguntas[i].tipo),
          datasets: [{
            label: this.preguntas.preguntas[i].pregunta,
            data: this.resultados(this.preguntas.preguntas[i].tipo, i),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: false,  // Cambié 'false' a 'true' por razones de responsividad
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                  stepSize: 1 // Ajusta los intervalos en el eje Y
              }
          }
        }
      }
      });

    });
  }

  // Método para obtener las respuestas abiertas (tipo '3')
/*getRespuestasAbiertas(preguntaIndex: number): string[] {

  const respuestasAbiertas: string[] = [];

  // Itera sobre las respuestas y guarda las respuestas abiertas correspondientes al índice de la pregunta
  this.respuestas.forEach((respuesta: any) => {
    if (respuesta.tipo === '3' && respuesta.preguntaIndex === preguntaIndex) {
      respuestasAbiertas.push(respuesta.respuesta);
    }
  });
  console.log(respuestasAbiertas);

  return respuestasAbiertas;
}
*/
  
  ngOnInit(): void {
  }

}

