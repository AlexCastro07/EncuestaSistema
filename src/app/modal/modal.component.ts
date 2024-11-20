import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }
  
  closeModal() {
    this.showModal = false;
  }
  
  deleteAnswer() {
    console.log('Pregunta eliminada');
    this.closeModal();
  }
  
}
