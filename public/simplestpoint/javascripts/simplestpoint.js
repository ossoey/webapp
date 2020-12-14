
 let dyniDryPoint = new   Ebika.Projects.WebGL1DyniDrypoint ({canvasId:'canvasid', shadersSources: {
         'VERTEX_SHADER':
             `attribute vec4 a_Position;
              attribute float a_PointSize;
              void main() {
                          gl_Position = a_Position;
                          gl_PointSize = a_PointSize;
                        }` ,
         'FRAGMENT_SHADER' :
             `precision mediump float;
              uniform vec4 u_FragColor;
              void main() {
                 gl_FragColor = u_FragColor;
               }`
     },
     clearColor: [0.,0.,0.,1.0],
     attributs : {
             position : {name:'a_Position', value:[-0.9,0.8,0.0]},
             pointSize : {name:'a_PointSize', value:5.0}
     } ,
     uniforms : {
         color : {name:'u_FragColor', value:[0.9,0.8,0.3,1.0]},
     }
 });

function main() {
    dyniDryPoint.draw();
};