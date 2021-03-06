class UsersController < ApplicationController

  def show
      user = User.find(params[:id])
      shares_map = Transaction.all.shares_map(user.transactions)
      render json: {user: user, transactions: user.transactions, shares_map: shares_map}
  end

  def create
      user = User.create(user_params)
      if user.valid?
          user = user
          token = JWT.encode({user_id: user.id}, secret, 'HS256')
          shares_map = Transaction.all.shares_map(user.transactions)
          render json: {user: user, token: token, transactions: user.transactions, shares_map: shares_map}
      else
          render json: {errors: user.errors.full_messages}
      end
  end

  def update
      user = User.find(params[:id])
      user.update(user_params)
      render json: {user: user, transactions: user.transactions}
  end

  def destroy
      user = User.find(params[:id])
      user.destroy
  end

  private

  def user_params
      params.permit(:name, :email, :password)
  end

end
