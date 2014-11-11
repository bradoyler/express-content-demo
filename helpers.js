var moment = require('moment');

exports.config = function() {
  return {
    formatdate: this.formatdate,
    coverheadline: this.coverheadline,
    'if-equal': this.ifEqual,
    imgurl: this.imgurl,
    'each-limit': this.eachLimit
   };
};

exports.coverheadline = function(article) {
  if(article){
    return article.headline_cover || article.headline;
  }
  return;
};

exports.ifEqual = function(val, test, options) {

  if(typeof test === 'undefined'){
    return options.inverse(this);
  }

  //@bradoyler - should this just be if( typeof test != 'string' ) - evann
  if(typeof test === 'number' || typeof test === 'boolean') {
    if(val===test){
      return options.fn(this);
    }
    else {
      return options.inverse(this);
    }
  }

  var arrTest = test.split('||');

  for (var i = 0; i < arrTest.length; i++) {
    if (val === arrTest[i]) {
      return options.fn(this);
    }
  }
  return options.inverse(this);
};

exports.imgurl = function(imgurl, width, height) {
  var _width = width || '800',
    _height = height || '320';
  var _imgurl = imgurl || '#';
  _imgurl = _imgurl.toLowerCase().replace('/i/', '/j/').replace('.jpg', '.nbcnews-fp-' + _width + '-' + _height + '.jpg')
    .replace('.jpeg', '.nbcnews-fp-' + _width + '-' + _height + '.jpeg')
    .replace('.png', '.nbcnews-fp-' + _width + '-' + _height + '.png');
  return _imgurl;
};

exports.formatdate = function(datevalue) {
  return moment.utc(datevalue).fromNow(true);
};

//limit an each interation
//https://github.com/diy/handlebars-helpers/blob/master/lib/each-limit.js
exports.eachLimit = function(context, limit) {
  var options = arguments[arguments.length - 1];
  var ret = '';

  if (context && context.length > 0) {
      var max = Math.min(context.length, limit);
      for (var i = 0; i < max; i++) {
          ret += options.fn(context[i]);
      }
  } else {
      ret = options.inverse(this);
  }

  return ret;
};
