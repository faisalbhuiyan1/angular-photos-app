import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'photos-angular-app title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('photos-angular-app');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Photos Angular App');
  });

  it('photo title to be displayed post api call', () => {
    const fixture = TestBed.createComponent(AppComponent);
    spyOn(window, 'fetch').and.returnValue(Promise.resolve({json: () => Promise.resolve([{id: 1,title: "title", thumbnailUrl: "" }])}) as any)
    fixture.detectChanges();
    fixture.componentInstance.ngOnInit();
    setTimeout(()=>{
       expect(fixture.nativeElement.querySelector(".grid-item")).toBeTruthy();
       expect(fixture.nativeElement.textContent("title"))
    }, 10000);
  })

  it('photo title should not be displayed when api having error', () => {
    const fixture = TestBed.createComponent(AppComponent);
    spyOn(window, 'fetch').and.returnValue(Promise.reject({message: 'unable to fetch'}) as any)
    fixture.detectChanges();
    fixture.componentInstance.ngOnInit();
    setTimeout(()=>{
       expect(fixture.nativeElement.querySelector(".grid-item")).toBeFalse();
       expect(fixture.nativeElement.not.textContent("title"))
    }, 10000);
  })
});
