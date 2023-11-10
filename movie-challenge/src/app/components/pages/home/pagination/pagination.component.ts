import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() {}

  isSelectedPage(pageNumber: number): boolean {
    return pageNumber === this.currentPage;
  }  

  loadPage(page: number) {
    this.pageChanged.emit(page);
  }

  loadPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
    }
  }

  loadNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.pageChanged.emit(page);
  }

}
