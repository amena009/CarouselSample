import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CarouselApiService } from './mockData.service';

interface CarouselBlock {
  title: string;
  images: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'OptimityTest';

  blocks: CarouselBlock[] = [];
  currentIndex = 0;
  pageSize = 1;
  totalSets: number =0;
indicatorDots: number[]= [];

  constructor(private mockDataService: CarouselApiService) { }

  ngOnInit() {
    this.fetchCarouselBlocks(); // Fetch data from the server
  }

  fetchCarouselBlocks() {
    this.mockDataService.getMockData()
      .subscribe((data: CarouselBlock[]) => {
        this.blocks = data;
        this.totalSets = Math.ceil(this.blocks.length / this.pageSize);
        this.indicatorDots = Array(this.totalSets).fill(0).map((_, index) => index);
      });
  }

  get currentBlocks(): CarouselBlock[] {
    const start = this.currentIndex;
    const end = start + this.pageSize;
    return this.blocks.slice(start, end);
  }

  next() {
    const maxIndex = this.blocks.length - this.pageSize;
    if (this.currentIndex < maxIndex) {
      this.currentIndex += this.pageSize;
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex -= this.pageSize;
    }
  }

  isNextDisabled(): boolean {
    const maxIndex = this.blocks.length - this.pageSize;
    return this.currentIndex >= maxIndex;
  }

  isPreviousDisabled(): boolean {
    return this.currentIndex === 0;
  }
 
}
