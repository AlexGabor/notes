import { NavigationService } from './navigation.service';
import { Component, OnInit } from '@angular/core';
import { Location, FolderLocation } from './location';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  items = [];

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.navigationService.getCurrentItems()
      .subscribe(items => this.items = items);
  }

  onItemClick(item: Location) {
    if (item instanceof FolderLocation) {
      this.navigationService.navigateTo(item as FolderLocation);
    }
  }

  onRoot() {
    this.navigationService.navigateToRoot();
  }
}
