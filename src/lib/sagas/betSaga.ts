// import { takeEvery, } from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";
import { AuthApiPost as ApiPost } from "../api/api";
import { cardRefresh, collectAmount, fetchBetFailure, fetchBetSuccess, playCard, winPresentationComplete } from "../reducers/betReducer";

/*function* fetchBetSaga() {
    try{
        yield put(fetchBetStart());
        const postData = {};
        const bets1: any = yield call(fetchBet(postData));
        const bets = yield call(fetchBet);
        yield put(fetchBetSuccess(bets));
    } catch (error: any) {
        yield put(fetchBetFailure(error.message));
    }
}*/


// function* fetchUserSaga(action: FetchUserRequestAction) {
function* fetchBetSaga(action: any): Generator<any> {
  try {
    
    // const bets: any = yield call(fetchUsers); // Call the fetchUsers function
    const bets: any = yield call(ApiPost, action.payload); // Call the fetchUsers function
    // console.log("bets=>", bets, action)
    yield put(fetchBetSuccess(bets));
  } catch (error: any) { // Handle errors
    console.log("err=>", error)
    yield put(fetchBetFailure(error.message));
  }
}
function* hitBackend(action: any): Generator<any>{
  try{
    // console.log("action.payload=>", action.payload)
    const response  = yield call(ApiPost, action.payload);
    // console.log("collectApi=>", action.payload.continueInstructions.action, response);
    if(!action.payload.continueInstructions) {
      yield put(fetchBetSuccess(response));
    }
    else if(action.payload.continueInstructions.action == "newCard") {
      yield put(cardRefresh(response));
    } 
    else if(action.payload.continueInstructions.action == "lessOrEqual") {
      yield put(playCard(response));
    } else if(action.payload.continueInstructions.action == "greaterOrEqual") {
      yield put(playCard(response));
    } else if(action.payload.continueInstructions.action == "collect") {
      yield put(collectAmount(response));
    }else if(action.payload.continueInstructions.action == "win_presentation_complete") {
      yield put(winPresentationComplete(response));
    }
  }
  catch(error: any) {
    yield put(fetchBetFailure(error.message));
  }
} 
export default function* betSaga() {
  // console.log("test----- betSaga")
    yield takeEvery('bets/fetchBetsStart', fetchBetSaga);
    yield takeEvery('bets/newCard', hitBackend);
    yield takeEvery('bets/collectAmount', hitBackend);
    yield takeEvery('bets/win_presentation_complete', hitBackend);
    // yield takeEvery('users/createUserStart', createUserSaga);
  }



