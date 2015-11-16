var React = require('React');

var CodeBlock = React.createClass({

  render: function() {

    var filters = [];
    (this.props.filter.contrast != 100) ? filters.push('contrast('+this.props.filter.contrast+'%)') : '';
    (this.props.filter.brightness != 100) ? filters.push('brightness('+this.props.filter.brightness+'%)') : '';
    (this.props.filter.saturate != 100) ? filters.push('saturate('+this.props.filter.saturate+'%)') : '';
    (this.props.filter.sepia != 0) ? filters.push('sepia('+this.props.filter.sepia+'%)') : '';
    (this.props.filter.grayscale != 0) ? filters.push('grayscale('+this.props.filter.grayscale+'%)') : '';
    (this.props.filter.invert != 0) ? filters.push('invert('+this.props.filter.invert+'%)') : '';
    (this.props.filter.hueRotate != 0) ? filters.push('hue-rotate('+this.props.filter.hueRotate+'deg)') : '';
    (this.props.filter.blur != 0) ? filters.push('blur('+this.props.filter.blur+'px)') : '';
    var filters = filters.join(' ');


    var opacity = this.props.filter.opacity;
    var blend = this.props.filter.blend;
    var overlay = this.props.overlay;

    var output = '.filter {<br />'
    output += '  position: relative;<br />';
    output += (filters.length > 0) ? '  -webkit-filter: '+filters+';<br />' : '';
    output += (filters.length > 0) ? '  filter: '+filters+';<br />' : '';
    output += '}';
    output += '<br />';

    switch (overlay.position) {
      case 'left top':
        var overlayPos = '0% 0%';
        break;
      case 'center top':
        var overlayPos = '50% 0%';
        break;
      case 'right top':
        var overlayPos = '100% 0%';
        break;
      case 'center center':
        var overlayPos = '50% 50%';
        break;
      case 'right center':
        var overlayPos = '100% 50%';
        break;
      case 'left bottom':
        var overlayPos = '0% 100%';
        break;
      case 'center bottom':
        var overlayPos = '50% 100%';
        break;
      case 'right bottom':
        var overlayPos = '100% 100%';
        break;
      default:

    }

    if (this.props.overlay.type == 'solid' || this.props.overlay.type == 'linear' || this.props.overlay.type == 'radial') {
      output += '.filter::before {<br />';
      output += '  content: "";<br />';
      output += '  display: block;<br />';
      output += '  height: 100%;<br />';
      output += '  width: 100%;<br />';
      output += '  top: 0;<br />';
      output += '  left: 0;<br />';
      output += '  position: absolute;<br />';
      output += '  pointer-events: none;<br />';

      output += (blend && blend != 'normal') ? '  mix-blend-mode: '+blend+';<br />' : '';
      output += (opacity && opacity != '100') ? '  opacity: '+(parseInt(opacity)/100)+';<br />' : '';

      output += (overlay && overlay.type == 'solid') ? '  background: '+'rgba('+overlay.color.r+', '+overlay.color.g+', '+overlay.color.b+', '+overlay.color.a+')'+';<br />' : '';

      output += (overlay && overlay.type == 'linear') ? '  -webkit-linear-gradient('+overlay.direction+', rgba('+overlay.color1.color.r+', '+overlay.color1.color.g+', '+overlay.color1.color.b+', '+overlay.color1.color.a+') '+ overlay.color1.stop+', rgba('+overlay.color2.color.r+', '+overlay.color2.color.g+', '+overlay.color2.color.b+', '+overlay.color2.color.a+'));<br />' : '';
      output += (overlay && overlay.type == 'linear') ? '  linear-gradient('+overlay.direction+', rgba('+overlay.color1.color.r+', '+overlay.color1.color.g+', '+overlay.color1.color.b+', '+overlay.color1.color.a+') '+ overlay.color1.stop+', rgba('+overlay.color2.color.r+', '+overlay.color2.color.g+', '+overlay.color2.color.b+', '+overlay.color2.color.a+'));<br />' : '';

      output += (overlay && overlay.type == 'radial') ? '  -webkit-radial-gradient('+overlayPos+', circle '+overlay.size+', rgba('+overlay.color1.color.r+', '+overlay.color1.color.g+', '+overlay.color1.color.b+', '+overlay.color1.color.a+') '+ overlay.color1.stop+', rgba('+overlay.color2.color.r+', '+overlay.color2.color.g+', '+overlay.color2.color.b+', '+overlay.color2.color.a+'));<br />' : '';
      output += (overlay && overlay.type == 'radial') ? '  radial-gradient('+overlayPos+', circle '+overlay.size+', rgba('+overlay.color1.color.r+', '+overlay.color1.color.g+', '+overlay.color1.color.b+', '+overlay.color1.color.a+') '+ overlay.color1.stop+', rgba('+overlay.color2.color.r+', '+overlay.color2.color.g+', '+overlay.color2.color.b+', '+overlay.color2.color.a+'));<br />' : '';


      output += '}';
    }

    return (
      <pre className="code__panel"><code dangerouslySetInnerHTML={{__html: output}}>
      </code></pre>
    );

  }
});

module.exports = CodeBlock;
