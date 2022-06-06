import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title = 'Task Tracker';
  showAddTask!: Boolean;
  subscription!: Subscription;

  constructor(private uiService: UiService, private router: Router) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value) => (this.showAddTask = value));
    // the showAddTask passed in ui.service.ts is recieved here as value.
  }

  ngOnInit(): void {}
  toggleAddTask() {
    console.log('Toggle');
    // toggleAddTask() coming from ui.service.ts
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string) {
    return this.router.url == route;
  }
}
