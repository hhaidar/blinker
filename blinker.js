//
// Blinker
//

var _ = require('underscore'),
    HID = require('node-hid'),
    sleep = require('sleep');
    
var blinker = module.exports = new (function() {

    this.start = function() {
        var vendorID = 0x1d34,
            productID = 0x0004;
        var devices = HID.devices(vendorID, productID);
        this.device = _.first(devices);
        this.light = new HID.HID(this.device.path);
        this.light.write([0x1f, 0x01, 0x25, 0x00, 0xc4, 0x00, 0x25, 0x03]);
        this.light.write([0x00, 0x01, 0x25, 0x00, 0xC4, 0x00, 0x25, 0x04]);
        return this;
    }

    this.color = function(red, green, blue, sleep) {
        this.light.write([0, red, green, blue, 0x00, 0x00, 0x00, 0x25, 0x05]);
        if (sleep)
            this.sleep(sleep);
        return this;
    }

    // TODO: Make this a queue
    this.sleep = function(time) {
        sleep.usleep(time * 1000);
        return this;
    }

    this.off = function() {
        this.color(0,0,0);
        return this;
    }

    this.demo = function() {
        this
          .color(255, 0, 0, 1000)
          .color(0, 255, 0, 1000)
          .color(0, 0, 255, 1000)
          .color(255, 20, 0, 1000)
          .color(203, 0, 245, 1000)
          .color(255, 215, 0, 1000)
          .color(3, 35, 60, 1000)
          .color(0, 255, 0, 1000)
          .color(0, 0, 255, 1000)
          .color(255, 0, 0, 200)
          .color(0, 0, 255, 200)
          .color(255, 0, 0, 200)
          .color(0, 0, 255, 200)
          .color(255, 0, 0, 200)
          .color(0, 0, 255, 200)
          .color(255, 255, 255, 1000)
          .off();
        return this;
    }

});