
module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js'
  ],  
  theme: { 
    fontFamily: {
      sans: ['Raleway', 'sans-serif'], 
      heading: ['Open Sans', 'sans-serif']
    },
    extend: {
      colors: {
        darkGray: '#1D2532',
        stratosGray: '#3F4454',
        backgroundGray: '#F7F8FA', 
        lightGray: '#BBC5D5',
        outlineGray: '#DFE5ED',
        stratosOrange: '#BA461B', 
        trueGreen: "#70CA6B",
        stratosRed: '#E00000',
        stratosBlue: '#0C226C',
      }
    }
  }
}
