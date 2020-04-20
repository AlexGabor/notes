import { NavigationService } from './feature/navigation/navigation.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private breakpoint: BreakpointObserver, private navigationService: NavigationService) { }

  hasBackdrop = false;
  sideMenuOpened = true;

  ngOnInit() {
    this.breakpoint.observe(['(min-width: 960px)'])
      .subscribe(result => {
        if (result.matches) {
          this.hasBackdrop = false;
        } else {
          this.hasBackdrop = true;
        }
      });
  }

  toggleMenu() {
    this.sideMenuOpened = !this.sideMenuOpened;
  }
}
