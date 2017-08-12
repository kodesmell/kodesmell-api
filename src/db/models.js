import mongoose, { Schema } from 'mongoose'
mongoose.connect('mongodb://localhost/kodesmell')

export const User = mongoose.model('user', {
  email: {
    type: String,
    unique: true
  }
})

export const Code = mongoose.model('code', {
  message: String,
  fileName: String,
  lineNumber: String,
  hash: String,
  code: String,
  line: String,
  preview: String
})