import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'campaign-row',
  templateUrl: './campaign-row.component.html',
  styleUrls: ['./campaign-row.component.css']
})
export class CampaignRowComponent implements OnInit, OnChanges {

  @Input() campaign: any;

  @Output() openDialogEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeDateEvent: EventEmitter<any> = new EventEmitter<any>();

  imgPath: string = '../../../../';

  constructor() { }

  ngOnChanges(changes) {
    if (changes && changes['campaign'] && this.campaign) {
      this.campaign.createdOn = new Date(this.campaign.createdOn);
    }
  }

  ngOnInit(): void {
  }

  //Open Dialog
  openDialog($event) {
    this.openDialogEvent.emit($event)
  }

  //To Calculate difference between dates
  calculateDiff(sentOn) {

    let todayDate = new Date();
    let sentOnDate = new Date(sentOn);
    sentOnDate.setDate(sentOnDate.getDate());
    let differenceInTime = todayDate.getTime() - sentOnDate.getTime();
    // To calculate the no. of days between two dates
    let differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    if (differenceInDays >= 0 && differenceInDays < 1) {
      return 'Live';
    }
    else {
      var result = differenceInDays > 0 ? differenceInDays + ' Days Ago' : differenceInDays * -1 + ' Days Ahead';
      return result;
    }
  }

  changeDate($event) {
    this.changeDateEvent.emit($event)
  }

}
