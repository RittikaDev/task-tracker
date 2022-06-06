import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';
import { Task } from 'src/app/Tasks';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text!: string;
  day!: string;
  reminder!: boolean;
  showAddTask!: Boolean;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
    // the shoAddTask passed in ui.service.ts is recieved here as value.
  }

  ngOnInit(): void {}
  onSubmit() {
    if (!this.text) {
      alert('Kindly add a task');
      return;
    }
    if (new Date(this.day) > new Date()) {
      this.reminder = true;
    } else {
      this.reminder = false;
    }
    const newTask = {
      text: this.text,
      day: formatDate(this.day, 'MMM d, y, h:mm:ss a', 'en-us'),
      reminder: this.reminder,
    };
    this.onAddTask.emit(newTask);
    this.text = '';
    this.day = '';
    this.reminder = true;
  }
}
