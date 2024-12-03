// lib/sagas/counterSaga.ts
import { put, takeEvery } from 'redux-saga/effects';
import { soundPlay } from '../reducers/counterReducer';

function* incrementAsync() {
  // yield call(delay, 1000); // Simulating an async operation
  // yield put(increment());
}

function* decrementAsync() {
  // yield call(delay, 1000);
  // yield put(decrement());
}

function* watchIncrementAsync() {
  yield takeEvery('counter/incrementAsync', incrementAsync);
}

function* watchDecrementAsync() {
  yield takeEvery('counter/decrementAsync', decrementAsync);
}

function* soundAsync(action: any) {
  // yield call(delay, 1000);
  yield put(soundPlay(action.payload));
}

function* watchSoundAsync() {
  yield takeEvery('counter/soundAsync', soundAsync);
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export default function* counterSaga() {
  // yield watchIncrementAsync();
  // yield watchDecrementAsync();
  yield watchSoundAsync();
}
