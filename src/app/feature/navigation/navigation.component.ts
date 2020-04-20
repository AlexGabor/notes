import { NavigationService } from './navigation.service';
import { Component, OnInit } from '@angular/core';
import { Location, FolderLocation, FileLocation } from './location';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  items = [];

  constructor(private navigationService: NavigationService) { }

  ngOnInit() {
    this.navigationService.getCurrentItems()
      .subscribe(items => this.items = items);
  }

  isDir(item: Location) {
    return item instanceof FolderLocation;
  }
}
