// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  /* // Post Bet Request
  {
    "seq": 2,
    "sessionUuid": "23d298bd-9264-4147-974f-06f4f19a3438",
    "bets": [
        {
            "betAmount": "200",
            "customData": {
                "suit": "clubs",
                "value": 8
            }
        }
    ],
    "offerId": null,
    "promotionId": null,
    "autoplay": false
}
  */
 /*
 // Lowere or Same 
 {
    "seq": 3,
    "sessionUuid": "23d298bd-9264-4147-974f-06f4f19a3438",
    "roundId": "2116618",
    "continueInstructions": {
        "action": "lessOrEqual"
    }
}
 */
  const res_1: any = {
    "round": {
        "status": "started",
        "jackpotWin": null,
        "roundId": "2116618",
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
                        "value": "8",
                        "suit": "clubs"
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
                            "action": "lessOrEqual",
                            "oddsIn52": "36",
                            "winFactor": 1.41
                        },
                        {
                            "action": "greaterOrEqual",
                            "oddsIn52": "20",
                            "winFactor": 2.54
                        }
                    ],
                    "suit": "clubs",
                    "value": "8"
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
        "balance": "499800",
        "realBalance": null,
        "bonusBalance": null
    },
    "statusData": null,
    "dialog": null,
    "customData": null,
    "serverTime": "2024-10-14T10:03:50Z"
} 
const lowerAndSame_resp_2116618_1: any = {
  "round": {
      "status": "completed",
      "jackpotWin": null,
      "roundId": "2116618",
      "possibleActions": [],
      "events": [
          {
              "et": 2,
              "etn": "end",
              "en": "0",
              "ba": "0",
              "bc": "0",
              "wa": "0",
              "wc": "0",
              "awa": "0",
              "awc": "0",
              "c": {
                  "card": {
                      "value": "11",
                      "suit": "spades"
                  },
                  "chosenChoice": {
                      "action": "lessOrEqual",
                      "oddsIn52": "36",
                      "winFactor": 1.41
                  }
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
      "balance": "499800",
      "realBalance": null,
      "bonusBalance": null
  },
  "statusData": null,
  "dialog": null,
  "customData": null,
  "serverTime": "2024-10-14T10:07:05Z"
}  

/**
 // {"seq":4,"sessionUuid":"23d298bd-9264-4147-974f-06f4f19a3438","bets":[{"betAmount":"200","customData":{"suit":"spades","value":11}}],"offerId":null,"promotionId":null,"autoplay":false}
 */
const res_2: any = {
  "round": {
      "status": "started",
      "jackpotWin": null,
      "roundId": "2204355",
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
                      "value": "11",
                      "suit": "spades"
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
                          "action": "lessOrEqual",
                          "oddsIn52": "48",
                          "winFactor": 1.06
                      },
                      {
                          "action": "greaterOrEqual",
                          "oddsIn52": "8",
                          "winFactor": 6.37
                      }
                  ],
                  "suit": "spades",
                  "value": "11"
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
      "balance": "499600",
      "realBalance": null,
      "bonusBalance": null
  },
  "statusData": null,
  "dialog": null,
  "customData": null,
  "serverTime": "2024-10-14T10:09:20Z"
}
/*
 {"seq":5,"sessionUuid":"23d298bd-9264-4147-974f-06f4f19a3438","roundId":"2204355","continueInstructions":{"action":"lessOrEqual"}}
*/
const lowerAndSame_resp_2204355_1: any =  {
  "round": {
      "status": "started",
      "jackpotWin": null,
      "roundId": "2204355",
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
                      "value": "4",
                      "suit": "clubs"
                  },
                  "chosenChoice": {
                      "action": "lessOrEqual",
                      "oddsIn52": "48",
                      "winFactor": 1.06
                  },
                  "collectableWin": "212",
                  "choices": [
                      {
                          "action": "newCard",
                          "oddsIn52": "52",
                          "winFactor": 1.06
                      },
                      {
                          "action": "colorBlack",
                          "oddsIn52": "26",
                          "winFactor": 2.12
                      },
                      {
                          "action": "colorRed",
                          "oddsIn52": "26",
                          "winFactor": 2.12
                      },
                      {
                          "action": "lessOrEqual",
                          "oddsIn52": "20",
                          "winFactor": 2.76
                      },
                      {
                          "action": "greaterOrEqual",
                          "oddsIn52": "36",
                          "winFactor": 1.53
                      },
                      {
                          "action": "collect",
                          "oddsIn52": "52",
                          "winFactor": 1.06
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
  "serverTime": "2024-10-14T10:12:32Z"
}
/*
{"seq":6,"sessionUuid":"23d298bd-9264-4147-974f-06f4f19a3438","roundId":"2204355","continueInstructions":{"action":"greaterOrEqual"}}
*/
const highAndSame_res_2204355_1: any = {
  "round": {
      "status": "started",
      "jackpotWin": null,
      "roundId": "2204355",
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
                      "value": "5",
                      "suit": "hearts"
                  },
                  "chosenChoice": {
                      "action": "greaterOrEqual",
                      "oddsIn52": "36",
                      "winFactor": 1.53
                  },
                  "collectableWin": "306",
                  "choices": [
                      {
                          "action": "newCard",
                          "oddsIn52": "52",
                          "winFactor": 1.53
                      },
                      {
                          "action": "colorBlack",
                          "oddsIn52": "26",
                          "winFactor": 3.06
                      },
                      {
                          "action": "colorRed",
                          "oddsIn52": "26",
                          "winFactor": 3.06
                      },
                      {
                          "action": "lessOrEqual",
                          "oddsIn52": "24",
                          "winFactor": 3.32
                      },
                      {
                          "action": "greaterOrEqual",
                          "oddsIn52": "32",
                          "winFactor": 2.49
                      },
                      {
                          "action": "collect",
                          "oddsIn52": "52",
                          "winFactor": 1.53
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
  "serverTime": "2024-10-14T10:16:01Z"
}

/*
Collect Amount API
{
    "seq": 7,
    "sessionUuid": "23d298bd-9264-4147-974f-06f4f19a3438",
    "roundId": "2204355",
    "continueInstructions": {
        "action": "collect"
    }
}
*/
const collect_amount_2204355: any =  {
  "round": {
      "status": "wfwpc",
      "jackpotWin": null,
      "roundId": "2204355",
      "possibleActions": [],
      "events": [
          {
              "et": 2,
              "etn": "collect",
              "en": "0",
              "ba": "0",
              "bc": "0",
              "wa": "306",
              "wc": "0",
              "awa": "306",
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
  "serverTime": "2024-10-14T10:18:21Z"
}
/*
Win present complete after collect Auto
{"seq":8,"sessionUuid":"23d298bd-9264-4147-974f-06f4f19a3438","roundId":"2204355","continueInstructions":{"action":"win_presentation_complete"}}
*/
const win_presentation_complete_2204355: any = {
  "round": {
      "status": "completed",
      "jackpotWin": null,
      "roundId": "2204355",
      "possibleActions": [],
      "events": []
  },
  "promotionNoLongerAvailable": false,
  "promotionWin": null,
  "offer": null,
  "freeRoundOffer": null,
  "statusCode": 0,
  "statusMessage": "",
  "accountBalance": {
      "currencyCode": "EUR",
      "balance": "499906",
      "realBalance": null,
      "bonusBalance": null
  },
  "statusData": null,
  "dialog": null,
  "customData": null,
  "serverTime": "2024-10-14T10:18:21Z"
} 
  // res.status(200).json({ name: "John Doe" });
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]; // Your array of numbers
  const cardIndex = getRandomNonZeroIndex(numbers);
  const numbers2 = ["clubs", "diamonds", "hearts", "spades"]; // Your array of numbers
  const card = numbers2[Math.floor(Math.random() * numbers2.length)];
  const newCard_2204355 = {
    "round": {
        "status": "started",
        "jackpotWin": null,
        "roundId": "2204355",
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
                        "winFactor": 0
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
                            "action": "lessOrEqual",
                            "oddsIn52": "40",
                            "winFactor": 1.27
                        },
                        {
                            "action": "greaterOrEqual",
                            "oddsIn52": "16",
                            "winFactor": 3.18
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
    "serverTime": "2024-10-17T05:10:25Z"
}
  console.log("api_hit=>", req.body.continueInstructions);
  const obj:any  = {res_1: res_1, res_2: res_2}; 
  let final_resp = res_1;
  // No Win Response
 /* if(req.body?.continueInstructions && req.body?.continueInstructions?.action == "greaterOrEqual" && req.body?.roundId == 2116618){
    final_resp = lowerAndSame_resp_2116618_1;
  }
  
  else if(req.body?.continueInstructions && req.body?.continueInstructions?.action == "lessOrEqual" && req.body?.roundId == 2204355){
    final_resp = lowerAndSame_resp_2204355_1;
  }
  else if(req.body?.continueInstructions && req.body?.continueInstructions?.action == "greaterOrEqual" && req.body?.roundId == 2204355){
    final_resp = highAndSame_res_2204355_1;
  }
  else if(req.body?.continueInstructions && req.body?.continueInstructions?.action == "collect" && req.body?.roundId == 2204355){
    final_resp = collect_amount_2204355;
  } else if(req.body?.continueInstructions && req.body?.continueInstructions?.action == "win_presentation_complete" && req.body?.roundId == 2204355){
    final_resp = win_presentation_complete_2204355;
  } else if(req.body?.continueInstructions && req.body?.continueInstructions?.action == "newCard" && req.body?.roundId == 2204355){
    final_resp = newCard_2204355;
  } */
  if(req.body?.continueInstructions && req.body?.continueInstructions?.action == "collect" ){
    final_resp = collect_amount_2204355;
  }
  else if(req.body?.continueInstructions && req.body?.continueInstructions?.action == "win_presentation_complete" ){
    final_resp = win_presentation_complete_2204355;
  }
  else if(req.body?.continueInstructions && req.body?.continueInstructions?.action == "greaterOrEqual" ){
    final_resp = highAndSame_res_2204355_1;
  }
  // Complete
//   if(req.body?.continueInstructions && req.body?.continueInstructions?.action == "greaterOrEqual" ){
//     final_resp = lowerAndSame_resp_2116618_1;
//   }
  else {
    const numbers = [1, 2]; // Your array of numbers
    const randomIndex = Math.floor(Math.random() * numbers.length);
    final_resp = obj[`res_${numbers[randomIndex]}`];
    console.log("final_resp=>", final_resp)
  }
  res.status(200).json(final_resp);
}
function getRandomNonZeroIndex(arr: any) {
    const validIndices = arr.length; // Modify this based on your needs
    const rnd  = Math.floor(Math.random() * arr.length);
   
    const n = rnd == 0 ? rnd+1 : rnd;
    console.log("rnd=>", n)
    return n;
  }
  