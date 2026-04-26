import { Injectable, signal, computed } from '@angular/core';
import { Photo } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private readonly STORAGE_KEY = 'photo_gallery_data';
  
  private photosSignal = signal<Photo[]>(this.loadFromStorage());

  readonly photos = this.photosSignal.asReadonly();
  
  readonly totalLikes = computed(() => {
    return this.photosSignal().reduce((sum, photo) => sum + photo.likes, 0);
  });

  constructor() { }

  private loadFromStorage(): Photo[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    // Return some default placeholder images if empty so the gallery looks nice initially
    const initialData: Photo[] = [
      {
        id: crypto.randomUUID(),
        url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2940&auto=format&fit=crop',
        title: 'Mountain Landscape',
        likes: 12
      },
      {
        id: crypto.randomUUID(),
        url: 'https://images.unsplash.com/photo-1682687982501-1e58f814fa3b?q=80&w=2940&auto=format&fit=crop',
        title: 'Desert Dunes',
        likes: 8
      },
      {
        id: crypto.randomUUID(),
        url: 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b?q=80&w=2940&auto=format&fit=crop',
        title: 'Ocean Waves',
        likes: 24
      }
    ];
    this.saveToStorage(initialData);
    return initialData;
  }

  private saveToStorage(photos: Photo[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(photos));
  }

  addPhoto(url: string, title: string): void {
    const newPhoto: Photo = {
      id: crypto.randomUUID(),
      url,
      title,
      likes: 0
    };
    this.photosSignal.update(photos => {
      const updated = [newPhoto, ...photos];
      this.saveToStorage(updated);
      return updated;
    });
  }

  deletePhoto(id: string): void {
    this.photosSignal.update(photos => {
      const updated = photos.filter(p => p.id !== id);
      this.saveToStorage(updated);
      return updated;
    });
  }

  likePhoto(id: string): void {
    this.photosSignal.update(photos => {
      const updated = photos.map(p => 
        p.id === id ? { ...p, likes: p.likes + 1 } : p
      );
      this.saveToStorage(updated);
      return updated;
    });
  }
}
