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

  hasNavigationDrawer = false;
  hasContentsDrawer = false;
  sideMenuOpened = false;

  ngOnInit() {
    this.breakpoint.observe(['(min-width: 1240px)'])
      .subscribe(result => {
        if (result.matches) {
          this.hasNavigationDrawer = false;
        } else {
          this.hasNavigationDrawer = true;
        }
      });

    this.breakpoint.observe(['(min-width: 960px)'])
      .subscribe(result => {
        if (result.matches) {
          this.hasContentsDrawer = false;
        } else {
          this.hasContentsDrawer = true;
        }
      });
  }

  toggleMenu() {
    this.sideMenuOpened = !this.sideMenuOpened;
  }
}
