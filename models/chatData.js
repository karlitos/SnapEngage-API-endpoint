var mongoose = require('mongoose');
require('mongoose-type-url');
require('mongoose-type-email');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function (ref) {
    console.log('Connected to mongo server.');
    //trying to get collection names
    db.db.collectionNames(function (err, names) {
        console.log('Collections', names); // [{ name: 'dbname.myCollection' }]
    });
});


var Schema = mongoose.Schema;

var ChatDataSchema = new Schema({
  id: String, // Internal id created by SnapEngage and can be used to reference the specific support request
  widget_id: String, // String id of the widget in which the chat took
  url: mongoose.SchemaTypes.Url, // URL pointing to the details of the support request
  type: { // Will either be ‘chat’ or ‘offline’, depending on the nature of the service request
    type: String,
    enum: ['chat', 'offline']
  },
  requested_by: mongoose.SchemaTypes.Email, // Email of the person who requested the chat
  description: String, // The entered description for the support request
  created_at_date: Date, //	Date the support request was created in “MMM d, yyyy h:mm:ss a” format (ie, Oct 3, 2014 2:14:31 PM). Given in GMT.
  ip_address:	String, // IP address of the person initiating the support request
  user_agent:	String, //  Details about the initiating person’s user agent
  browser: String, //	Specific browser and version information from the support request initiator
  os:	String, // Specific operating system information from the support request initiator
  country_code:	String, // Two digit country code for the support request initiator
  country: String, //	Country for the support request initiator
  latitude:	Number, // Latitude, is decimal degrees, for the support request initiator
  longitude: Number, //	Longitude, is decimal degrees, for the support request initiator
  language_code: String, //	Language codes from the support request initiators browser settings
  transcripts: [{ // An array of transcript objects which are described as;
    id:	String, // Id of the person who created the message. In the case of the visitor, this will be blank
    date:	Date, // Date the message was created in “MMM d, yyyy h:mm:ss a” format (ie, Oct 3, 2014 2:14:31 PM)
    alias: String, //	Alias of the person who created the message
    message: String //	Contents of the message
  }]
}, {collection: 'ChatData'});

module.exports = mongoose.model('chatData', ChatDataSchema);