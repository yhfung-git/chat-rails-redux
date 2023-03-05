# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require "faker"

puts "Messages destroying..."
Message.destroy_all
puts "Messages destroyed!"

puts "Users destroying..."
User.destroy_all
puts "Users destroyed!"

puts "Channels destroying..."
Channel.destroy_all
puts "Channels destroyed!"

puts "Channels creating..."
channels = Channel.create!([
  { name: "general" },
  { name: "france" },
  { name: "international" },
  { name: "react" },
  { name: "rails" },
  { name: "ruby" },
  { name: "other" }
])
puts "Channels created!"

puts "Users creating..."
users = []
10.times do
  user = User.create!(
    email: Faker::Internet.email,
    password: Faker::Internet.password(min_length: 6, max_length: 10)
  )
  users << user
end
puts "Users created!"

puts "Messages creating..."
100.times do
  Message.create!(
    user_id: users.sample.id,
    channel_id: channels.sample.id,
    content: Faker::Quote.famous_last_words
  )
end
puts "Messages created!"
