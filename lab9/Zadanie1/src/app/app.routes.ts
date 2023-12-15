import { Routes } from '@angular/router';

import { PostsComponent } from './posts/posts.component';
import { PhotosComponent } from './photos/photos.component';
import { PhotoComponent } from './photos/photo/photo.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'posts', component: PostsComponent },
    { path: 'photos', component: PhotosComponent },
    { path: 'photos/:id', component: PhotoComponent },
    { path: '**', redirectTo: '' }
];
