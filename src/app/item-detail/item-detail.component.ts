import { Component } from '@angular/core';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrl: './item-detail.component.scss'
})
export class ItemDetailComponent {

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}