import { Component, OnInit } from '@angular/core';
import { Noticia } from '../model/Noticia';
import { NoticiaService } from '../service/Noticia.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent implements OnInit {
  noticias: Noticia[] = [];

  constructor(private noticiaService: NoticiaService, private router: Router) {}

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToNoticias() {
    this.router.navigate(['/noticias']);
  }


  ngOnInit(): void {
    this.loadNoticias();
  }

  loadNoticias(): void {
    this.noticiaService.getNoticias().subscribe(
      data => {
        this.noticias = data;
        console.log('Noticias cargadas:', this.noticias);  // Verifica que imagenUrl esté correctamente formada
      },
      error => console.error(error)
    );
  }
}
