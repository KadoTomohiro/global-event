import {Component, EventEmitter} from '@angular/core';
import {Observable} from "rxjs";
import {error} from "util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:keypress)': 'onDocumentKeyPress($event)'
  }
})
export class AppComponent {
  title = 'app works!';
  codes = [];
  onKeyPress = new EventEmitter<KeyboardEvent>();

  constructor() {
    const ENTER_CODE = 13;
    const ENTER = {};
    let keypress = Observable.fromEvent(document, 'keypress');


    this.onKeyPress
      .filter((e: KeyboardEvent) => e.charCode !== null || e.keyCode === ENTER_CODE)
      .map((e: KeyboardEvent) => {
        return String.fromCharCode(e.charCode);
      })
      .buffer(this.onKeyPress.debounceTime(100))
      .filter((chars: string[]) => chars[chars.length - 1] === String.fromCharCode(ENTER_CODE))
      .map((chars: string[]) => {
        return chars.slice(0, -1).join('');
      })
      .subscribe(
        (text: string) => {
          this.codes.push(text);
        },
        (error) => {
          console.log(error)
        }
      );

  }

  onDocumentKeyPress(ev: KeyboardEvent) {
    console.log(ev.timeStamp);
    this.onKeyPress.emit(ev);
  }
}
