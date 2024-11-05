import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent {
  @Output() imageUploaded = new EventEmitter<string>();  // Emitir la URL de la imagen subida
  selectedFile: File | null = null;
  imageUrl: String | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
        const uploadData = new FormData();
        uploadData.append('file', this.selectedFile);

        this.http.post<{ imageUrl: string }>('http://localhost:8080/api/noticias/upload', uploadData)
            .subscribe(
                response => {
                    this.imageUploaded.emit(response.imageUrl);  // Emitir la URL de la imagen al componente padre
                    alert('Imagen subida con éxito!');
                },
                error => {
                    console.error('Error al subir la imagen:', error);
                    alert('Error al subir la imagen.');
                }
            );
    } else {
        alert('Por favor, selecciona una imagen antes de subir.');
    }
}
}