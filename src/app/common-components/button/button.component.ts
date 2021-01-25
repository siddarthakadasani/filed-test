import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Output() postClick = new EventEmitter();
  @Input() title: string;
  @Input() isBtnDisabled: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onClick() {
    this.postClick.emit();
  }

}
