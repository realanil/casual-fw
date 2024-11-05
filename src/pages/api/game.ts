import { NextApiRequest, NextApiResponse } from 'next';
let store: Record<string, any> = {}; // In-memory store

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = req.body; // Get data from the request
        const action = data?.continueInstructions?.action ? data?.continueInstructions?.action : "";
        // Process the data here
        const bet = data?.bets && data?.bets[0]?.betAmount ? data?.bets[0]?.betAmount : "";
        // res.status(200).json({ message: 'Success', data, bet });
        if(bet) {
            handleBet(req, res);
        } else {
            switch (action) {
                case 'greaterOrEqual':
                    handleGreaterOrEqual(req, res);
                    break;
                case 'lessOrEqual':
                    handleLessOrEqual(req, res);
                    break;
                case 'newCard':
                    handleNewCard(req, res);
                    break;
                case 'collect':
                    handleCollect(req, res);
                    break;
                case 'win_presentation_complete':
                    handleWin_presentation_complete(req, res);
                    break;
                default:
                    handleAuth(req, res);
                    // res.status(400).json({ message: 'Invalid action' });
            }
        }
        
    } else if (req.method === 'GET') {
        const data = req.body; // Get data from the request
        // Process the data here
        res.status(200).json({ message: 'Success', data, req,  });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
const handleWin_presentation_complete = (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body; // Get data from the request
    const roundId =  data.roundId;
    store["roundId"] = roundId; // Store the value
    const collectableWin = store["collectableWin"];
    store["balance"] = store["balance"]+collectableWin;
    const accountBalance = {
        "currencyCode": "EUR",
        "balance": store["balance"],
        "realBalance": null,
        "bonusBalance": null
    }
    const round = {
        "status": "completed",
        "jackpotWin": null,
        "roundId": roundId,
        "possibleActions": [],
        "events": []
    }
    store["collectableWin"] = 0;
    res.status(200).json({ round, accountBalance  });
}

const handleCollect = (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body; // Get data from the request
    const roundId =  data.roundId;
    store["roundId"] = roundId; // Store the value
    const collectableWin = store["collectableWin"];
    const output = {
        "round": {
            "status": "wfwpc",
            "jackpotWin": null,
            "roundId": roundId,
            "possibleActions": [],
            "events": [
                {
                    "et": 2,
                    "etn": "collect",
                    "en": "0",
                    "ba": "0",
                    "bc": "0",
                    "wa": collectableWin,
                    "wc": "0",
                    "awa": collectableWin,
                    "awc": "0",
                    "c": null
                }
            ]
        },
        "promotionNoLongerAvailable": false,
        "promotionWin": null,
        "offer": null,
        "freeRoundOffer": null,
        "statusCode": 0,
        "statusMessage": "",
        "accountBalance": null,
        "statusData": null,
        "dialog": null,
        "customData": null,
        "serverTime": "2024-10-22T11:59:33Z"
    }
    res.status(200).json({...output});
}
const handleLessOrEqual = (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body; // Get data from the request
    const roundId =  data.roundId;
    store["roundId"] = roundId; // Store the value
    // Logic to create something
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // Your array of numbers
    const cardIndex = getRandomNonZeroIndex(numbers);
    const numbers2 = ["clubs", "diamonds", "hearts", "spades"]; // Your array of numbers
    const card = numbers2[Math.floor(Math.random() * numbers2.length)];
    const prevCardValue = store["prevCardValue"];
    const prevCardSuit = store["prevCardSuit"];
    let  chosenChoice, collectableWin;
    let status = "completed";
    const prevLow = store['prevLow'];
    if(prevCardValue >= cardIndex){       
        collectableWin =  prevLow;
        status = "started";
        store["collectableWin"] = collectableWin;
    } else {
        store['prevLow'] = 0;
        store['prevHigh'] = 0;
    }
    const {highWinFactor, lowWinFactor} = winFactorResponse();
    const action = data?.continueInstructions?.action ? data?.continueInstructions?.action : "";
   
    chosenChoice = {
        "action": action,
        "oddsIn52": "28",
        "winFactor":  prevLow
    }
   
    store["prevCardValue"] = cardIndex;
    store["prevCardSuit"] = card;
    const output = {
        "round": {
            "status": status,
            "jackpotWin": null,
            "roundId": roundId,
            "possibleActions": [
                "newCard",
                "colorBlack",
                "colorRed",
                "lessOrEqual",
                "greaterOrEqual",
                "collect"
            ],
            "events": [
                {
                    "et": 2,
                    "etn": "hit",
                    "en": "0",
                    "ba": "0",
                    "bc": "0",
                    "wa": "0",
                    "wc": "0",
                    "awa": "0",
                    "awc": "0",
                    "c": {
                        "card": {
                            "value": `${cardIndex}`,
                            "suit": card
                        },
                        chosenChoice,
                        collectableWin,
                        "choices": [
                            {
                                "action": "newCard",
                                "oddsIn52": "52",
                                "winFactor": 1.81
                            },
                            {
                                "action": "colorBlack",
                                "oddsIn52": "26",
                                "winFactor": 3.64
                            },
                            {
                                "action": "colorRed",
                                "oddsIn52": "26",
                                "winFactor": 3.64
                            },
                            {
                                "action": "lessOrEqual",
                                "oddsIn52": "32",
                                "winFactor": 2.95
                            },
                            {
                                "action": "greaterOrEqual",
                                "oddsIn52": "24",
                                "winFactor": highWinFactor
                            },
                            {
                                "action": "collect",
                                "oddsIn52": "52",
                                "winFactor": lowWinFactor
                            }
                        ]
                    }
                }
            ]
        },
        "promotionNoLongerAvailable": false,
        "promotionWin": null,
        "offer": null,
        "freeRoundOffer": null,
        "statusCode": 0,
        "statusMessage": "",
        "accountBalance": null,
        "statusData": null,
        "dialog": null,
        "customData": null,
        "serverTime": "2024-10-22T11:43:54Z"
    }
    res.status(201).json({ ...output });
};
const handleGreaterOrEqual = (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body; // Get data from the request
    const roundId =  data.roundId;
    store["roundId"] = roundId; // Store the value
    // Logic to create something
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // Your array of numbers
    const cardIndex = getRandomNonZeroIndex(numbers);
    const numbers2 = ["clubs", "diamonds", "hearts", "spades"]; // Your array of numbers
    const card = numbers2[Math.floor(Math.random() * numbers2.length)];
    const prevCardValue = store["prevCardValue"];
    const prevCardSuit = store["prevCardSuit"];
    // res.status(200).json({ prevCardValue, prevCardSuit, cardIndex  });
    let  chosenChoice, collectableWin;
    let status = "completed";
    //!SECTION
    collectableWin = 0;
    store["prevCardValue"] = cardIndex;
    store["prevCardSuit"] = card;
    //!SECTION
    const prevHigh = store['prevHigh'];
    if(prevCardValue <= cardIndex){       
        collectableWin =  prevHigh;
        status = "started";
        store["collectableWin"] = collectableWin;
    } else {
        store['prevLow'] = 0;
        store['prevHigh'] = 0;
    }
    const {highWinFactor, lowWinFactor} = winFactorResponse();
    const action = data?.continueInstructions?.action ? data?.continueInstructions?.action : "";
    chosenChoice = {
        "action": action,
        "oddsIn52": "28",
        "winFactor":  prevHigh
    }
   
   
    
    
    const output = {
        prevCardValue,
        prevCardSuit,
        cardIndex,
        "round": {
            "status": status,
            "jackpotWin": null,
            "roundId": roundId,
            "possibleActions": [
                "newCard",
                "colorBlack",
                "colorRed",
                "lessOrEqual",
                "greaterOrEqual",
                "collect"
            ],
            "events": [
                {
                    "et": 2,
                    "etn": "hit",
                    "en": "0",
                    "ba": "0",
                    "bc": "0",
                    "wa": "0",
                    "wc": "0",
                    "awa": "0",
                    "awc": "0",
                    "c": {
                        "card": {
                            "value": `${cardIndex}`,
                            "suit": card
                        },
                        chosenChoice,
                        collectableWin,
                        "choices": [
                            {
                                "action": "newCard",
                                "oddsIn52": "52",
                                "winFactor": 1.81
                            },
                            {
                                "action": "colorBlack",
                                "oddsIn52": "26",
                                "winFactor": 3.64
                            },
                            {
                                "action": "colorRed",
                                "oddsIn52": "26",
                                "winFactor": 3.64
                            },
                            {
                                "action": "lessOrEqual",
                                "oddsIn52": "32",
                                "winFactor": lowWinFactor
                            },
                            {
                                "action": "greaterOrEqual",
                                "oddsIn52": "24",
                                "winFactor": highWinFactor
                            },
                            {
                                "action": "collect",
                                "oddsIn52": "52",
                                "winFactor": 1.81
                            }
                        ]
                    }
                }
            ]
        },
        "promotionNoLongerAvailable": false,
        "promotionWin": null,
        "offer": null,
        "freeRoundOffer": null,
        "statusCode": 0,
        "statusMessage": "",
        "accountBalance": null,
        "statusData": null,
        "dialog": null,
        "customData": null,
        "serverTime": "2024-10-22T11:43:54Z"
    }
    res.status(201).json({ ...output });
};

const handleNewCard = (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body; // Get data from the request
    const roundId =  data.roundId;
    store["roundId"] = roundId; // Store the value
    // Logic to create something
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // Your array of numbers
    const cardIndex = getRandomNonZeroIndex(numbers);
    const numbers2 = ["clubs", "diamonds", "hearts", "spades"]; // Your array of numbers
    const card = numbers2[Math.floor(Math.random() * numbers2.length)];
    store["prevCardValue"] = cardIndex;
    store["prevCardSuit"] = card;
    const {highWinFactor, lowWinFactor} = winFactorResponse();
   const collectableWin =  store["collectableWin"];
    const output = {
        "round": {
            "status": "started",
            "jackpotWin": null,
            "roundId": roundId,
            "possibleActions": [
                "newCard",
                "colorBlack",
                "colorRed",
                "lessOrEqual",
                "greaterOrEqual"
            ],
            "events": [
                {
                    "et": 2,
                    "etn": "hit",
                    "en": "0",
                    "ba": "0",
                    "bc": "0",
                    "wa": "0",
                    "wc": "0",
                    "awa": "0",
                    "awc": "0",
                    "c": {
                        "card": {
                            "value": `${cardIndex}`,
                            "suit": card
                        },
                        "chosenChoice": {
                            "action": "newCard",
                            "oddsIn52": "52",
                            "winFactor":collectableWin
                        },
                        collectableWin,
                        "choices": [
                            {
                                "action": "newCard",
                                "oddsIn52": "52",
                                "winFactor": 0
                            },
                            {
                                "action": "colorBlack",
                                "oddsIn52": "26",
                                "winFactor": 1.96
                            },
                            {
                                "action": "colorRed",
                                "oddsIn52": "26",
                                "winFactor": 1.96
                            },
                            {
                                "action": "lessOrEqual",
                                "oddsIn52": "28",
                                "winFactor": lowWinFactor
                            },
                            {
                                "action": "greaterOrEqual",
                                "oddsIn52": "28",
                                "winFactor": highWinFactor
                            }
                        ]
                    }
                }
            ]
        },
        "promotionNoLongerAvailable": false,
        "promotionWin": null,
        "offer": null,
        "freeRoundOffer": null,
        "statusCode": 0,
        "statusMessage": "",
        "accountBalance": null,
        "statusData": null,
        "dialog": null,
        "customData": null,
        "serverTime": "2024-10-22T11:35:48Z"
    }
    res.status(201).json({ ...output });
};
const handleBet= (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body; // Get data from the request
    const roundId =  data.roundId;
    let newRoundId = 123456;
    let seq = 2;
    const bets  = data?.bets[0]; 
    const suit = bets?.customData?.suit
    ? bets.customData?.suit : "";
    const value = bets?.customData?.value
    ? bets?.customData?.value : "";
    if(store["roundId"]){
        newRoundId = Number(store["roundId"])+1;
        seq = Number(store["seq"])+1;
    }
    store["roundId"] = newRoundId; // Store the value
    store["seq"] = seq; // Store the value
    store["collectableWin"] = 0;
    const balance = store['balance']-bets.betAmount/100;
    //  res.status(201).json({ message: 'Created successfully', store, balance, p:store['balance'] });
    store['balance'] = balance;
    store["prevCardValue"] = value;
    store["prevCardSuit"] = suit;
    const {highWinFactor, lowWinFactor} = winFactorResponse();
    
    const response = {
        "round": {
            "status": "started",
            "jackpotWin": null,
            "roundId": newRoundId,
            "possibleActions": [
                "newCard",
                "colorBlack",
                "colorRed",
                "greater",
                "equal"
            ],
            "events": [
                {
                    "et": 2,
                    "etn": "start",
                    "en": "0",
                    "ba": "0",
                    "bc": "0",
                    "wa": "0",
                    "wc": "0",
                    "awa": "0",
                    "awc": "0",
                    "c": {
                        "card": {
                            "value": value,
                            "suit": suit
                        },
                        "choices": [
                            {
                                "action": "newCard",
                                "oddsIn52": "52",
                                "winFactor": 0
                            },
                            {
                                "action": "colorBlack",
                                "oddsIn52": "26",
                                "winFactor": 1.96
                            },
                            {
                                "action": "colorRed",
                                "oddsIn52": "26",
                                "winFactor": 1.96
                            },
                            {
                                "action": "greater",
                                "oddsIn52": "48",
                                "winFactor": highWinFactor
                            },
                            {
                                "action": "equal",
                                "oddsIn52": "4",
                                "winFactor": lowWinFactor
                            }
                        ],
                        "suit": suit,
                        "value": value
                    }
                }
            ]
        },
        "promotionNoLongerAvailable": false,
        "promotionWin": null,
        "offer": null,
        "freeRoundOffer": null,
        "statusCode": 0,
        "statusMessage": "",
        "accountBalance": {
            "currencyCode": "EUR",
            "balance": balance,
            "realBalance": null,
            "bonusBalance": null
        },
        "statusData": null,
        "dialog": null,
        "customData": null,
        "serverTime": "2024-10-22T10:41:22Z"
    };
    res.status(201).json({ ...response });
} 
const winFactorResponse = () => {
    let highWinFactor, lowWinFactor = 0;
    if(store["prevCardValue"] >= 10 || store["prevCardValue"] <= 4) {
        const winArr = [10, 10.5, 10.9, 11.5, 11.9, 12];
        const rnd  = Math.floor(Math.random() * winArr.length);
        highWinFactor = winArr[rnd];
        const winArr2 = [1, 1.3, 1.6, 1.9, 2, 2.1, 2.3, 2.9, 3, 3.1, 3.3, 3.7, 3.9, 4, 4.1, 4.3, 4.7, 4.9, 5, 5.1, 5.3, 5.7, 5.9, 6, 6.1, 6.5, 6.9, 7, 7.1, 7.3, 7.9, 8, 8.1, 8.5, 8.9, 9, 9.1, 9.3, 9.9,10];
        lowWinFactor = winArr2[rnd];
    } 
    if(store["prevCardValue"] < 10 || store["prevCardValue"] > 4) {
        const winArr = [10, 10.5, 10.9, 11.5, 11.9, 12];
        const rnd  = Math.floor(Math.random() * winArr.length);
        lowWinFactor = winArr[rnd];
        const winArr2 = [1, 1.3, 1.6, 1.9, 2, 2.1, 2.3, 2.9, 3, 3.1, 3.3, 3.7, 3.9, 4, 4.1, 4.3, 4.7, 4.9, 5, 5.1, 5.3, 5.7, 5.9, 6, 6.1, 6.5, 6.9, 7, 7.1, 7.3, 7.9, 8, 8.1, 8.5, 8.9, 9, 9.1, 9.3, 9.9,10];
        highWinFactor = winArr2[rnd];
    }
    store['prevHigh'] = highWinFactor;
    store['prevLow'] = lowWinFactor;
    return {highWinFactor: highWinFactor?.toFixed(2), lowWinFactor: lowWinFactor?.toFixed(2) };
}
const handleAuth= (req: NextApiRequest, res: NextApiResponse) => {
    const data = req.body; // Get data from the request
    const roundId =  data.roundId;
    let newRoundId = 123456;
    let seq = 1;
    store['balance']= 5000;
    store["seq"] = seq; // Store the value
    const output = {
        "gameId": "1111",
        "partnerId": "0",
        "roundId": "0",
        "roundStatus": null,
        "gameState": null,
        "freeRoundOffer": null,
        "pendingWin": "0",
        "events": null,
        "progressionData": null,
        "playerId": "f9655400-f1e0-4698-aaf2-3b2f9b2c5f74",
        "name": "Demo",
        "languageCode": "en",
        "sessionUuid": "369bde79-344d-4f28-978e-fa4d9ce2457b",
        "jurisdiction": "curacao",
        "cheatsEnabled": false,
        "betLevels": [
            "20",
            "40",
            "60",
            "80",
            "100",
            "120",
            "140",
            "160",
            "180",
            "200",
            "300",
            "400",
            "500",
            "600",
            "700",
            "800",
            "900",
            "1000",
            "1500",
            "2000",
            "2500",
            "3000",
            "3500",
            "4000",
            "4500",
            "5000",
            "7500",
            "10000"
        ],
        "defaultBetLevel": "200",
        "autoPlayAlternatives": [
            "10",
            "25",
            "50",
            "75",
            "100",
            "500",
            "1000"
        ],
        "disableRoundHistory": false,
        "minimumRoundDuration": "0",
        "autoplayLossLimitRequired": false,
        "autoplayWinLimitRequired": false,
        "autoplayDisabled": false,
        "turboDisabled": false,
        "superTurboDisabled": false,
        "slamStopDisabled": false,
        "sessionRescueEnabled": true,
        "keepAliveInterval": "300",
        "rm": "98",
        "autoCollectAfter": "86400",
        "rollbackAfter": "86400",
        "clearOldRoundImmediatelyOnNewRound": false,
        "bonusGames": [],
        "stopAutoplayOnFeatureWin": false,
        "displayRtp": false,
        "displaySessionTimer": false,
        "displayNetPosition": false,
        "disableBetWhenScreensAreOpen": false,
        "spacebarDisabled": false,
        "sessionTimeoutSeconds": "1800",
        "maxFeatureCost": "0",
        "maxFeatureSpinCost": "0",
        "backendGameVersion": "1.0.3",
        "serverVersion": "2.0.170",
        "maxExposure": "0",
        "rememberBetLevel": true,
        "hideGameInfoRtp": false,
        "disableWinHistory": false,
        "displayMaxWinOdds": false,
        "displayMaxWinMultiplier": false,
        "availableTournament": null,
        "availableMission": null,
        "availableMysteryPrize": null,
        "offlinePromotionWins": null,
        "replayLinkDisabled": false,
        "displayGameInfoRtpRange": false,
        "parallelRoundsSupportDisabled": false,
        "hideGameInfoDate": false,
        "displayPayoutTableOnGameLaunch": false,
        "displayPayoutTableAsMultipliers": false,
        "statusCode": 0,
        "statusMessage": "",
        "accountBalance": {
            "currencyCode": "EUR",
            "balance": "500000",
            "realBalance": null,
            "bonusBalance": null
        },
        "statusData": null,
        "dialog": null,
        "customData": null,
        "serverTime": "2024-10-22T05:56:50Z"
    }
    // Logic to create something
    res.status(201).json({  ...output });
};

function getRandomNonZeroIndex(arr: any) {
    const validIndices = arr.length; // Modify this based on your needs
    const rnd  = Math.floor(Math.random() * arr.length);
   
    const n = rnd == 0 ? rnd+1 : rnd;
    return n;
  }
  