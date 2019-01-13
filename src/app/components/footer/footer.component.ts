import { Component, OnInit, OnDestroy } from '@angular/core';
import { Filter, FilterButton } from 'src/app/models/filtering.model';
import { TodoService } from 'src/app/services/todo.service';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  filterButtons: FilterButton[] = [
    {type: Filter.All, lable: 'All', isActive: true},
    {type: Filter.Active, lable: 'Active', isActive: false},
    {type: Filter.Completed, lable: 'Completed', isActive: false}
  ];

  length = 0;
  hasCompleted$: Observable<boolean>;
  destroy$: Subject<null> = new Subject<null>();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.hasCompleted$ = this.todoService.todos$.pipe(
      map(todos => todos.some(todo => todo.isCompleted)),
      takeUntil(this.destroy$)
    );

    this.todoService.length$.pipe(takeUntil(this.destroy$))
      .subscribe(length => this.length = length);
  }

  filter(type: Filter) {
    this.setActiveFilterBtn(type);
    this.todoService.filterTodos(type);
  }

  private setActiveFilterBtn(type: Filter) {
    this.filterButtons.forEach(btn => {
      btn.isActive = btn.type === type;
    });
  }

  clearCompleted() {
    this.todoService.clearCompleted();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
