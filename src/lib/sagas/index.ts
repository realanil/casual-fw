// lib/sagas/index.ts
import { all } from 'redux-saga/effects';

import authSaga from './authSaga';
import betSaga from './betSaga';
import counterSaga from './counterSaga';

export default function* rootSaga() {
  yield all([
    counterSaga(),
    betSaga(),
    authSaga()
    // Add other sagas here
  ]);
}
