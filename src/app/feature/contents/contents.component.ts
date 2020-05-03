import { ContentsService, Section } from './contents.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss']
})
export class ContentsComponent implements OnInit {

  constructor(private contentsService: ContentsService) { }

  contents: Section[];

  ngOnInit() {
    this.contentsService.getContents().subscribe((contents: Section[]) => {
      this.contents = contents;
    });
  }

}
