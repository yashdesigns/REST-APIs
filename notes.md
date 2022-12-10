Mongoose
-------------
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. 
It manages relationships between data, provides schema validation, and is used to translate 
between objects in code and the representation of those objects in MongoDB.



Passport
--------

Passport is used as middleware within a web application to authenticate requests
passport.authenticate() is middleware which will authenticate the request.

By default, when authentication succeeds, the req.user property is set to the authenticated user,
a login session is established, and the next function in the stack is called. 

Strategies are responsible for authenticating requests, which they accomplish by implementing an authentication mechanism. Authentication mechanisms define how to encode a credential, such as a password or an assertion from an identity provider (IdP), in a request. They also specify the procedure necessary to verify that credential. If the credential is successfully verified, the request is authenticated.

Passport-jwt
-------------
This module lets you authenticate endpoints using a JSON web token. 
It is intended to be used to secure RESTful endpoints without sessions.

passport.authenticate('jwt', { session: false })
we pass {session: false} in passport options, so that it wont save the user in the session.
You set { session: false } because you do not want to store the user details in a session. 
You expect the user to send the token on each request to the secure routes.

This is especially useful for APIs, 
but it is not a recommended approach for web applications for performance reasons.

jwt_payload is an object literal containing the decoded JWT payload.
done is a passport error first callback accepting arguments done(error, user, info)

Here it reads the JWT from the http Authorization header with the scheme 'bearer':

Bcryptjs
-------
A hacker can not easily decipher an adequately hashed password. Hackers will get frustrated because it will take lots of time and effort to decrypt the password.
we will learn how to install and correctly hash a password in node.js.
Hashing a password
"Hashing" a password refers to taking a plain text password and putting it through a hash algorithm. The hash algorithm takes in a string of any size and outputs a fixed-length string. No matter the size of the original string (i.e., the plain text password), the output (the hash) is always the same length. Since the same process is always applied, the same input always yields the same output.

Because hash algorithms always produce the same result for a specific password, they are predictable. If you only hash the password, a hacker can figure out the original password. Hashing is not enough.

Salting a password
A salt is a random string. By hashing a plain text password plus a salt, the hash algorithm’s output is no longer predictable. The same password will no longer yield the same hash. The salt gets automatically included with the hash, so you do not need to store it in a database.

we set the saltRounds value. The higher the saltRounds value, the more time the hashing algorithm takes. You want to select a number that is high enough to prevent attacks, but not slower than potential user patience. In this example, we use the default value, 10.

You can salt and hash the password in one function or by using separate functions.

A salt is added to the hashing process to force their uniqueness, increase their complexity without increasing user requirements

JSONWebToken
------------
JSON Web Token (JWT) defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. 
JWTs can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

Run
---
npm start
