class Transaction < ApplicationRecord
  belongs_to :user

  def self.shares_map(transactions)
    map = {}
    transactions.each do |t|
      if map[t.ticker]
        map[t.ticker]["quantity"] += t.quantity
      else
        map[t.ticker] = { "quantity" => t.quantity }
      end
    end
    map
  end

  def self.find_ticker_shares(transactions, ticker)
    transactions.where(ticker: ticker).map{ |t| t.quantity }.inject(:+)
  end
end
