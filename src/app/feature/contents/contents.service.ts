import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { MarkdownService } from 'ngx-markdown';

@Injectable({
  providedIn: 'root'
})
export class ContentsService {

  contents: Section[];
  private contentSubject = new BehaviorSubject<Section[]>(this.contents);

  constructor(private markdownService: MarkdownService) {
    this.markdownService.renderer.heading = (text: string, level: number) => {
      this.contents.push(new Section(text, level));
      return '<h' + level + '>' + text + '</h' + level + '>';
    };
  }

  onDocumentStart() {
    this.contents = [];
    this.contentSubject.next(this.contents);
  }

  onDocumentEnd() {
    this.contentSubject.next(this.contents);
    this.contents = [];
  }

  getContents() {
    return this.contentSubject.asObservable();
  }
}

export class Section {
  text: string;
  level: number;

  constructor(text: string, level: number) {
    this.text = text;
    this.level = level;
  }
}
