class TransactionsController < ApplicationController

  def index
    transactions = User.where(params[:user_id]).transactions
    map = Transaction.transactions_map(transactions)
    render json: { transactions: @transactions, transactions_map: map}
  end

  def create
    transaction = Transaction.create(transaction_params)
    current_user = User.where(params[:user_id])
    transactions = current_user.transactions
    sum = (transaction_params[:price].to_f * transaction_params[:quantity].to_i).round(2)
    ticker = transaction_params[:ticker]
    current_user.stock_withdraw(sum)
    ticker_quantity_sum = Transaction.find_transactions_quantity_sum(@transacts, transact_params[:ticker])
    render json: { transaction: transaction, balance: current_user.balance, ticker_quantity_sum: ticker_quantity_sum, ticker: transaction_params[:ticker]}
  end

  private

  def transaction_params
      params.require(:user_id).permit(:ticker, :price, :quantity)
  end

end

# def purchase
#   @transact = Transact.create(transact_params)
#   @transacts= current_user.transacts
#   sum = (transact_params[:price].to_f * transact_params[:quantity].to_i).round(2)
#   ticker = transact_params[:ticker]
#   current_user.stock_withdraw(sum)
#   ticker_quantity_sum = Transact.find_transactions_quantity_sum(@transacts, transact_params[:ticker])
#   render json: { transaction: TransactSerializer.new(@transact), balance: current_user.balance, ticker_quantity_sum: ticker_quantity_sum, ticker: transact_params[:ticker]}, status: :accepted
# end


