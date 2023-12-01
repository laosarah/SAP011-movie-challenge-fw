import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-content',
  templateUrl: './top-content.component.html',
  styleUrls: ['./top-content.component.css']
})
export class TopContentComponent {
  @Input() genres: any[] = [];
  @Input() orderBy: any[] = [];
  @Input() moviesByGenre: any[] = [];
  @Output() filterChanged: EventEmitter<{ genreId: string, orderBy: string, keyword: string }> = new EventEmitter<{ genreId: string, orderBy: string,keyword: string }>();

  orderByList: any[] = [
    {
      order: 'popularity.desc',
      text: 'Popularidade Decrescente'
    },
    {
      order: 'popularity.asc',
      text: 'Popularidade Crescente'
    },
    {
      order: 'primary_release_date.desc',
      text: 'Data Lançamento Decrescente'
    },
    {
      order: 'primary_release_date.asc',
      text: 'Data Lançamento Crescente'
    }
  ]

  selectedGenre: string = '0';
  selectedOrder: string = this.orderByList[0].order;
  keyword: string = ''; 

  constructor() {
  }

  optionsChange() {
    this.filterChanged.emit({
      genreId: this.selectedGenre,
      orderBy: this.selectedOrder,
      keyword: this.keyword,
    });
  }
}
