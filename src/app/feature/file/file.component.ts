import { ContentsService } from '../contents/contents.service';
import { NavigationService } from './../navigation/navigation.service';
import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  constructor(private navigationService: NavigationService, private contentsService: ContentsService) { }

  fileContent: string;

  ngOnInit() {
    this.navigationService.getCurrentFile()
      .subscribe(fileContent => {
        this.contentsService.onDocumentStart();
        this.fileContent = fileContent;
      });
  }

  onReady() {
      this.contentsService.onDocumentEnd();
  }
}
