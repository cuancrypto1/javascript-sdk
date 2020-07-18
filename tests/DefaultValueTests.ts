import { expect, assert } from 'chai';
import 'mocha';
import * as floodgateClient from "../src/index";

import data from "./test-config";

describe('Test Default Values', () => {
  const config = {
    localConfigData: data,
    consoleLog: true,
    refreshInterval: 3600
  };

  it('should return grey', function(done) {
    this.timeout(10000);

    const client = floodgateClient.createAutoUpdateClient("invalid", config);

    client.on('ready', function() {
      let key = 'invalid-key';
      const colour = client.GetValue(key, 'grey');

      expect(colour).to.equal('grey');
      done();
    });
  });

  it('should return red', function(done) {
    this.timeout(10000);

    const client = floodgateClient.createAutoUpdateClient("invalid", config);

    client.on('ready', function() {
      let key = 'colours';
      const colour = client.GetValue(key, 'grey');

      expect(colour).to.equal('red'); 
      done();
    });
  });
});