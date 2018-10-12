import {Component, Input, OnInit} from '@angular/core';
import {Persona} from '../../../../../../../../../shared/model/persona.model';

@Component({
  selector: 'app-personas-list',
  templateUrl: './personas-list.component.html',
  styleUrls: ['./personas-list.component.scss']
})
export class PersonasListComponent implements OnInit {

  @Input()
  personas: Persona[];

  constructor() {}

  ngOnInit() {}
}
