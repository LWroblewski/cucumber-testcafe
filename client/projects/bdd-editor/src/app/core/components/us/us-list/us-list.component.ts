import {Component, Input, OnInit} from '@angular/core';
import {US} from '../../../../../../../../../shared/model/us-step.model';

@Component({
  selector: 'app-us-list',
  templateUrl: './us-list.component.html',
  styleUrls: ['./us-list.component.scss']
})
export class UsListComponent implements OnInit {

  @Input()
  listUS: US[];

  constructor() {}

  ngOnInit() {}
}
