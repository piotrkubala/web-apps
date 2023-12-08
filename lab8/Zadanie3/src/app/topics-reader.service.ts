import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TopicsReaderService {
  topics: Topic[] = [];

  constructor(http: HttpClient) {
    http.get('assets/topics.json').subscribe((data: any) => {
      this.topics = data;
    });
  }
}

export class Topic {
  name: string;
  shortDescription: string;
  longDescription: string;

  constructor(name: string, shortDescription: string, longDescription: string) {
    this.name = name;
    this.shortDescription = shortDescription;
    this.longDescription = longDescription;
  }
}
