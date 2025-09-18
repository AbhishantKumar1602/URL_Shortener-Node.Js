const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema(
     {
          shortId: {
               type: String,
               required: true,
               unique: true,
          },
          redirectionUrl: {
               type: String,
               required: true,
          },
          visitHistory: [{ timestamp: { type: Date, } }],
          createdBy: {
               type: mongoose.Schema.Types.ObjectId,
               ref: 'User',
          },
     },
     {
          timestamps: true,
     }  
);

urlSchema.index({ redirectionUrl: 1, createdBy: 1 }, { unique: true });

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;