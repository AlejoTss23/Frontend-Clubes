import { Component, OnInit } from '@angular/core';
import { Noticia } from '../model/Noticia';
import { NoticiaService } from '../service/Noticia.service';


@Component({
  selector: 'app-noticia-crud',
  templateUrl: './noticia-crud.component.html',
  styleUrls: ['./noticia-crud.component.css']
})
export class NoticiaCrudComponent implements OnInit {
  noticias: Noticia[] = [];
  noticiaForm: Noticia = new Noticia();
  editMode = false;

  constructor(private noticiaService: NoticiaService) {}



  ngOnInit(): void {
    this.loadNoticias();
  }

  onImageUploaded(imageUrl: string): void {
    this.noticiaForm.imagenUrl = imageUrl;  // Guardar la URL de la imagen en el formulario
  }

  saveNoticia(): void {
    // Verificar si la URL de la imagen está presente antes de guardar la noticia
    if (!this.noticiaForm.imagenUrl) {
        alert('Por favor, sube una imagen antes de crear la noticia.');
        return;
    }

    console.log("URL de la imagen antes de guardar:", this.noticiaForm.imagenUrl);

    const saveObservable = this.editMode ?
        this.noticiaService.updateNoticia(this.noticiaForm.id!, this.noticiaForm) :
        this.noticiaService.createNoticia(this.noticiaForm);

    saveObservable.subscribe(
        () => {
            this.loadNoticias();  // Recargar la lista de noticias
            this.resetForm();  // Reiniciar el formulario después de guardar
        },
        error => console.error('Error al guardar la noticia:', error)
    );
}

  editNoticia(noticia: Noticia): void {
    this.noticiaForm = { ...noticia };
    this.editMode = true;
  }

  deleteNoticia(id: number): void {
    this.noticiaService.deleteNoticia(id).subscribe(
      () => this.loadNoticias(),
      error => console.error(error)
    );
  }

  resetForm(): void {
    this.noticiaForm = new Noticia();
    this.editMode = false;
  }

  loadNoticias(): void {
    this.noticiaService.getNoticias().subscribe(
      data => this.noticias = data,
      error => console.error(error)
    );
  }
}