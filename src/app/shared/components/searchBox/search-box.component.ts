import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit {
  private debouncer: Subject<string> = new Subject<string>();

  @Input()
  public placeholder: string = '';

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(500)).subscribe((value) => {
      this.onDebounce.emit(value);
    });
  }

  // TODO: Obsolete, I implemented the debouncer property
  // emitValue(value: string): void {
  //   this.onValue.emit(value);
  // }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
