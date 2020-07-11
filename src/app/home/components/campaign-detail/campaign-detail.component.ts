import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Urls } from '../../../../environments/environment';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'campaign-detail',
  templateUrl: './campaign-detail.component.html',
  styleUrls: ['./campaign-detail.component.css']
})
export class CampaignDetailComponent implements OnInit {

  campaignPriceForm: FormGroup;
  imgPath: string = Urls.wrapperChild_img_path;

  @Input() campaign: any;
  @Output() hideModalEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder,
    private service: LocalStorageService) {
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
