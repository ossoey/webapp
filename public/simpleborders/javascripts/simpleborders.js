let simplestBorders = new  Ebika.Projects.WebGL1Borders ({canvasId:'canvasid', shadersSources: {
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
    clearColor: [0.,0.,0.,0.3],
    attributs : {
        position : {name:'a_Position',
            value:[-0.9,0.8,0.0],
            values:[],
            recordSize: 3,
        },
        pointSize : {name:'a_PointSize',value:5.0, values:[],  recordSize: 1,
        }
    } ,

    uniforms : {
        color : {name:'u_FragColor',
            value:[0.9,0.8,0.3,1.0],
            values:[],

            recordSize: 4,
        }
        ,
    }


});

function main() {
   simplestBorders.shdProg.canvasFullScreen();
   simplestBorders.draw();



   // let border = new  Ebika.Borders();
   // border.doTests()

  // let curveInfo = new  Ebika.CurveInfo();
   // curveInfo.doTests();
}