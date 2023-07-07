import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

const mockData = [
    {
      title: 'First Block',
      images: ['../assets/cat1.jpg', '../assets/cat2.jpg', '../assets/cat3.jpg']
    },
    {
      title: 'Second Block',
      images: ['../assets/cat4.jpg', '../assets/cat5.jpg', '../assets/cat6.jpg']
    },
    {
        title: 'Third Block',
        images: ['../assets/cat7.jpg', '../assets/cat8.jpg', '../assets/cat9.jpg']
      },
      {
        title: 'Fourth Block',
        images: ['../assets/cat10.jpg', '../assets/cat2.jpg', '../assets/cat3.jpg']
      }
  ];
  

@Injectable({
  providedIn: 'root'
})
export class CarouselApiService {
  getMockData(): Observable<any> {
    return of(mockData);
  }
}
