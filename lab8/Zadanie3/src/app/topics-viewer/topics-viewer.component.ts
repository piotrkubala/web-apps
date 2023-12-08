import { Component } from '@angular/core';
import { TopicComponent } from './topic/topic.component';
import { CommonModule } from '@angular/common';
import { TopicDetailsComponent } from './topic-details/topic-details.component';
import { TopicsReaderService } from '../topics-reader.service';
import { Topic } from '../topics-reader.service';

@Component({
  selector: 'app-topics-viewer',
  standalone: true,
  imports: [CommonModule, TopicComponent, TopicDetailsComponent],
  templateUrl: './topics-viewer.component.html',
  styleUrl: './topics-viewer.component.css'
})
export class TopicsViewerComponent {
  readerService: TopicsReaderService;
  selectedTopicLongDescription: string = '';

  constructor(topicsReaderService: TopicsReaderService) {
    this.readerService = topicsReaderService;
  }

  learnMoreClicked(topic: Topic) {
    this.selectedTopicLongDescription = topic.longDescription;
  }
}
