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
        var time = 20;
        for (i = 0; i < 255; i++) {
            blinker.color(0, i, 255 - i, time)
        }
        for (i = 0; i < 255; i++) {
            blinker.color(i, 255 - i, 0, time)
        }
        for (i = 0; i < 255; i++) {
            blinker.color(255 - i, 0, i, time)
        }
        blinker.off();
        return this;
    }

});