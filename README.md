# FloodGate SDK for JavaScript

JavaScript SDK for floodgate.io, a feature-flag/toggle service for projects and applications of all sizes.

## Installing

Navigate to your project folder

```console
npm install floodgate-javascript-sdk
```

## Usage

Below is a simple example of how you can use the JavaScript SDK to check on the status of a flag.

```javascript
import * as floodgate from "floodgate-javascript-sdk";

let client = floodgate.createClient("[YOUR ENVIRONMENT SDK KEY]");
client.IsOn("my-feature-flag", false, (value) => {
  if (value) {
    // Do something new and exciting
  }
  else {
    // Do whatever I usually do
  }
});
```
