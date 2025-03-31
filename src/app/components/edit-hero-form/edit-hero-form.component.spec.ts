import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHeroFormComponent } from './edit-hero-form.component';

describe('EditHeroFormComponent', () => {
  let component: EditHeroFormComponent;
  let fixture: ComponentFixture<EditHeroFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHeroFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditHeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
