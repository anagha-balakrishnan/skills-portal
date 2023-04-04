import { ReplaySubject } from "rxjs";
import { Iuser } from "src/app/shared/interfaces";

const loggedInUserStream = new ReplaySubject<Iuser | null>(1);
const loggedInUserStream$ = loggedInUserStream.asObservable();
const loggedInUser: Iuser = { eid: '1234', empName: 'User One' };
const updateLoggedInUserStream = (user: Iuser | null) => { loggedInUserStream.next(user) };
export const mockCommonService = {
    loggedInUserStream: loggedInUserStream,
    loggedInUserStream$: loggedInUserStream$,
    getLoggedInUser: () => updateLoggedInUserStream(loggedInUser),
    updateLoggedInUserStream: (user: Iuser | null) => updateLoggedInUserStream(user),
};