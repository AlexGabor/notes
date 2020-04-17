import { NavigationService } from './../navigation/navigation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  constructor(private navigationService: NavigationService) { }

  fileContent: string;

  ngOnInit() {
    this.navigationService.getCurrentFile()
      .subscribe(fileContent =>
        this.fileContent = fileContent
      );
  }

}
