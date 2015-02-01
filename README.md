# Wheel.js

> Clicking wheel control interface

Clicking wheel control interface. Sort of like Knob.js but without any rendering.

## Usage

Install using bower: `bower install wheel.js`  
Or using npm: `npm install wheel.js`  
Or just by downloading the [tarball](https://github.com/MathieuLoutre/wheel.js/archive/master.zip)

```js

var wheel = new Wheel({
	callback: tick,
	min: 1,
	max: 80,
	start: currentBook,
	el: "#wheel",
	drag: true,
	keyboard: true
});

wheel.getVal()

```

## TODO

- Testing

## Changelog

- 0.1.0 - First release