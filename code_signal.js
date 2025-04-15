const BankingSystemInterface = require('./bankingSystemInterface');

class BankingSystem extends BankingSystemInterface {
  constructor() {
    super();
    this.accounts = {}
    this.pendingTransfers = {} 
    this.transferCount = 0;
  }

  createAccount(timestamp, accountId) {
    if (this.accounts.hasOwnProperty(accountId)) {
      return false;
    }
    
    this.accounts[accountId] = {
      balance: 0,
      transactionTotal: 0
    }
    this._addHistory(accountId,timestamp)
    return true
  }
  
  deposit(timestamp, accountId, amount) {
    if (!this.accounts.hasOwnProperty(accountId)) {
      return null;
    }
    this._expireTransfersIfNeeded(timestamp, accountId)
    this.accounts[accountId].balance += amount;
    this.accounts[accountId].transactionTotal += amount;
    this._addHistory(accountId,timestamp)
    return this.accounts[accountId].balance;
  }
  
  pay(timestamp, accountId, amount) {
    if (!this.accounts.hasOwnProperty(accountId)) {
      return null
    }
    
    this._expireTransfersIfNeeded(timestamp, accountId);
    if (this.accounts[accountId].balance < amount) {
      return null;
    }
    
    this.accounts[accountId].balance -= amount
    this.accounts[accountId].transactionTotal += amount
    this._addHistory(accountId,timestamp)

    return this.accounts[accountId].balance;
  }
  
  topActivity(timestamp,n) {
    for (const accountId in this.accounts) {
      this._expireTransfersIfNeeded(timestamp, accountId)
    }
    
    const accountEntries = Object.entries(this.accounts).map(([accountId, data]) => [accountId, data.transactionTotal])
    
    accountEntries.sort((a,b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }
      
      return a[0].localeCompare(b[0]);
    });
    
    const topN = accountEntries.slice(0,n);
    
    return topN.map(([accountId, total]) => `${accountId}(${total})`)
  }
  
  transfer(timestamp, sourceAccountId, targetAccountId, amount) {
    if (sourceAccountId === targetAccountId) return null;
    if (!this.accounts.hasOwnProperty(sourceAccountId) || !this.accounts.hasOwnProperty(targetAccountId)) {
      return null;
    }
    if (this.accounts[sourceAccountId].balance < amount) return null;
    
    this.accounts[sourceAccountId].balance -= amount;
    
    this.transferCount += 1;
    this._addHistory(sourceAccountId,timestamp)
    
    const transferId = `transfer${this.transferCount}`;
    const expiresAt = timestamp + 24 * 60 * 60 * 1000;
    
    this.pendingTransfers[transferId] = {
      source: sourceAccountId,
      target: targetAccountId,
      amount,
      timestamp,
      expiresAt,
      status: 'pending'
    };
      
    return transferId;
  }
  
  acceptTransfer(timestamp, accountId, transferId) {
    const transfer = this.pendingTransfers[transferId];
    
    if (!transfer || transfer.status !== 'pending') {
      return false;
    }
    
    if (timestamp > transfer.expiresAt) {
      this.accounts[transfer.source].balance += transfer.amount;
      this._addHistory(transfer.source,timestamp)
      
      transfer.status = 'expired';
      return false;
    }
    
    if (transfer.target !== accountId) {
      return false;
    }
    
    this.accounts[accountId].balance += transfer.amount;
    this.accounts[transfer.source].transactionTotal += transfer.amount;    
    this.accounts[transfer.target].transactionTotal += transfer.amount;  
    this._addHistory(accountId,timestamp)  
    transfer.status = 'accepted';
    
    return true
  }
  
  _expireTransfersIfNeeded(currentTimestamp, accountId) {
    for (const [transferId, transfer] of Object.entries(this.pendingTransfers)) {
      if (transfer.status === 'pending' && transfer.source === accountId && currentTimestamp > transfer.expiresAt) {
        this.accounts[transfer.source].balance += transfer.amount;
        transfer.status = 'expired'
      }
    }
  }
  
  mergeAccounts(timestamp, accountId1, accountId2) {
    if (!this.accounts[accountId1] || !this.accounts[accountId2]) return false;
    if (accountId1 === accountId2) return false;
    
    for (const transfer of Object.values(this.pendingTransfers)) {
      if (transfer.status === 'pending' && transfer.source === accountId2) {
        this.accounts[accountId2].balance += transfer.amount;
        this._addHistory(accountId2, timestamp);
        transfer.status = 'expired';
      }
    }
    
    this.accounts[accountId1].balance += this.accounts[accountId2].balance;
    this.accounts[accountId1].transactionTotal += this.accounts[accountId2].transactionTotal;
    this._addHistory(accountId1, timestamp)
    
    delete this.accounts[accountId2];
    
    return true;
  }
  
  _getBalanceAt(accountId, timeAt) {
    const acc= this.accounts[accountId];
    if (!acc || !acc.history.length || acc.history.length === 0) return null;
    let l=0, r=acc.history.length - 1, res = null;
    while (l <= r) {
      const m = Math.floor((l+r)/2);
      if (acc.history[m].timestamp <= timeAt) {
        res = acc.history[m].balance;
        l = m+1;
      } else {
        r = m-1
        }
    }
    
    return res;
  }
  
  _addHistory(accountId, timestamp) {
    const acc =  this.accounts[accountId];
    if (!acc.history) acc.history = [];
    if (acc.history.length && acc.history[acc.history.length - 1].timestamp === timestamp) {
      acc.history[acc.history.length -1].balance = acc.balance;
    } else {
      acc.history.push({ timestamp, balance: acc.balance});
    }
  }
  
  getBalance(timestamp, accountId, timeAt) {
    if (!this.accounts[accountId]) return null;
    
    if (this.accounts[accountId].history[0].timestamp > timeAt) return null
    
    return this._getBalanceAt(accountId,timeAt);
  }
}

module.exports = BankingSystem;
