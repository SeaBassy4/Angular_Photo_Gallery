import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { GalleryGridComponent } from './components/gallery-grid/gallery-grid.component';
import { PhotoService } from './services/photo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PhotoFormComponent, GalleryGridComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Interactive Photo Gallery';
  photoService = inject(PhotoService);
  totalLikes = this.photoService.totalLikes;
}
