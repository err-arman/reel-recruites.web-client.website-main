import { Subject } from "rxjs";

export const $exitVideoPermission = new Subject<boolean>();

export const $currentlyPlayerVideoSubject = new Subject<string>();
