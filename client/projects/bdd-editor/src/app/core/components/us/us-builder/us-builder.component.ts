import {Component, Input, OnInit} from '@angular/core';
import {US} from '../../../../../../../../../shared/model/us-step.model';

@Component({
  selector: 'app-us-builder',
  templateUrl: './us-builder.component.html',
  styleUrls: ['./us-builder.component.scss']
})
export class UsBuilderComponent implements OnInit {

  @Input()
  us: US;

  constructor() {}

  ngOnInit() {}
}
