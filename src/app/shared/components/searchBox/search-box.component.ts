import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private _debouncer: Subject<string> = new Subject<string>();
  private _debouncerSubscription!: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initialTerm: string = '';

  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter();

  ngOnInit(): void {
    this._debouncerSubscription = this._debouncer
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.onDebounce.emit(value);
      });
  }

  // TODO: Obsolete, I implemented the debouncer property
  // emitValue(value: string): void {
  //   this.onValue.emit(value);
  // }

  onKeyPress(searchTerm: string) {
    this._debouncer.next(searchTerm);
  }

  ngOnDestroy(): void {
    this._debouncerSubscription.unsubscribe();
  }
}
