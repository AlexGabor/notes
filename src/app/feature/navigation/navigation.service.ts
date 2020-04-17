import { Location, FolderLocation, FileLocation } from './location';
import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private http: HttpClient) { }

  private currentPath = '';
  private currentFilePath = '';
  private currentItems = new BehaviorSubject<Location[]>([]);
  private currentFile = new BehaviorSubject<string>('');

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

  setFile(item: FileLocation) {
    this.currentFilePath = item.path;
    this.getFile();
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

  getCurrentFile() {
    return this.currentFile.asObservable();
  }

  private getFile() {
    this.http.get(baseUrl + this.currentFilePath, { headers: FileHeader, responseType: 'text' })
      .subscribe(response =>
        this.currentFile.next(response as string)
      );
  }
}

const baseUrl = 'https://api.github.com/repos/AlexGabor/recipes/contents/';

const FileHeader = new HttpHeaders({Accept: 'application/vnd.github.raw'});

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
