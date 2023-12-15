import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostComponent } from './post/post.component';
import { PostsServiceService, PostDTO } from '../posts-service.service';
import { PostCreatorComponent } from './post-creator/post-creator.component';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostComponent, PostCreatorComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css',
  providers: [PostsServiceService]
})
export class PostsComponent {
  postsService: PostsServiceService;

  constructor(postsService: PostsServiceService) {
    this.postsService = postsService;
  }
}
