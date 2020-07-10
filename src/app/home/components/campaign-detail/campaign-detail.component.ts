import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit {

  campaignPriceForm: FormGroup;
  imgPath: string = '../../../../';

  @Input() campaign: any;
  @Output() hideModalEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
    private service: LocalStorageService) {
    // this.campaignPriceForm = this.formBuilder.group({
    //   id: [''],
    //   title: ['', Validators.required],
    //   name: ['', Validators.required],
    //   priority: ['', Validators.required],
    //   description: ['', Validators.required],
    //   date: [new Date(), Validators.required],
    // })
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes) {
    if (changes['campaign'] && this.campaign) {
      //this.campaignPriceForm.controls['id'].setValue(this.campaign.id);
    }
  }

  /**
  * Hide Modal
  */
  hideModal() {
    this.hideModalEvent.emit();
  }

}
