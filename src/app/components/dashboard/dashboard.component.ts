import { Component, OnInit, ViewChild } from '@angular/core';
import { ActionsService } from '../../services/actions.service';
import { RouterLink,RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
//import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,RouterOutlet, NgIf,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  sideBar: boolean = false;

  constructor(private action: ActionsService) { }

  ngOnInit(): void {}

  abrirCerrar(){ this.sideBar = !this.sideBar; }

  deleteAnswer(){ this.action.deleteAnswer(); }

  toggleSidebar() {
    this.sideBar = !this.sideBar;
  }
  
  
}
