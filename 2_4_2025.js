// Buy/Sell
// Given a list of stock prices (ordered by time), we want to write a function for the max profit you can make from buying the stock at one point in time, and selling it a later point in time.

// In the example below, we'd return a profit of $10 by buying at $1 and selling at $11.

// Function: buy_sell(prices: Number[])
// Input: [3, 5, 1, 7, 8, 10, 11, 2]
// Output: [10, 1, 11]
// Example: buy_sell([3, 5, 1, 7, 8, 10, 11, 2]) == [10, 1, 11]
// Requirements:

// You cannot buy and sell in the same day
// You must buy before you sell (i.e. no shorts)
// You must make exactly 1 trade
// If the prices are decreasing, we'd minimize loss (return the least negative profit)
// Stock prices will always be an array of positive integers, with at least 2 prices
// Space constraints: O(n), n = # of prices

// Run time constraints: None. There is no penalty for greater than O(n) run time. In fact, we prefer arriving more quickly at a solution that's optimized for readability, NOT run time.


const buySell = (pricesArray) => {

    let totalMin = pricesArray[0];
    let buyIdx = 0
    let totalMax = 0;
    let sellIdx;
  
    for (let idx = 0; idx < pricesArray.length; idx++) {
      let price = pricesArray[idx];
  
      if (price < totalMin) {
        if (pricesArray[idx + 1]) {
          let currentSpread = totalMax - totalMin;
          let nextHighPrice = Math.max(pricesArray.slice(idx, pricesArray.length - 1));
  
          if (currentSpread < (nextHighPrice - price)) {
            totalMin = price;
            buyIdx = idx;
            totalMax = pricesArray[idx + 1]
            sellIdx = idx + 1
          } 
          else {
            totalMax = price
            sellIdx = idx;
          }
  
        }
      } else {
        if (price > totalMax) {
          totalMax = price;
          sellIdx = idx;
        }
      }
    }
  
    return [totalMax - totalMin, totalMin, totalMax, buyIdx, sellIdx];
  }
  // Output format: [<profit>, <purchase_price>, <sell_price>]
  
  console.log(buySell([3, 5, 1, 7, 8, 10, 11, 2]))  //== [10, 1, 11] pass
  
  // console.log(buySell([4, 3, 2, 1])) [ -1, 2, 1 ]
  
  // console.log(buySell([1, 2])) // [1,1,2]
  
  // console.log(buySell([3, 14, 1, 11])) // [11,3,14]
  
  
  
  // Double Buy/Sell
  // A new requirement has come in from the trading desk. We now have to write a function that returns two trades that generate the highest profit of the day, so a buy/sell followed by a buy/sell.
  
  // Function: buy_sell_twice(prices: Number[])
  // Input: [3, 5, 1, 7, 8, 10, 11, 2]
  // Output: [[2, 0, 1], [10, 2, 6]]
  // Example: buy_sell_twice([3, 5, 1, 7, 8, 10, 11, 2]) == [[2, 0, 1], [10, 2, 6]]
  // Additional requirements:
  
  // Notice the output is slightly different. We are looking for the indices, instead of the prices,
  // i.e.: [<profit>, <buy_index>, <sell_index>] per trade
  // You must make exactly 2 trades and they cannot overlap
  // Like before, you cannot buy and sell in the same day. You must buy before you sell (i.e. no shorts) for each trade. And if the prices are decreasing, we'd minimize loss (return the least negative profit)
  // Stock prices will always be an array of positive integers, with at least 4 prices
  // Imagine we are putting up a Pull Request for buy_sell and double_buy_sell; consider any code re-use and maintaining tests we've already written for buy_sell (whose inputs and outputs should not change)
  // Space constraints: O(n), n = # of prices
  
  // Run time constraints: None. Like before, we prefer a solution that's optimized for readability, NOT run time.
  
  // prev fx: buySell()
  // return [totalMax - totalMin, totalMin, totalMax];
  // }
  // Output format: [<profit>, <purchase_price>, <sell_price>]
  const buySellTwice = (pricesArray) => {
    let firstTrade;
    let secondTrade;
  
    for (let idx = 0; idx < pricesArray.length; idx++) {
      if (idx == 0 || idx == pricesArray.length -1 ) {
        continue;
      }
  
      let currentFirstTrade = buySell(pricesArray.slice(0, idx))
      let currentSecondTrade = buySell(pricesArray.slice(idx, pricesArray.length - 1))
      console.log({currentFirstTrade})
      console.log({currentSecondTrade})
  
      if (!firstTrade && !secondTrade) {
        firstTrade = currentFirstTrade
        secondTrade = currentSecondTrade
      } else {
        let totalProfit = firstTrade[0] + secondTrade[0];
        let currentProfit = currentFirstTrade[0] + currentSecondTrade[0];
  
        if (currentProfit > totalProfit) {
          firstTrade = [currentFirstTrade[0], currentFirstTrade[3], currentFirstTrade[4]];
          secondTrade = [currentSecondTrade[0], currentSecondTrade[3], currentSecondTrade[4]];
        }
      }
  
    }
  
    return [firstTrade, secondTrade]
  }
  
  // Output: [[2, 0, 1], [10, 2, 6]]
  // i.e.: [<profit>, <buy_index>, <sell_index>] per trade
  
  // Input: [3, 5, 1, 7, 8, 10, 11, 2]
  // Output: [[2, 0, 1], [10, 2, 6]]
  // console.log(buySellTwice([3, 5, 1, 7, 8, 10, 11, 2])) // == [[2, 0, 1], [10, 2, 6]]
  