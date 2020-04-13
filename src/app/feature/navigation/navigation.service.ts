import { Location, FolderLocation, FileLocation } from './location';
import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  private currentLocation = new BehaviorSubject<Location[]>(ROOT_ITEMS);

  getCurrentItems(): Observable<Location[]> {
    return this.currentLocation;
  }

  navigateTo(item: FolderLocation) {
    this.currentLocation.next(item.items);
  }

  navigateToRoot() {
    this.currentLocation.next(ROOT_ITEMS);
  }
}

export const ROOT_ITEMS: Location[] = [
  new FolderLocation('Android', [
    new FileLocation('Utils'),
    new FileLocation('Resources')
  ]),
  new FolderLocation('Angular', [
    new FileLocation('Resources')
  ])
];

