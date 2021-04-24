import { useEffect, useState } from "react";
import { Observable } from "rxjs";

/*
a helper hook to observe an Observable
*/

interface ObserverState<ReturnData, ErrorThrown = Error> {
  readonly data?: ReturnData;
  readonly error?: ErrorThrown;
  readonly completed: boolean;
}

function getInitialState<ReturnData, ErrorThrown = Error>(): ObserverState<
  ReturnData,
  ErrorThrown
> {
  return {
    data: undefined,
    error: undefined,
    completed: false,
  };
}

export default function useObservable<ReturnData, ErrorThrown = Error>(
  initialObservable?: () => Observable<ReturnData>
): [
    ObserverState<ReturnData, ErrorThrown>,
    React.Dispatch<React.SetStateAction<Observable<ReturnData>>>
  ] {
  const [observable, setObservable] = useState<
    Observable<ReturnData> | undefined
  >(initialObservable);
  const [state, setState] = useState<ObserverState<ReturnData, ErrorThrown>>(
    getInitialState
  );
  useEffect(() => {
    if (!observable) {
      return;
    }
    const subscription = observable.subscribe({
      next(data) {
        setState((prev) => ({ ...prev, data }));
      },
      error(error: ErrorThrown) {
        setState((prev) => ({ ...prev, error }));
      },
      complete() {
        setState((prev) => ({ ...prev, completed: true }));
      },
    });
    return () => {
      setState(getInitialState());
      subscription.unsubscribe();
    };
  }, [observable]);

  return [
    state,
    setObservable as React.Dispatch<
      React.SetStateAction<Observable<ReturnData>>
    >,
  ];
}
