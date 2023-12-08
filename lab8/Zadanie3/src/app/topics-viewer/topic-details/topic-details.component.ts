import { Component, Input } from '@angular/core';
import { Topic } from '../../topics-reader.service';

@Component({
  selector: 'app-topic-details',
  standalone: true,
  imports: [],
  templateUrl: './topic-details.component.html',
  styleUrl: './topic-details.component.css'
})
export class TopicDetailsComponent {
  @Input() topicLongDescription: string = '';
}
