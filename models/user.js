const moongoose = require('mongoose');
const userSchema = new moongoose.Schema({
     name: {
          type: String,
          required: true,
     },
     email: {
          type: String,
          required: true,
          unique: true,
     },
     role: {
          type: String,
          required: true,
          enum: ['ADMIN', 'NORMAL'],
          default: 'NORMAL',
     },
     password: {
          type: String,
          required: true,
     },
   },
   {
     timestamps: true,
   }
 
);

const User = moongoose.model('User', userSchema);
module.exports = User