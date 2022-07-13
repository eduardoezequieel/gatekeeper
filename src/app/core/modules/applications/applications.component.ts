import { FormControl } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { select, Store } from '@ngrx/store';
import {
  Subject,
  takeUntil,
  take,
  Observable,
  distinctUntilChanged,
} from 'rxjs';
import { Application } from 'src/app/shared/interfaces/applicationResponse';
import { User } from 'src/app/shared/interfaces/loginResponse';
import { UserService } from 'src/app/shared/nav/services/user.service';
import * as applicationsActions from './store/applications.actions';
import { ApplicationsModuleState } from './store/applications.reducer';
import {
  applications,
  filteredApplications,
  filteredApplicationsLength,
  pagination,
} from './store/applications.selectors';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  user!: User;
  applications$!: Observable<Application[]>;
  applicationsLength = 0;
  filteredApplicationsLength = 0;
  pagination!: PageEvent;
  unsubscribe$ = new Subject();
  searchInput = new FormControl('');
  filters = false;
  noResults = false;

  constructor(
    private userService: UserService,
    private store: Store<ApplicationsModuleState>,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.store.dispatch(applicationsActions.getApplications());

    this.store
      .pipe(select(pagination), takeUntil(this.unsubscribe$))
      .subscribe(({ pagination, applicationsLength }) => {
        this.pagination = pagination;
        this.applicationsLength = applicationsLength;
      });

    this.applications$ = this.store.pipe(select(applications));

    this.searchInput.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((response: string) => {
        if (this.searchInput.dirty && response.length < 1) {
          this.clearFilters();
        }
      });
  }

  onPageChange(e: PageEvent): void {
    this.store.dispatch(applicationsActions.updatePagination({ pageEvent: e }));

    if (!this.filters) {
      if (this.applicationsLength < this.pagination.length) {
        this.store.dispatch(applicationsActions.getApplications());
      }
    } else {
      if (this.filteredApplicationsLength < this.pagination.length) {
        this.store.dispatch(applicationsActions.getFilteredApplications());
      }
    }
  }

  search(): void {
    if ((this.searchInput.value as string).length > 0) {
      this.filters = true;

      this.store.dispatch(
        applicationsActions.searchApplications({
          search: this.searchInput.value,
        })
      );

      this.applications$ = this.store.pipe(select(filteredApplications));

      this.store
        .pipe(select(filteredApplicationsLength), takeUntil(this.unsubscribe$))
        .subscribe((response) => (this.filteredApplicationsLength = response));

      this.actions$
        .pipe(
          ofType(applicationsActions.searchApplicationsSuccess),
          takeUntil(this.unsubscribe$)
        )
        .subscribe(() => {
          if (this.filteredApplicationsLength < 1) {
            this.noResults = true;
          } else {
            this.noResults = false;
          }
        });
    }
  }

  clearFilters(): void {
    this.noResults = false;
    this.filters = false;
    this.applications$ = this.store.pipe(select(applications));

    this.searchInput.reset('');

    this.store.dispatch(applicationsActions.clearFilters());
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
