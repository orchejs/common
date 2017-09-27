Orche Validators
==================

[![Build Status](https://travis-ci.org/orchejs/validators.svg?branch=master)](https://travis-ci.org/orchejs/validators)
[![Coverage Status](https://coveralls.io/repos/github/orchejs/validators/badge.svg?branch=master)](https://coveralls.io/github/orchejs/validators?branch=master)

-------

This library contains common validators that may be used in Orchejs projects. It doesn't mean that you cannot use it in other type of projects, by the way, it would be a good practice to use the same backend validators in frontend or mobile projects. For example, to use a validator in an Angular project, it would be necessary to create a directive calling one of the validators of @orche/validators.

This project is divided in two kinds of validators: Global and Local. The first one comprises common validators, which means, anything that are not from a specific country or region. Examples of global validators are email, not null and length checkers. Local validators are anything that belongs to a specific country like zip code, documents as ID cards and so on.

The idea here is to make a public repository that may grow with the community contribution. So if you need a validator that does not exists here, please open a PR and help us to improve it. For contributions, please check the [contributions](#con) topic.

-------
## Topics

- [How to use it in Orchejs](#huo)
- [Global validators](#gbv)
- [Local validators](#lcv)
- [Implementing new Validators](#inv)
- [Contributing](#con)
- [License](#lic)

## <a name="huo"></a> How to use it in Orchejs

### How to install?

This library is already bundled in the Orchejs projects. So you actually don't need to install anything.

### How to use it in [@orche/rest](https://github.com/orchejs/rest)

The validators can be used for endpoint parameters validation or to validate a property in a class that can be a resource.

#### Endpoint parameter validation

When creating a Route, it's possible to add a validation to the parameter.

```js
@Route()
export class Students {
  @Get()
  getStudent(@QueryParam('name', { 
    validators: [{
      validator: NotNullValidator
    }]
  }) name: string) {
    // ... logic..
  }
}
```
In this example, the NotNullValidator will run before the endpoint logic execution. So if any validation error happens, it will not pass to the route execution and will send the response error. Pretty forward isn't it? The result is a clean code.

#### Property class validation

Besides validating a basic variable type, it is also possible to validate a property of an object. This is useful for insert or update where it is usually sent an object into the body of the HTTP request.

```js
export class Student {
  _id: ObjectId;

  @Property({ 
    validators: [ {
      validator: NotNullValidator
    }]
  })
  _name: string;

  @Property({
    validators: [{
      validator: EmailValidator
    }]
  })
  _email: string;

  @Property({
    validators: [{
        validator: MinValidator,
        params: 2,
        message: 'Students must be at least 2 years old'
    }]
  })  
  _age: number;

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  // ...
}

@Route()
export class Students {
  @Post()
  createStudent(@BodyParam() student: Student) {
    // ... logic..
  }
}
```

In this example, when making a HTTP Post request to ```/students``` the endpoint will execute only if all validators of Student are met. Again, the result code will be a clean. 

## <a name="gbv"></a> Global validators

Global validators comprise all validations that are common to everyone. The following list is bundled to this library:

|Validator|Description|
|---------|-----------|
|EmailValidator|Performs email validation.|
|MaxLengthValidator|Validates if the length of a value, that can be a string or Array, is not higher than the maximum length.|
|MaxValidator|Validates if a value is not higher than a number.|
|MinLengthValidator|Validates if the length of a value, that can be a string or Array, is higher than the minimum length.|
|MinValidator|Validates if a value is higher than a number.|
|NotEmptyValidator|Validates if a value is not undefined, null and blank ''|
|NotNullValidator|Validates if a value is null or undefined.|
|PatternValidator|Validates if a value matches a regex.|


## <a name="lcv"></a> Local validators

Local validators support regional validation rules as document validations, ID card, 
social security, zip code, phone numbers and so on.
This regional or country specific validators are organized in a locale folder structure.

To correctly name the folder, the following language tags list must be considered. This list was extracted from [Locale codes](https://www.science.co.il/language/Locale-codes.php#definitions).

**Important**: The name must be in lowercase and separated by hyphen. Example: en-us.

|Locale|Language tag|
|------|------------|
|Afrikaans|**af**|
|Albanian|**sq**|
|Amharic|**am**|
|Arabic - Algeria|**ar-dz**|
|Arabic - Bahrain|**ar-bh**|
|Arabic - Egypt|**ar-eg**|
|Arabic - Iraq|**ar-iq**|
|Arabic - Jordan|**ar-jo**|
|Arabic - Kuwait|**ar-kw**|
|Arabic - Lebanon|**ar-lb**|
|Arabic - Libya|**ar-ly**|
|Arabic - Morocco|**ar-ma**|
|Arabic - Oman|**ar-om**|
|Arabic - Qatar|**ar-qa**|
|Arabic - Saudi Arabia|**ar-sa**|
|Arabic - Syria|**ar-sy**|
|Arabic - Tunisia|**ar-tn**|
|Arabic - United Arab Emirates|**ar-ae**|
|Arabic - Yemen|**ar-ye**|
|Armenian|**hy**|
|Assamese|**as**|
|Azeri - Cyrillic|**az-az**|
|Azeri - Latin|**az-az**|
|Basque|**eu**|
|Belarusian|**be**|
|Bengali - Bangladesh|**bn**|
|Bengali - India|**bn**|
|Bosnian|**bs**|
|Bulgarian|**bg**|
|Burmese|**my**|
|Catalan|**ca**|
|Chinese - China|**zh-cn**|
|Chinese - Hong Kong SAR|**zh-hk**|
|Chinese - Macau SAR|**zh-mo**|
|Chinese - Singapore|**zh-sg**|
|Chinese - Taiwan|**zh-tw**|
|Croatian|**hr**|
|Czech|**cs**|
|Danish|**da**|
|Divehi|**Maldivian**|
|Dutch - Belgium|**nl-be**|
|Dutch - Netherlands|**nl-nl**|
|English - Australia|**en-au**|
|English - Belize|**en-bz**|
|English - Canada|**en-ca**|
|English - Caribbean|**en-cb**|
|English - Great Britain|**en-gb**|
|English - India|**en-in**|
|English - Ireland|**en-ie**|
|English - Jamaica|**en-jm**|
|English - New Zealand|**en-nz**|
|English - Phillippines|**en-ph**|
|English - Southern Africa|**en-za**|
|English - Trinidad|**en-tt**|
|English - United States|**en-us**|
|Estonian|**et**|
|FYRO Macedonia|**mk**|
|Faroese|**fo**|
|Farsi - Persian|**fa**|
|Finnish|**fi**|
|French - Belgium|**fr-be**|
|French - Canada|**fr-ca**|
|French - France|**fr-fr**|
|French - Luxembourg|**fr-lu**|
|French - Switzerland|**fr-ch**|
|Gaelic - Ireland|**gd-ie**|
|Gaelic - Scotland|**gd**|
|German - Austria|**de-at**|
|German - Germany|**de-de**|
|German - Liechtenstein|**de-li**|
|German - Luxembourg|**de-lu**|
|German - Switzerland|**de-ch**|
|Greek|**el**|
|Guarani - Paraguay|**gn**|
|Gujarati|**gu**|
|Hebrew|**he**|
|Hindi|**hi**|
|Hungarian|**hu**|
|Icelandic|**is**|
|Indonesian|**id**|
|Italian - Italy|**it-it**|
|Italian - Switzerland|**it-ch**|
|Japanese|**ja**|
|Kannada|**kn**|
|Kashmiri|**ks**|
|Kazakh|**kk**|
|Khmer|**km**|
|Korean|**ko**|
|Lao|**lo**|
|Latin|**la**|
|Latvian|**lv**|
|Lithuanian|**lt**|
|Malay - Brunei|**ms-bn**|
|Malay - Malaysia|**ms-my**|
|Malayalam|**ml**|
|Maltese|**mt**|
|Maori|**mi**|
|Marathi|**mr**|
|Mongolian|**mn**|
|Mongolian|**mn**|
|Nepali|**ne**|
|Norwegian - Bokml|**no-no**|
|Norwegian - Nynorsk|**no-no**|
|Oriya|**or**|
|Polish|**pl**|
|Portuguese - Brazil|**pt-br**|
|Portuguese - Portugal|**pt-pt**|
|Punjabi|**pa**|
|Raeto-Romance|**rm**|
|Romanian - Moldova|**ro-mo**|
|Romanian - Romania|**ro**|
|Russian|**ru**|
|Russian - Moldova|**ru-mo**|
|Sanskrit|**sa**|
|Serbian - Cyrillic|**sr-sp**|
|Serbian - Latin|**sr-sp**|
|Setsuana|**tn**|
|Sindhi|**sd**|
|Sinhala|**si**|
|Slovak|**sk**|
|Slovenian|**sl**|
|Somali|**so**|
|Sorbian|**sb**|
|Spanish - Argentina|**es-ar**|
|Spanish - Bolivia|**es-bo**|
|Spanish - Chile|**es-cl**|
|Spanish - Colombia|**es-co**|
|Spanish - Costa Rica|**es-cr**|
|Spanish - Dominican Republic|**es-do**|
|Spanish - Ecuador|**es-ec**|
|Spanish - El Salvador|**es-sv**|
|Spanish - Guatemala|**es-gt**|
|Spanish - Honduras|**es-hn**|
|Spanish - Mexico|**es-mx**|
|Spanish - Nicaragua|**es-ni**|
|Spanish - Panama|**es-pa**|
|Spanish - Paraguay|**es-py**|
|Spanish - Peru|**es-pe**|
|Spanish - Puerto Rico|**es-pr**|
|Spanish - Spain (Traditional)|**es-es**|
|Spanish - Uruguay|**es-uy**|
|Spanish - Venezuela|**es-ve**|
|Swahili|**sw**|
|Swedish - Finland|**sv-fi**|
|Swedish - Sweden|**sv-se**|
|Tajik|**tg**|
|Tamil|**ta**|
|Tatar|**tt**|
|Telugu|**te**|
|Thai|**th**|
|Tibetan|**bo**|
|Tsonga|**ts**|
|Turkish|**tr**|
|Turkmen|**tk**|
|Ukrainian|**uk**|
|Urdu|**ur**|
|Uzbek - Cyrillic|**uz-uz**|
|Uzbek - Latin|**uz-uz**|
|Vietnamese|**vi**|
|Welsh|**cy**|
|Xhosa|**xh**|
|Yiddish|**yi**|
|Zulu|**zu**|


Currently there aren't local validators implemented. If you wish to develop one to support a
specific country validation, please take a look at [Implementing new Validators](#inv) and [Contributions](#con) topics.

## <a name="inv"></a> Implementing new Validators

To create a new validator to your project, you should implement the Validator interface.

All validation rules must be inside of the validate method. For example:

```js
import { Validator, ValidatorError } from '@orche/validators';

export class CustomValidator implements Validator {

  public validate(value: any, validatorParams?: any): Promise<ValidatorError> {
    // ... your validation rules  
  }

}
```

### About the validate method:
The params:
- **value:** this is the value that will be evaluated 
- **validatorParams:** this param may contains zero, one or more values. It can be used 
as a reference for the validation. For example: to check if a value is higher than other or a 
specific date.

Return value:
- The method returns a Promise of ValidatorError. The reason to return a promise is for async execution of long processing validations, like going to DB to get a value or something that needs an extra processing.
- If there is no validation error, the method must resolve nothing - ```resolve();```
- If there is a validation error, resolve a ValidatorError object, for example:
```js
const validatorError: ValidatorError = {
  message: 'Validator Message [REQUIRED]',
  value: 'this is the validated value [OPTIONAL]',
  details: 'Add any details about the validation. [OPTIONAL]'
}

resolve(validatorError);
```

**Important**: Avoid to use external libraries, except those that are pretty generic like lodash or 
momentjs. This is for keeping away from excessive dependencies as it could result in bugs.

### Share to the community

If you think that your validator can be used by others, please consider sharing to the communit. 
The first thing is to open an [issue](https://github.com/orchejs/validators/issues/new) and after 
being accepted, submit your Pull Request. 

Don't forget to take a look at the [contribution guidelines](#con).

## <a name="con"></a> Contributions

If you want to contribute to the project, please check out the [contributing](CONTRIBUTING.md) 
document.

**Thanks for supporting Orchejs!**

## <a name="lic"></a> License

MIT License

Copyright (c) 2017 Mauricio Gemelli Vigolo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.