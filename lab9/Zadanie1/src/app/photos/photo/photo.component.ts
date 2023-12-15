import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';

import { ImageDTO, ImagesServiceService } from '../../images-service.service';

@Component({
  selector: 'app-photo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.css',
  providers: [ImagesServiceService]
})
export class PhotoComponent {
  @Input() image: ImageDTO = new ImageDTO(0, 0, '', '#', '#');
  @Input() useThumbnail: boolean = true;

  constructor(private route: ActivatedRoute, private imagesService: ImagesServiceService) {
    this.route.paramMap.subscribe((params: ParamMap) => {
      if (!params.has('id')) {
        return;
      }

      const idString: string = params.get('id') ?? '0';
      const id: number = parseInt(idString);

      this.imagesService.onImagesLoaded.subscribe(() => {
        this.image = this.imagesService.getImage(id) ?? new ImageDTO(0, 0, '', '#', '#');
        this.useThumbnail = false;
      });
    }); 
  }
}
