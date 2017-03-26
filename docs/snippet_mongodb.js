// Require MongoDB client native driver
var MongoClient = require('mongodb').MongoClient;

// Require native assert module
var assert = require('assert');


// Raw Test: Connect using the MongoClient to a running mongod instance
var url = 'mongodb://localhost:27017';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});


// Raw Test: insertMany
// "result" Contains the result document from MongoDB
// "ops" Contains the documents inserted with added _id fields
// "connection" Contains the connection used to perform the insert
var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('test-collection');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}
// Perform the insertMany() test
var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  // insertMany
  insertDocuments(db, function() {
    db.close();
  });
});


// Raw Test: Find all documents
var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('test-collection');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}
// Perform the findDocuments() test
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  insertDocuments(db, function() {
    findDocuments(db, function() {
      db.close();
    });
  });
});


// Find Documents with a Query Filter
// Add a query filter to find only documents which meet the query criteria.
var findFilterDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('test-collection');
  // Find some documents
  collection.find({'a': 3}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log(`Filter {'a': 3} has found the following records`);
    console.log(docs);
    callback(docs);
  });      
}
// Perform the findFilterDocuments() test
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
  insertDocuments(db, function() {
    findFilterDocuments(db, function() {
      db.close();
    });
  });
});

// Update a document
var updateDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('test-collection');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });  
}
// Perform the updateDocument() test
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  insertDocuments(db, function() {
    updateDocument(db, function() {
      db.close();
    });
  });
});

// Remove a document
var removeDocument = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('test-collection');
  // Delete document where a is 3
  collection.deleteOne({ a : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });    
}
// Perform the removeDocument() test
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  insertDocuments(db, function() {
    updateDocument(db, function() {
      removeDocument(db, function() {
        db.close();
      });
    });
  });
});



// Index a Collection
var indexCollection = function(db, callback) {
  db.collection('documents').createIndex(
    { "a": 1 },
      null,
      function(err, results) {

        console.log(`Added index ${results}`);
        callback();
    }
  );
};
// Perform the indexCollection() test
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  insertDocuments(db, function() {
    indexCollection(db, function() {
      db.close();
    });
  });
});
