import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoCardComponent } from '../photo-card/photo-card.component';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-gallery-grid',
  standalone: true,
  imports: [CommonModule, PhotoCardComponent],
  templateUrl: './gallery-grid.component.html',
  styleUrls: ['./gallery-grid.component.css']
})
export class GalleryGridComponent {
  photoService = inject(PhotoService);
  photos = this.photoService.photos;

  onLike(id: string) {
    this.photoService.likePhoto(id);
  }

  onDelete(id: string) {
    this.photoService.deletePhoto(id);
  }
}
