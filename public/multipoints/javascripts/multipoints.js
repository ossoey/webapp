
const VSH =  new Ebika().VERTEX_SHADER.toString();

const FSH =  new Ebika().FRAGMENT_SHADER.toString();

let shadersSources = {};
 shadersSources[VSH] = `attribute vec4 a_Position;
                      attribute float a_PointSize;
                       void main() {
                          gl_Position = a_Position;
                          //gl_PointSize = 15.0;
                          gl_PointSize = a_PointSize;
                        }`;

shadersSources[FSH] = `precision mediump float;
              //uniform vec4 u_FragColor;
              void main() {
                 gl_FragColor = vec4(1.0,0.3,0.6,1.0);//gl_FragColor = u_FragColor;
               }`;

let multipoints = new Ebika.Projects.WebGL1MultiPoints   ({canvasId:'canvasid',
    shadersSources: shadersSources,
    clearColor: [0.,0.,0.,1.0],
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

    multipoints.shdProg.canvasFullScreen();
    multipoints.draw();
}