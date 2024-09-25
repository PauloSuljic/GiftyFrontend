import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGiftyPageComponent } from './my-gifty-page.component';

describe('MyGiftyPageComponent', () => {
  let component: MyGiftyPageComponent;
  let fixture: ComponentFixture<MyGiftyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyGiftyPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyGiftyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
