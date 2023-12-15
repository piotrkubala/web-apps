import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesServiceService {
  http: HttpClient;
  images: ImageDTO[] = [];
  idToImage: Map<number, ImageDTO> = new Map<number, ImageDTO>();

  onImagesLoaded: EventEmitter<void> = new EventEmitter<void>();

  constructor(http: HttpClient) {
    this.http = http;

    this.http.get('https://jsonplaceholder.typicode.com/photos')
      .subscribe((data) => {
        this.images = (data as ImageDTO[]).slice(0, 25);

        this.idToImage.clear();

        for (let image of this.images) {
          this.idToImage.set(image.id, image);
        }

        this.onImagesLoaded.emit();
      });
  }

  getImage(id: number): ImageDTO | undefined {
    return this.idToImage.get(id);
  }
}


export class ImageDTO {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;

  constructor(albumId: number, id: number, title: string, url: string, thumbnailUrl: string) {
    this.albumId = albumId;
    this.id = id;
    this.title = title;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl;
  }
}
