class User < ApplicationRecord
  # has_secure_password authenticates passwords with bcrypt
  has_secure_password

  # I want unique email addresses
  validates :email, uniqueness: true

  # regex to require proper email format
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i

  has_many :transactions, dependent: :delete_all

  def stock_withdraw(amount)
    self.balance -= amount
    self.save
  end
end
