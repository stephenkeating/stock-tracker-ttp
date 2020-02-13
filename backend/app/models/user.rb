class User < ApplicationRecord
  # has_secure_password authenticates passwords with bcrypt
  has_secure_password

  # I want unique usernames but could double up on emails in current setup
  validates :username, uniqueness: true
end
