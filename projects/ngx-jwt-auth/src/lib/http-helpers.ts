

import { throwError, of } from 'rxjs';
import { retryWhen, delay, take, concatMap } from 'rxjs/operators';

export class HttpHelpers {
  private static retryCount = 5;
  private static retryableStatuses = [0, 500];

  public static retry(): any {
    return retryWhen(errors => errors.pipe(
      delay(700),
      take(HttpHelpers.retryCount),
      concatMap((e, r) => {
        if (HttpHelpers.retryableStatuses.indexOf(e.status) !== -1 && (r < HttpHelpers.retryCount - 1)) {
          return of(e);
        }

        return throwError(e);
      })
    ));
  }
}
