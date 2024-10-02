import { HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, retry, startWith } from 'rxjs';

export interface Query<TData> {
  data?: TData;
  status: 'loading' | 'error' | 'success';
  error?: string;
}

export function toQuery<TData>(
  observable: Observable<TData>
): Observable<Query<TData>> {
  return observable.pipe(
    retry(3),
    map(mapToState),
    catchError((error) => handleError<TData>(error)),
    startWith({
      data: undefined,
      status: 'loading',
      error: undefined,
    } as Query<TData>)
  );
}

function mapToState<TData>(data: TData) {
  const successState: Query<TData> = {
    data,
    status: 'success',
    error: undefined,
  };

  return successState;
}

function handleError<TData>(error: HttpErrorResponse) {
  const errorState: Query<TData> = {
    data: undefined,
    status: 'error',
    error: error.message,
  };

  return of(errorState);
}
