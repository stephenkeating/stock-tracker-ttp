class TransactionsController < ApplicationController

  def shares
    @user = User.find(params[:user_id])
    @transactions = @user.transactions
    @map = Transaction.transactions_map(@transactions)
    render json: { transactions: @transactions, transactions_map: @map}
  end

  def create
    @transaction = Transaction.create(transaction_params)
    @user = User.find(params[:user_id])
    @transactions = @user.transactions
    @sum = (transaction_params[:price].to_f * transaction_params[:quantity].to_i).round(2)
    @ticker = transaction_params[:ticker]
    @user.stock_withdraw(@sum)
    @ticker_shares = Transaction.find_ticker_shares(@transactions, transaction_params[:ticker])
    render json: { transaction: @transaction, balance: @user.balance, ticker_shares: @ticker_shares, ticker: transaction_params[:ticker]}
  end

  private

  def transaction_params
      params.permit(:ticker, :price, :quantity, :user_id)
  end

end

# def purchase
#   @transact = Transact.create(transact_params)
#   @transacts= user.transacts
#   sum = (transact_params[:price].to_f * transact_params[:quantity].to_i).round(2)
#   ticker = transact_params[:ticker]
#   user.stock_withdraw(sum)
#   ticker_shares = Transact.find_ticker_shares(@transacts, transact_params[:ticker])
#   render json: { transaction: TransactSerializer.new(@transact), balance: user.balance, ticker_shares: ticker_shares, ticker: transact_params[:ticker]}, status: :accepted
# end


