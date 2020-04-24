// what is sampleResponse ?
//     -checkout response from sample file, returns an array of objects,
//         most concerned w /

//             isSensitive : false
// dataclass: password
// breach date after last login

//     (!sampleResponse.isSensitive && sampleResponse.DataClasses.includes('Passwords') && sampleResponse.AddedDate > account.lastLogin))

// Need to iterate over sampleResponse, check conditions for each breach, some won't need to display back to user if not regarding password, etc..

// Still seeing breach errors with safe@example.com and pw, need to debug / why is safe returning sample response ?
//  ..actually part of API call, need to test with that


// {
//     "Title": "000webhost",
//         "Name": "000webhost",
//             "Domain": "000webhost.com",
//                 "BreachDate": "2015-03-01",
//                     "AddedDate": "2015-10-26T23:35:45Z",
//                         "ModifiedDate": "2017-12-10T21:44:27Z",
//                             "PwnCount": 14936670,
//                                 "Description": "In approximately March 2015, the free web hosting provider <a href=\"http://www.troyhunt.com/2015/10/breaches-traders-plain-text-passwords.html\" target=\"_blank\" rel=\"noopener\">000webhost suffered a major data breach</a> that exposed almost 15 million customer records. The data was sold and traded before 000webhost was alerted in October. The breach included names, email addresses and plain text passwords.",
//                                     "DataClasses": ["Email addresses", "IP addresses", "Names", "Passwords"],
//                                         "IsVerified": true,
//                                             "IsFabricated": false,
//                                                 "IsSensitive": false,
//                                                     "IsActive": true,
//                                                         "IsRetired": false,
//                                                             "IsSpamList": false,
//                                                                 "LogoType": "png"
// },