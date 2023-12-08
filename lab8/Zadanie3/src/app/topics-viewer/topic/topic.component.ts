import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Input } from '@angular/core';
import { Topic } from '../../topics-reader.service';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent {
  @Input() topic!: Topic;
  @Output() learnMoreChecked: EventEmitter<Topic> = new EventEmitter<Topic>();

  learnMoreClicked() {
    this.learnMoreChecked.emit(this.topic);
  }
}