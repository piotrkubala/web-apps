import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PostDTO, PostsServiceService } from '../../posts-service.service';

@Component({
  selector: 'app-post-creator',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-creator.component.html',
  styleUrl: './post-creator.component.css'
})
export class PostCreatorComponent {
  post: PostDTO = new PostDTO(0, 0, '', '');

  constructor(private postService: PostsServiceService) {}

  addPost() {
    if (this.post.title === '' || this.post.body === '') {
      alert('Title and body cannot be empty!');
      return;
    }

    this.postService.addPost(this.post);
  }
}
