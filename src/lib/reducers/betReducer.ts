// lib/reducers/betReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Define a type for the slice state
interface Data {
    accountBalance : {
        currencyCode: string,
        balance: string,
        realBalance: string | null,
        bonusBalance: string | null
    },
    round: {
        events: any;
        possibleActions: any,
        roundId: string,
        status: string, //started
    }

}
interface collectInterface{
    round: {
        events: any;
        possibleActions: any,
        roundId: string,
        status: string, //started
    }
};

interface CounterState {
  data: Data;
  responseCard: Data;
  history: [Data]
  betValue: number;
  collect: collectInterface;
  error: string | null;
}
// Define the initial state using that type
const initialState: CounterState = {
    data: {
        accountBalance : {
            currencyCode: "EUR",
            balance: "50000",
            realBalance: null,
            bonusBalance: null
        },
        round: {
            events: [],
            possibleActions: ['newCard', 'colorBlack', 'colorRed', 'lessOrEqual', 'greaterOrEqual'],
            roundId: "",
            status: "", //started
        }
    },
    responseCard: {
        accountBalance : {
            currencyCode: "EUR",
            balance: "50000",
            realBalance: null,
            bonusBalance: null
        },
        round: {
            events: [],
            possibleActions: ['newCard', 'colorBlack', 'colorRed', 'lessOrEqual', 'greaterOrEqual'],
            roundId: "",
            status: "", //started
        }
    },
    history: [
        {
            accountBalance : {
                currencyCode: "EUR",
                balance: "50000",
                realBalance: null,
                bonusBalance: null
            },
            round: {
                events: [],
                possibleActions: ['newCard', 'colorBlack', 'colorRed', 'lessOrEqual', 'greaterOrEqual'],
                roundId: "",
                status: "", //started
            }
        }
    ],
    collect:{        
            "round": {
                "status": "wfwpc",
                "roundId": "26265130",
                "possibleActions": [],
                "events": [
                    {
                        "et": 2,
                        "etn": "collect",
                        "en": "0",
                        "ba": "0",
                        "bc": "0",
                        "wa": "0",
                        "wc": "0",
                        "awa": "0",
                        "awc": "0",
                        "c": null
                    }
                ]
            }           
        },
    betValue: 200,
    error: null,
  };


const betSlice = createSlice({
    name: "bet",
    initialState,
    reducers :{
        fetchBetStart(state) {
            // console.log("pppppppp=>", state)
            state.error = null;
        },
        fetchBetSuccess(state, action: PayloadAction<any>) {
            state.responseCard = action.payload;
            // state.data.push(action.payload);
            state.data = action.payload;
            state.history.splice(0, state.history.length);// Output: []
            // Clear the array
            // while (state.history.length > 0) {
            //     state.history.pop();
            // }
            state.history.push(action.payload);
            // console.log("pppppppp ag=>", state.data, action.payload)
        },
        cardRefresh(state, action: PayloadAction<any>) {
            //  console.log("pppppppp=>", state, action)
            state.responseCard = action.payload;
            state.history.push(action.payload);
            state.error = null;
        },
        playCard(state, action: PayloadAction<any>) {
            //  console.log("pppppppp=>", state, action)
            state.responseCard = action.payload;
            state.history.push(action.payload);
            state.error = null;
        },
        collectAmount(state, action: PayloadAction<any>) {
            state.collect = action.payload;
            state.error = null;
        },
        winPresentationComplete(state, action: PayloadAction<any>) {
            state.data = action.payload;
            state.error = null;
        },
        betUpdate(state, action: PayloadAction<any>) {
            state.betValue = action.payload.bet;
            state.error = null;
        },
        fetchBetFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        }
    }
});
export const { fetchBetStart, fetchBetSuccess, fetchBetFailure, playCard, collectAmount, winPresentationComplete, cardRefresh, betUpdate} = betSlice.actions;
export default betSlice.reducer;