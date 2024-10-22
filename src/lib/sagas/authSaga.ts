import { call, put, takeEvery } from "redux-saga/effects";
import { AuthApiPost } from "../api/api";
import { authFailure, authSuccess } from "../reducers/authReducer";



function* fetchAuthenticate(action: any): Generator<any>{
  try{
    const response  = yield call(AuthApiPost, action.payload);
    yield put(authSuccess(response));
  }
  catch(error: any) {
    console.log("AuthApiPost error=>", error);
    yield put(authFailure(error.message));
  }
} 
export default function* authSaga() {
    yield takeEvery('auth/authenticate', fetchAuthenticate);
  }

