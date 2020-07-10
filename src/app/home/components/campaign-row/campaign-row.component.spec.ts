import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignRowComponent } from './campaign-row.component';

describe('CampaignRowComponent', () => {
  let component: CampaignRowComponent;
  let fixture: ComponentFixture<CampaignRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
