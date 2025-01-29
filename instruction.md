# Using a nextjs create a basic dashboard called "Jiran"

In this dashboard it will have 2 page:

1. User
   1.1. User list
   1.1.1. curl -X 'GET' \
    'https://jiran-webapi.onrender.com/User/GetAllUser' \
    -H 'accept: _/_'
   1.2. Update user details
   1.2.1. curl -X 'POST' \
    'https://jiran-webapi.onrender.com/User/Update' \
    -H 'accept: _/_' \
    -d ''
   1.4. Add user
   1.4.1. curl -X 'POST' \
    'https://jiran-webapi.onrender.com/User/Register' \
    -H 'accept: _/_' \
    -d ''
   example column in user list:[
   {
   "userId": 1,
   "userLogin": "admin",
   "password": "admin",
   "name": "admin",
   "titleId": null,
   "nric": "999999999999",
   "unitNumberId": null,
   "email": null,
   "mobileNo": "60179264006",
   "homeNo": null,
   "status": "A",
   "createdById": null,
   "createdDate": null,
   "roleId": null,
   "role": null,
   "systemId": null,
   "system": null,
   "title": null,
   "unitNumber": null
   }
   ]

# tech stack

- nextjs
- tailwindcss
- shadcn
- react-query
- react-hook-form
- react-table
- axios
