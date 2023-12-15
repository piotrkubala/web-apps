import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { ImagesServiceService, ImageDTO } from '../images-service.service';
import { PhotoComponent } from './photo/photo.component';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [PhotoComponent, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './photos.component.html',
  styleUrl: './photos.component.css',
  providers: [ImagesServiceService]
})
export class PhotosComponent {
  imagesService: ImagesServiceService;

  constructor(imagesService: ImagesServiceService) {
    this.imagesService = imagesService;
  }
}
