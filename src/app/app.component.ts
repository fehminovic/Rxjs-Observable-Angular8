import { Component } from "@angular/core";
import { timer, of, Observable } from "rxjs";
import {
  FormGroup,
  FormControl
} from "@angular/forms";

/* A Simple RxJS timer subscription */
const source = timer(1000, 2000); //declare the RxJS timer.
const subscribe = source.subscribe(val => console.log(val));
setTimeout(() => {
  subscribe.unsubscribe();
}, 10000);

/* Subscribing using Observer */
const myObservable = of("apple", "orange", "grappe"); //RxJS `of` operator used to emit a variable amount of values in a sequence and then emits a complete notification.
const myObserver = {
  next: (x: string) => console.log("Observer got a next value: " + x),
  error: (err: string) => console.error("Observer got an error: " + err),
  complete: () => console.log("Observer got a complete notification")
};

/* Observable with Constructor Example */
function sequenceSubscriber(observer) {
  //function that runs the sequence of string synchronously then unsubscribe after values completed delivered.
  observer.next("Apple");
  observer.next("Orange");
  observer.next("Grappe");
  observer.complete();

  return { unsubscribe() {} };
}

const sequence = new Observable(sequenceSubscriber); //Instantiate Observable that will deliver the above sequence of string.

sequence.subscribe({
  //Execute the observable
  next(num) {
    console.log(num);
  },
  complete() {
    console.log("Finished sequence");
  }
});

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "angular-observable-rxjs";
  inputChangeLog: string[] = [];
  inputForm: FormGroup;
  constructor() {
    myObservable.subscribe(myObserver);
  }

  logInputChange() {
    //function that detects the value changes of FormControl then saves to log array variable.
    const nameControl = this.inputForm.get("name");
    nameControl.valueChanges.forEach((value: string) => {
      this.inputChangeLog.push(value);
      console.log(this.inputChangeLog);
    });
  }

  ngOnInit() {
    //Initialize the FormGroup and call log input changes function inside the NgOnInit function
    this.inputForm = new FormGroup({
      name: new FormControl()
    });
    this.logInputChange();
  }
}
