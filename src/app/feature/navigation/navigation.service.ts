import { Location, FolderLocation, FileLocation } from './location';
import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private http: HttpClient) { }

  private currentPath = '';
  private currentItems = new BehaviorSubject<Location[]>([]);

  getCurrentItems(): Observable<Location[]> {
    if (this.currentPath === '') {
      this.navigate();
    }
    return this.currentItems.asObservable();
  }

  navigateTo(item: FolderLocation) {
    this.currentPath = item.path;
    this.navigate();
  }

  isAtRoot() {
    return this.currentPath === '';
  }

  navigateBack() {
    if (!this.isAtRoot()) {
      this.currentPath = this.currentPath.substring(0, this.currentPath.lastIndexOf('/'));
      this.navigate();
    }
  }

  navigateToRoot() {
    this.currentPath = '';
    this.navigate();
  }

  private navigate(path: string = this.currentPath) {
    this.http.get<ItemResponse[]>(baseUrl + path).subscribe((response: ItemResponse[]) => {
     this.currentItems.next(response.map(item => {
        if (item.type === 'dir') {
          return new FolderLocation(item.name, item.path);
        } else {
          return new FileLocation(item.name, item.path);
        }
      }));
    });
  }
}

const baseUrl = 'https://api.github.com/repos/AlexGabor/recipes/contents/';

class ItemResponse {
  name: string;
  path: string;
  type: string;

  constructor(name: string, path: string, type: string) {
    this.name = name;
    this.path = path;
    this.type = type;
  }
}
