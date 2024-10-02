import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, retry, startWith } from 'rxjs';

export interface Query<TData> {
  data?: TData;
  status: 'loading' | 'error' | 'success';
  error?: string;
}

export function toQuery<TData>(
  observable: Observable<TData>,
  retryCount = 3
): Observable<Query<TData>> {
  const loadingState: Query<TData> = {
    status: 'loading',
  };

  return observable.pipe(
    retry(retryCount),
    map(dataToState),
    catchError(handleError<TData>),
    startWith(loadingState)
  );
}

function dataToState<TData>(data: TData) {
  const successState: Query<TData> = {
    data,
    status: 'success',
  };

  return successState;
}

function handleError<TData>(error: HttpErrorResponse) {
  const errorState: Query<TData> = {
    status: 'error',
    error: error.message,
  };

  return of(errorState);
}
