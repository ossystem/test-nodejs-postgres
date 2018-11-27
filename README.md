## Requirements

Next modules should be installed globally:
- `nodejs` ^8.x
- `npm` ^6.x
- `knex` ^0.15.x
- `typescript` ^3.x
- `postgres` ^10.x

## Deployment
1. Create manually some DB.
2. Write connection settings to `config.json` in the root of project.
3. Execute in terminal:
```
npm i
tsc
npm run latest
npm run seed    # optional
npm run start
```
Another commands for using with `npm` you can see in `package.json` in the root of project.  

## SERVER API
#### Getting users by `id`

##### Request:

```
curl -X GET http://HOST:3000/users/ID
```

Where:
- `HOST` is the `db.host` parameter from `config.json`;
- `ID` is user ID.

Example:

`curl -X GET http://127.0.0.1:3000/users/2`

##### Response:

It will be an JS object:
- empty if user doesn't exist by ID;
- data about found user.

Example:
```json
{
    "id": "2",
    "email": "cap@avengers.com",
    "first_name": "Kris",
    "last_name": "Evans",
    "created_at": "2018-11-27T10:21:20.270Z",
    "updated_at": "2018-11-27T10:21:20.270Z"
}
```

#### Inserting and updating user

##### Request:

If you need to update user by `id` you should send `id` parameter in request body:
```
curl -X POST \
   http://HOST:3000/users \
   -H 'content-type: application/json' \
   -d '{
       "id": ID_VALUE,
       ...
     }'
```

Or without `id` parameter if you need to create new user.

Example:
```
curl -X POST \
   http://127.0.0.1:3000/users \
   -H 'content-type: application/json' \
   -d '{
       "id": 3,
       "email": "test1@example.com",
       "first_name": "test1_firstname",
       "last_name": "test1_lastname"
     }'
```

##### Response:

Created or updated user with new values, or empty JS object if user wasn't found by `id`:
```
{
    "id": "3",
    "email": "test1@example.com",
    "first_name": "test1_firstname",
    "last_name": "test1_lastname"
    "created_at": "2018-11-27T10:21:25.447Z",
    "updated_at": "2018-11-27T11:11:19.928Z"
}
```
