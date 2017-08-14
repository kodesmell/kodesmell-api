import mongoose, { Schema } from 'mongoose'
mongoose.connect('mongodb://localhost/kodesmell')

export const User = mongoose.model('user', {
  email: {
    type: String,
    unique: true
  },
  displayName: String
})

export const Project = mongoose.model('project', {
  name: String
})

export const Kode = mongoose.model('kode', {
  message: String,
  fileName: String,
  lineNumber: String,
  hash: String,
  code: String,
  line: String,
  preview: String,
  project: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }
})