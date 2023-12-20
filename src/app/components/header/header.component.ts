import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title: string | undefined;
  dropdown = false;
  abtdropdown = false;
  membershipdropdown = false;
  projectdropdown = false;

  @ViewChild('productbtn', { read: ElementRef })productbtn!: ElementRef;
  @ViewChild('aboutbtn', { read: ElementRef })aboutbtn!: ElementRef;
  @ViewChild('membershiptbtn', { read: ElementRef })membershipbtn!: ElementRef;
  @ViewChild('projectbtn', { read: ElementRef })projectbtn!: ElementRef;
  

  constructor(
    public router :Router,
    public route :ActivatedRoute,
  ) { }

  ngOnInit() { }

  hideDropdown(event: { clientX: any; clientY: any; }) {
    const xTouch = event.clientX;
    const yTouch = event.clientY;

    const rect = this.productbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top+2;
    const leftBoundary = rect.left+2;
    const rightBoundary = rect.right-2;

    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdown = false;
    }
  }

  abtHideDropdown(event: { clientX: any; clientY: any; }) {
    const xTouch = event.clientX;
    const yTouch = event.clientY;
    
    const rect = this.aboutbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top+2;
    const leftBoundary = rect.left+2;
    const rightBoundary = rect.right-2;

    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.abtdropdown = false;
    }
  }

  mshipHideDropdown(event: { clientX: any; clientY: any; }) {
    const xTouch = event.clientX;
    const yTouch = event.clientY;
    
    const rect = this.membershipbtn.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top+2;
    const leftBoundary = rect.left+2;
    const rightBoundary = rect.right-2;

    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.abtdropdown = false;
    }
  }


  gotoHome(){
    this.router.navigate(['/home'],{replaceUrl:true});  
  }
}
