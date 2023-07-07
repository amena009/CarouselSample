import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CarouselApiService } from './mockData.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockDataService: Partial<CarouselApiService>;
  
  beforeEach(async () => {
    mockDataService = {
      getMockData: () => of([
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
      ])
    };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: CarouselApiService, useValue: mockDataService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'OptimityTest'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('OptimityTest');
  });


  
  it('should fetch carousel blocks from the service', () => {
    expect(component.blocks.length).toBe(4);
  });

  it('should display the correct number of blocks initially', () => {
    const blockElements = fixture.nativeElement.querySelectorAll('.block');
    expect(blockElements.length).toBe(1); // Adjust the expected value based on the pageSize
  });

  it('should navigate to the next set of blocks when clicking the next button', () => {
    component.next();
    fixture.detectChanges();

    const blockElements = fixture.nativeElement.querySelectorAll('.block');
    expect(blockElements.length).toBe(1); // Adjust the expected value based on the pageSize
  });

  it('should navigate to the previous set of blocks when clicking the previous button', () => {
    component.currentIndex = 2;
    component.previous();
    fixture.detectChanges();

    const blockElements = fixture.nativeElement.querySelectorAll('.block');
    expect(blockElements.length).toBe(1); // Adjust the expected value based on the pageSize
  });

  it('should disable the previous button when at the beginning of the carousel', () => {
    component.currentIndex = 0;
    fixture.detectChanges();

    const previousButton = fixture.nativeElement.querySelector('.button');
    expect(previousButton.disabled).toBe(true);
  });

  it('should disable the next button when at the end of the carousel', () => {
    component.currentIndex = 3;
    fixture.detectChanges();
    component.blocks = [
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
    component.currentIndex = 3;
    fixture.detectChanges();
    const nextButton = fixture.nativeElement.querySelector('.button-next');
    expect(nextButton.disabled).toBe(true);
  });
});
