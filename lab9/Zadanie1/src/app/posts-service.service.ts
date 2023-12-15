import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsServiceService {
  http: HttpClient;
  posts: PostDTO[] = [];  

  constructor(http: HttpClient) {
    this.http = http;

    this.http.get('https://jsonplaceholder.typicode.com/posts')
      .subscribe((data) => {
        this.posts = data as PostDTO[];
      });
  }

  postPost(post: PostDTO) {
    this.http.post('https://jsonplaceholder.typicode.com/posts', post);
  }
}


export class PostDTO {
  userId: number;
  id: number;
  title: string;
  body: string;

  constructor(userId: number, id: number, title: string, body: string) {
    this.userId = userId;
    this.id = id;
    this.title = title;
    this.body = body;
  }
}
