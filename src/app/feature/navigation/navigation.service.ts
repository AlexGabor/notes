import { map } from 'rxjs/operators';
import { Location, FolderLocation, FileLocation } from './location';
import { Injectable, OnInit } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(private http: HttpClient, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects.startsWith('/path')) {
        this.navigateFromRouter(event.url);
      }
    });
  }

  private currentItems = new BehaviorSubject<Location[]>([]);
  private currentFile = new BehaviorSubject<string>('');

  getCurrentItems(): Observable<Location[]> {
    return this.currentItems.asObservable();
  }

  getCurrentFile() {
    return this.currentFile.asObservable();
  }

  private getList(path: string) {
    this.http.get<ItemResponse[]>(baseUrl + path).subscribe((response: ItemResponse[]) => {
      const list = response.map(item => {
        if (item.type === 'dir') {
          return new FolderLocation(item.name, item.path);
        } else {
          return new FileLocation(item.name, item.path);
        }
      });
      if (path !== '') {
        list.unshift(new FolderLocation('..', path.substring(0, path.lastIndexOf('/'))));
      }
      this.currentItems.next(list);
    });
  }

  private navigateFromRouter(path: string) {
    const paramStart = path.indexOf('?');
    if (paramStart === -1) {
      path = path.substring('/path/'.length);
    } else {
      path = path.substring('/path/'.length, paramStart);
    }

    this.http.get(baseUrl + path).pipe(
      map((response: any) => {
        if (response instanceof Array) {
          return response.map(item => new ItemResponse(item.name, item.path, item.type, item.content));
        } else {
          return new ItemResponse(response.name, response.path, response.type, response.content);
        }
      })
    ).subscribe((response: ItemResponse[] | ItemResponse) => {
      if (response instanceof Array) {
        this.getList(path);
      } else if (response instanceof ItemResponse) {
        this.getList(path.substring(0, path.lastIndexOf('/')));
        this.currentFile.next(atob(response.content));
      }
    }, (error: any) => {
      this.router.navigate(['/not-found']);
    });
  }
}

const baseUrl = 'https://api.github.com/repos/AlexGabor/notes-content/contents/';

class ItemResponse {
  name: string;
  path: string;
  type: string;
  content: string;

  constructor(name: string, path: string, type: string, content: string) {
    this.name = name;
    this.path = path;
    this.type = type;
    this.content = content;
  }
}
