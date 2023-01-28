import { throwError, of } from 'rxjs';
import { retryWhen, delay, take, concatMap } from 'rxjs/operators';
export class HttpHelpers {
    static retry() {
        return retryWhen(errors => errors.pipe(delay(700), take(HttpHelpers.retryCount), concatMap((e, r) => {
            if (HttpHelpers.retryableStatuses.indexOf(e.status) !== -1 && (r < HttpHelpers.retryCount - 1)) {
                return of(e);
            }
            return throwError(e);
        })));
    }
}
HttpHelpers.retryCount = 5;
HttpHelpers.retryableStatuses = [0, 500];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1oZWxwZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWp3dC1hdXRoL3NyYy9saWIvaHR0cC1oZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVuRSxNQUFNLE9BQU8sV0FBVztJQUlmLE1BQU0sQ0FBQyxLQUFLO1FBQ2pCLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDcEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUNWLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQzVCLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNqQixJQUFJLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQzlGLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2Q7WUFFRCxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FDSCxDQUFDLENBQUM7SUFDTCxDQUFDOztBQWZjLHNCQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsNkJBQWlCLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJcblxuaW1wb3J0IHsgdGhyb3dFcnJvciwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHJldHJ5V2hlbiwgZGVsYXksIHRha2UsIGNvbmNhdE1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZXhwb3J0IGNsYXNzIEh0dHBIZWxwZXJzIHtcbiAgcHJpdmF0ZSBzdGF0aWMgcmV0cnlDb3VudCA9IDU7XG4gIHByaXZhdGUgc3RhdGljIHJldHJ5YWJsZVN0YXR1c2VzID0gWzAsIDUwMF07XG5cbiAgcHVibGljIHN0YXRpYyByZXRyeSgpOiBhbnkge1xuICAgIHJldHVybiByZXRyeVdoZW4oZXJyb3JzID0+IGVycm9ycy5waXBlKFxuICAgICAgZGVsYXkoNzAwKSxcbiAgICAgIHRha2UoSHR0cEhlbHBlcnMucmV0cnlDb3VudCksXG4gICAgICBjb25jYXRNYXAoKGUsIHIpID0+IHtcbiAgICAgICAgaWYgKEh0dHBIZWxwZXJzLnJldHJ5YWJsZVN0YXR1c2VzLmluZGV4T2YoZS5zdGF0dXMpICE9PSAtMSAmJiAociA8IEh0dHBIZWxwZXJzLnJldHJ5Q291bnQgLSAxKSkge1xuICAgICAgICAgIHJldHVybiBvZihlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aHJvd0Vycm9yKGUpO1xuICAgICAgfSlcbiAgICApKTtcbiAgfVxufVxuIl19