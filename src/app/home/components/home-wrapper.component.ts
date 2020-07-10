import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import * as _ from 'lodash';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UUID } from 'angular2-uuid';
import { HttpClient } from "@angular/common/http";
import enti from '../../en.json';


@Component({
  selector: 'app-home-wrapper',
  templateUrl: './home-wrapper.component.html',
  styleUrls: ['./home-wrapper.component.css']
})
export class HomeWrapperComponent implements OnInit {

  allData: any = {
    upcomingCampaignsArray: [],
    liveCampaignsArray: [],
    pastCampaignsArray: []
  }
  selectedCampaign: any;
  bsModalRef: BsModalRef;
  uuidValue: string;

  imgPath: string = '../../../';

  todayDate = new Date();

  public modalconfig = {
    ignoreBackdropClick: true,
    class: 'gray modal-sm',
    animation: true
  }

  constructor(private localStorageService: LocalStorageService,
    private modalService: BsModalService, private httpClient: HttpClient) {
  }

  ngOnInit(): void {
    this.populateData();
  }

  populateData() {
    if (!localStorage.getItem('allData')) {
      // enti.UpcomingCampaign.data.forEach((x) => {
      //   x.createdOn = new Date(x.createdOn);
      // });
      this.allData = enti.data;
      this.localStorageService.setItem('allData', this.allData);
    }
    this.allData = this.localStorageService.getItem('allData');
  }

  /**
  * Update New Date
  */
  changeDate(event, fromArrayName, campaign, index) {
    debugger
    if (campaign.createdOn != event) {
      campaign.createdOn = event;
      var result = this.calculateDiff(event);
      var toArrayName = '';
      if (result.includes('Ahead')) {
        toArrayName = 'upcomingCampaignsArray';
      }
      else if (result.includes('Ago')) {
        toArrayName = 'pastCampaignsArray';
      }
      else {
        toArrayName = 'liveCampaignsArray'
      }
      this.allData[fromArrayName].splice(index, 1);
      this.allData[toArrayName].push(campaign);
      this.localStorageService.setItem('allData', this.allData);
      this.localStorageService.getItem('allData');
    }
  }

  /**
  * Sort Data
  */
  sortFunc(a, b) {
    return a.date - b.date
  }

  /**
  * Clear All Data
  */
  clearData() {
    this.allData.upcomingCampaignsArray = [];
    this.allData.liveCampaignsArray = [];
    this.allData.pastCampaignsArray = [];
    this.localStorageService.clearLocalStorage();
  }

  /**
  * Add New Task
  */
  addNewTask(task) {
    if (task.id) {
      const taskIndex = this.allData.upcomingCampaignsArray.findIndex((x) => x.id == task.id);
      this.allData.upcomingCampaignsArray[taskIndex] = task;
    }
    else {
      task.id = this.generateUUID();
      this.allData.upcomingCampaignsArray.push(task);
    }
    this.localStorageService.setItem('allData', this.allData);
    this.hideModal();
    this.localStorageService.getItem('allData');
  }

  /**
   * Delete Task
   */
  deleteTask(index, key) {
    this.allData[key].splice(index, 1);
    this.localStorageService.setItem('allData', this.allData);
    this.localStorageService.getItem('allData');
  }

  /**
   * Move Task
   */
  moveTask(index, task, fromArrayName, toArrayName) {
    this.allData[fromArrayName].splice(index, 1);
    this.allData[toArrayName].push(task);
    this.localStorageService.setItem('allData', this.allData);
    this.localStorageService.getItem('allData');
  }

  /**
   * Generate Unique ID
   */
  generateUUID() {
    this.uuidValue = UUID.UUID();
    return this.uuidValue;
  }

  /**
   * Edit Task modal
   * @param template 
   */
  editTask(task, template) {
    this.bsModalRef = this.modalService.show(template, this.modalconfig);
    this.selectedCampaign = task;
  }

  /**
   * Create Task modal
   * @param template 
   */
  openDialog(e, campaign, template) {
    this.selectedCampaign = campaign;
    this.openModal(template);
    e.preventDefault();
  }

  /**
   * open the modal
   * @param template 
   */
  openModal(template) {
    this.bsModalRef = this.modalService.show(template, this.modalconfig);
  }

  /**
 * close the modal
 */
  hideModal() {
    this.bsModalRef.hide();
  }

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
}
