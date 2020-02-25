import { Component, OnInit } from '@angular/core';
import { HeroService } from '../common/services/hero.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit {
  character: any = {};
  constructor(private heroService: HeroService) { }

  ngOnInit(): void {

  }

}
