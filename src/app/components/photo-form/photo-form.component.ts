import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PhotoService } from '../../services/photo.service';

@Component({
  selector: 'app-photo-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent {
  private fb = inject(FormBuilder);
  private photoService = inject(PhotoService);

  photoForm = this.fb.group({
    url: ['', [Validators.required, Validators.pattern('https?://.+')]],
    title: ['', [Validators.required, Validators.minLength(3)]]
  });

  onSubmit() {
    if (this.photoForm.valid) {
      const { url, title } = this.photoForm.value;
      this.photoService.addPhoto(url!, title!);
      this.photoForm.reset();
    }
  }
}
