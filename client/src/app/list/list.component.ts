import { Component, OnInit } from '@angular/core';
import { HeroService } from '../common/services/hero.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
  }

}
