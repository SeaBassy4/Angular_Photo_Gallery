import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Photo } from '../../models/photo.model';

@Component({
  selector: 'app-photo-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.css']
})
export class PhotoCardComponent {
  @Input({ required: true }) photo!: Photo;
  @Output() like = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onLike() {
    this.like.emit(this.photo.id);
  }

  onDelete() {
    this.delete.emit(this.photo.id);
  }
}
