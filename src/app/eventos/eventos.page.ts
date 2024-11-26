import { Component, OnInit } from '@angular/core';
import { ApicrudService } from '../services/apicrud.service';
import { IAsistente } from '../../interfaces/asistentes';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {
  eventos: any[] = []; // Lista de eventos disponibles
  asistente: IAsistente; // Asistente actual

  constructor(private apicrudService: ApicrudService) {
    const asistenteData = sessionStorage.getItem('asistente');
    this.asistente = asistenteData ? JSON.parse(asistenteData) : null;
  }

  ngOnInit() {
    this.cargarEventos();
  }

  cargarEventos() {
    this.apicrudService.getEventos().subscribe((data) => {
      this.eventos = data;
    });
  }

  inscribirse(eventoId: string) {
    if (this.asistente) {
      this.asistente.evento = eventoId; // Asigna el evento al asistente
      this.apicrudService.updateAsistente(this.asistente).subscribe(() => {
        alert('Inscripción exitosa');
      });
    }
  }
}