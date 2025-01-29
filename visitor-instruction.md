# Createa a visitor management

1. Register a visitor
   1.1 .scheme
   'https://jiran-webapi.onrender.com/User/RegisterVisitor?providedVisitorName=test&providedVisitorMobileNo=1234325&providedVisitorNRIC=98&providedQuantity=1&providedPurposeOfVisit=sleep&providedPlateNo=123213&providedUnitNumberID=1'

   1.2.

2. Update visitor information
   2.2. Approval
   2.3.
   'https://jiran-webapi.onrender.com/User/UpdateVisitor'
3. Get list of visitors
   3.1.
   'https://jiran-webapi.onrender.com/User/GetVisitor'

# response

[
{
"visitorId": 3,
"visitorName": "test",
"visitorMobileNo": "1234325",
"visitorNRIC": "98",
"visitorQuantity": 1,
"visitorPurposeOfVisit": "sleep",
"visitorVehicleType": null,
"visitorVehicle": null,
"visitorVehiclePlate": "123213",
"approvalStatus": "P",
"unitNumberId": 1,
"createdById": null,
"createdDate": null,
"qrFileName": null,
"qrExpiryDate": null,
"unitNumber": null
},
{
"visitorId": 4,
"visitorName": "test",
"visitorMobileNo": "1234325",
"visitorNRIC": "98",
"visitorQuantity": 1,
"visitorPurposeOfVisit": "sleep",
"visitorVehicleType": null,
"visitorVehicle": null,
"visitorVehiclePlate": "123213",
"approvalStatus": "P",
"unitNumberId": 1,
"createdById": null,
"createdDate": null,
"qrFileName": null,
"qrExpiryDate": null,
"unitNumber": null
}
]
