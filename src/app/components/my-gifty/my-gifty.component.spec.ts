import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGiftyComponent } from './my-gifty.component';

describe('MyGiftyComponent', () => {
  let component: MyGiftyComponent;
  let fixture: ComponentFixture<MyGiftyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyGiftyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyGiftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
