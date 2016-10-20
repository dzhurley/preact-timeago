# preact-timeago

Super minimal port of [timeago-react](https://github.com/hustcc/timeago-react) to work with [Preact](https://preactjs.com/), supporting a subset of the [timeago-react](https://github.com/hustcc/timeago-react) props.

## Install

    npm install preact-timeago

Library depends on [timeago.js](https://github.com/hustcc/timeago.js).

## Usage

```javascript
const { h, render } = require('preact');
const TimeAgo = require('preact-timeago');

const Content = ({ datetime }) => (
    <section class="content">
        <TimeAgo datetime={datetime} live={true} />
    </section>
);

render(<Content datetime="2016-10-10 10:10:10" />, document.body);
```

## Props

`datetime` is required and [timeago.js](https://github.com/hustcc/timeago.js) will do its best to format what it's given, one of:

 * datetime string
 * Date instance
 * timestamp

`live` defaults to `false`, determines whether the time should update if the `datetime` prop changes.

## Gotchas

### locale

I had no need in the project that this came from to keep locale-based formatting, so `'en'` is the only supported locale with this module.

## Contributing

Pull requests welcome! This project isn't intended to closely track its React counterpart but instead provide similar but minimal functionality to Preact users.
