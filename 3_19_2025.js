
const parseAcceptLanguage = (acceptLanguageHeader, supportedLanguageArray) => {
    let acceptedLanguageHeadersArray = acceptLanguageHeader.split(', ');
  
    let seenMappings = {}; 
    let supportedLanguagesSet = new Set();
    supportedLanguageArray.forEach(supportedLanguage => {
      supportedLanguagesSet.add(supportedLanguage);
      let languageTag = supportedLanguage.split('-')[0];
  
      if (seenMappings[languageTag]) {
        let currentMapping = seenMappings[languageTag]
        seenMappings[languageTag] = [...currentMapping, supportedLanguage]
      } else {
        seenMappings[languageTag] = [supportedLanguage]
      }
    })
  
    // parseAcceptLanguage("fr-FR, fr, *", ["en-US", "fr-CA", "fr-FR"]),
  
    let intersectLanguages = [];
    for (let acceptedLanguage of acceptedLanguageHeadersArray) {
      if (acceptedLanguage === '*'){
        supportedLanguageArray.forEach(supLang => {
          if (!intersectLanguages.includes(supLang)) {
            intersectLanguages.push(supLang)
          }
        })
        break;
      } else if (!acceptedLanguage.includes('-') && seenMappings[acceptedLanguage]) {
        let matchingLanguages = seenMappings[acceptedLanguage];
        matchingLanguages.filter(matchLang => !intersectLanguages.includes(matchLang))
        intersectLanguages = [...intersectLanguages, ...matchingLanguages];
      } else {
        if (supportedLanguagesSet.has(acceptedLanguage)) {
          intersectLanguages.push(acceptedLanguage);
        }
      }
    }
  
    return intersectLanguages
  }
  console.log('PART3 testcases')
  
  console.log(
    parseAcceptLanguage("en, *", ["en-US", "fr-CA", "fr-FR"]),
  'returns: "en-US", "fr-CA", "fr-FR"'
  )
  
  console.log(
    parseAcceptLanguage("en-US, *", ["en-US", "fr-CA", "fr-FR"]),
  'returns: ["en-US", "fr-CA", "fr-FR"]'
  )
  console.log(
    parseAcceptLanguage("fr-FR, fr, *", ["en-US", "fr-CA", "fr-FR"]),
  'returns: ["fr-FR", "fr-CA", "en-US"]'
  )
  
  console.log('PART2 testcases')
  console.log(
    parseAcceptLanguage("fr-CA, en", ["en-US", "fr-CA", "fr-FR"]),
    '***returns: ["fr-CA","en-US"]'
  )
  console.log(parseAcceptLanguage("en", ["en-US", "fr-CA", "fr-FR"]), 'expect: ["en-US"]')
  console.log(parseAcceptLanguage("fr", ["en-US", "fr-CA", "fr-FR"]),
    'returns: ["fr-CA", "fr-FR"]')
  
  console.log(
    parseAcceptLanguage("en, fr-CA", ["en-US", "fr-CA", "fr-FR"]),
    'returns: ["en-US","fr-CA"]'
  )
  
  
  console.log('PART1 testcases')
  
  console.log(parseAcceptLanguage(
    "en-US, fr-CA, fr-FR",  // the client's Accept-Language header, a string
    ["fr-FR", "en-US"]      // the server's supported languages, a set of strings
  ), ' expect: ["en-US", "fr-FR"]')
  
  console.log(parseAcceptLanguage(
    "fr-CA, fr-FR, en-US",  // the client's Accept-Language header, a string
    ["fr-FR", "en-US"]      // the server's supported languages, a set of strings
  ), ' expect: [""fr-FR", en-US"]')
  
  console.log(parseAcceptLanguage("fr-CA, fr-FR", ["en-US", "fr-FR"]), 'expect: ["fr-FR"]')
  console.log(parseAcceptLanguage("en-US", ["en-US", "fr-CA"]), 'expect:  en-US')
  // en-US
  
  // console.log("en-US, fr-CA, fr-FR".split(', ').sort())
  