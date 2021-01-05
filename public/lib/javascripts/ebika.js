

class Ebika {

    constructor() {

        this.REGION_NOTHING                = "NOTHING";
        this.REGION_ORIGIN                 = "ORIGIN";
        this.REGION_POSITIVE_X             = "POSIABS";
        this.REGION_NEGATIVE_X             = "NEGAABS";
        this.REGION_POSITIVE_Y             = "POSIORD";
        this.REGION_NEGATIVE_Y             = "NEGAORD";
        this.REGION_SQUARE1                = "SQUARE1";
        this.REGION_SQUARE2                = "SQUARE2";
        this.REGION_SQUARE3                = "SQUARE3";
        this.REGION_SQUARE4                = "SQUARE4";

        this.X_AXIS_ORIENTATION_LEFT       = "LEFT";
        this.X_AXIS_ORIENTATION_CENTER     = "CENTER";
        this.X_AXIS_ORIENTATION_RIGHT      = "RIGHT";

        this.Y_AXIS_ORIENTATION_TOP        = "TOP";
        this.Y_AXIS_ORIENTATION_MIDDLE     = "MIDDLE";
        this.Y_AXIS_ORIENTATION_BOTTOM     = "BOTTOM";

        this.DIMENSION4                    = 4;
        this.VERTEX_SHADER                 = 0x8B31;

        this.FRAGMENT_SHADER               = 0x8B30;

        this.POINTS                        = 0x0000;
        this.LINES                         = 0x0001;
        this.LINE_LOOP                     = 0x0002;
        this.LINE_STRIP                    = 0x0003;
        this.TRIANGLES                     = 0x0004;
        this.TRIANGLE_STRIP                = 0x0005;
        this.TRIANGLE_FAN                  = 0x0006;

        this.config =  {
            "name": "Ebika",
            "author_info": {  "name"   : "Jean-Jacques Ebanga",
                "email"  :  "ebanga@hotmail.com", },
            "contributors": [{  "name"   : "Jean-Jacques Ebanga",
                "email"  :  "ebanga@hotmail.com", }],
            "start"      :  "2012",
            "versions"   : [

                {

                    // 'version' :'20200501',
                    // 'Description' : [
                    //     ' Passage au modele objet avec le concept de class introduit dans Javascript ',
                    //     ' Nouvelle modélisation du module de segmentation qui intègre désormais tout type d équation à une inconnue avec interpollation de valeur dans l intervalle souhaitée ',
                    //     ' Toutes les fonctions ont des paramètres objets notées paramsIn ' ,
                    //     ' Toutes les résultats de fonction sont des objets, notemment le paramètre Objet d entrée, qui contient la propriété result, le résultat de chaque fonction'
                    //     ]    ,
                    //
                    // 'version' :'20200201',
                    // 'Description' : [
                    //     ' Gestion des variables publiques et privée ',
                    //     ' //Introduction du concept de part et parts dans les fonctions génériques, les classes Random et segmentation ',
                    //     ' Modification de la fonction des tests',
                    //     ' Modification de l"architecture globale, chaque classe est une fonction qui peut instancier des objets avec new',
                    //     ' Les classes Segmentations, Random sont sur la racine de la bibliothèque '
                  //  ]    ,

                }    ,

                {
                    'version' :'20191231',
                    'Description' : [

                    ]    ,
                }   ,

                {
                    'version' : '20181101',
                    'Description' :  [

                    ]    ,
                },
            ]   ,

            "notes": "Ajout de la classe Media qui contiendra, sound, camera, pictures, midi",
            "dependencies" :

                {
                    "express"   : "4.13.3",
                    "threejs"     :{ version: "0.98.0", revision: '75'}
                }   ,

        };

        this.paramsInTest = {

            showTests:true,
            objContainer:this.__proto__,
            vars: [7,8,12]

        };

    }

   encodeJSONFile (paramsIn={}) {

       paramsIn.result =' ';
      return  paramsIn.result;
   }

   decodeJSONFile (paramsIn={}) {

        paramsIn.result =' ';
        return  paramsIn.result;
    }


   clamp(paramsIn) {
        return   paramsIn.vars[1]< paramsIn.vars[0] ? paramsIn.vars[0]: paramsIn.vars[1]>paramsIn.vars[2]?paramsIn.vars[2]:paramsIn.vars[1];
   };

   desc(paramsIn) {

        paramsIn.result =  {
            vars:'Paramètre de la fonction clamp. De type Array, contient 3 valeurs, minimum, valeur à clamper et maximum:[min,val, max]'

        };
        return    paramsIn.result
   };

   mergeArrays(paramsIn) {
       let merged = paramsIn.matA.slice();
       for(let eltIndex =0;eltIndex<paramsIn.matB.length;eltIndex++) {
           merged.push(paramsIn.matB[eltIndex ]);
       };
       return merged;
   }

    fullreenCanvasFromButton (canvas) {

            let el =    canvas;
            if(el.webkitRequestFullScreen) {
                el.webkitRequestFullScreen();
            }
            else {
                el.mozRequestFullScreen();
            }
    } ;

    tests(paramsIn) {

        // console.log( paramsIn.object);

        this.paramsIn                            =  paramsIn;
        this.showTests                           =  paramsIn.showTests || false;
        this.instanceObject                      =  paramsIn.object;
        this.functionsName                       =  Object.getOwnPropertyNames(  this.instanceObject.__proto__);
        this.xceptionFunctionsName               =  paramsIn.xceptionFunctionsName || ['constructor','testsForClassInstance', 'tests'];
        this.functionsNameWithOutXceptions       =  [];
        this.isElmentException                   = function (elt){
            let anExeption  = false;
            let xceptionFunctionsNameIndex         = 0;

            while ((xceptionFunctionsNameIndex<this.xceptionFunctionsName.length )&&(!anExeption)) {

                if ( elt === this.xceptionFunctionsName[xceptionFunctionsNameIndex]) {
                    anExeption = true
                }
                xceptionFunctionsNameIndex++
            }
            return anExeption;
        };
        this.buildFunctionsNameWithOutXceptions    = function() {
            this.functionsNameWithOutXceptions       = [];
            for (let functionsNameIndex = 0;functionsNameIndex<this.functionsName.length;functionsNameIndex++ ) {
                if   (! this.isElmentException(this.functionsName[functionsNameIndex])) {
                    this.functionsNameWithOutXceptions.push(this.functionsName[functionsNameIndex]);
                }
            }
        };
        this.runFunctions   = function() {

            console.log('--------------------Fonctions  de  la classe :'+  this.instanceObject.constructor.name  +' -------------------');
            console.log('               -------------------------------------------------------                    ');


            console.log('---------------------------------Paramètres-------------------------------');

            console.log(this.paramsIn );
            console.log('--------------------------------------------------------------------------');

            for (let functionsNameIndex = 0;functionsNameIndex< this.functionsNameWithOutXceptions.length;functionsNameIndex++  ) {
                //console.log( this.instanceObject[this.functionsNameWithOutXceptions[functionsNameIndex ]](this.paramsIn));

                console.log('///////////////////////////////////////////');
                console.log('-- fonction : '+ this.functionsNameWithOutXceptions[functionsNameIndex ] , '  :  '   );
                console.log(  this.instanceObject[this.functionsNameWithOutXceptions[functionsNameIndex ]](this.paramsIn) );
                console.log('///////////////////////////////////////////');

            }
        };

        if  (paramsIn.showTests ) {
            this.buildFunctionsNameWithOutXceptions();
            this.runFunctions();
        }

    }
};

Ebika.GraphicContext                      = class EbikaGraphicContext  extends Ebika  {
    constructor(paramsIn) {
        super();
        let canvasId     = paramsIn.canvasId;
        let contextType  = paramsIn.contextType;
        let canvas  = {};
        let context = {};
        let getCanvas  = function () {
            canvas  = document.getElementById(canvasId);
        };
        let getContext  = function () {
            context = canvas.getContext(contextType);
        };
        this.ini = function () {
            getCanvas();
            if (!canvas) {
                console.log(` Le canvas avec l'identifiant ${canvasid} n'existe pas `);
                return;
            };
            getContext();
            if (!context) {
                console.log(`Le context n'a pas été initialié`);
                return;
            };
        };

        this.getCanvas = function () {
            return  canvas;
        };

        this.getContext = function () {
            return  context;
        };
    };
};

Ebika.Graphic3DContext                    = class EbikaGraphic3DContext  extends Ebika   {
    constructor(paramsIn) {
        super();
        this.canvasId    = paramsIn.canvasId;
        this.contextType = paramsIn.contextType ;
        this.canvas      = {};
        this.gl          = {};
    };

    ini(){
        this.canvas = document.getElementById(this.canvasId);
        if (!this.canvas) {
            console.log(` Le canvas avec l'identifiant ${this.canvasId} n'existe pas `);
            return;
        };
        this.gl = this.canvas.getContext(this.contextType, {preserveDrawingBuffer: true});
        if (!this.gl) {
            console.log(`Le context n'a pas été initialié`);
            return;
        };
    } ;

};

Ebika.ShaderProgram                       = class EbikaShaderProgram extends Ebika {
    constructor(paramsIn) {
        super();
        this.VERTEX_SHADER            = 'VERTEX_SHADER';
        this.FRAGMENT_SHADER          = 'FRAGMENT_SHADER';
        this.POINTS                   = 'POINTS';
        this.LINES                    = 'LINES';
        this.LINE_STRIP               = 'LINE_STRIP';
        this.LINE_LOOP                = 'LINE_LOOP';
        this.TRIANGLES                = 'TRIANGLES';
        this.TRIANGLE_STRIP           = 'TRIANGLE_STRIP';
        this.TRIANGLE_FAN             = 'TRIANGLE_FAN';
        this.attributs                = {};
        this.uniforms                 = {};
        const contextType = 'webgl';
        this.graphic3DContext = new Ebika.Graphic3DContext({canvasId:paramsIn.canvasId, contextType:contextType }) ;
        this.graphic3DContext.ini();
        this.shadersSources   = paramsIn.shadersSources;
        this.gl       =   this.graphic3DContext.gl;
        this.canvas   =   this.graphic3DContext.canvas;

        this.vertexShader;
        this.fragmentShader;
        this.program          = this.gl.createProgram();

       function   getShader(objOlder, shadersSources,shaderSourceKey){
            let shader;
            if (shaderSourceKey == objOlder.VERTEX_SHADER) {
                shader = objOlder.gl.createShader(objOlder.gl.VERTEX_SHADER);

            }
            else if (shaderSourceKey ==  objOlder.FRAGMENT_SHADER)   {

                shader = objOlder.gl.createShader(objOlder.gl.FRAGMENT_SHADER);

            };

           objOlder.gl.shaderSource(shader,shadersSources[shaderSourceKey]);
           objOlder.gl.compileShader(shader);
            if (!objOlder.gl.getShaderParameter(shader,objOlder.gl.COMPILE_STATUS)) {
                console.error(objOlder.gl.getShaderInfoLog(shader));
                return null;
            };
            return shader;
        }

       this.ini = function () {

            this.vertexShader     =  getShader(this, this.shadersSources, this.VERTEX_SHADER);
            this.fragmentShader   =  getShader(this, this.shadersSources, this.FRAGMENT_SHADER);

            this.gl.attachShader(this.program,this.vertexShader);
            this.gl.attachShader(this.program,this.fragmentShader);
            this.gl.linkProgram(this.program);

            if (! this.gl.getProgramParameter( this.program,  this.gl.LINK_STATUS)) {
                console.error('Shaders not linked');
                return null;
            };
            this.gl.useProgram( this.program);
        }
    };

    canvasFullScreen () {
         let canvas =  this.canvas;

        canvas.addEventListener("click",function () {

            let el =  canvas;
            if(el.webkitRequestFullScreen) {
                el.webkitRequestFullScreen();
            }
            else {
                el.mozRequestFullScreen();
            }

        });
    }

    attribIni(paramsIn) {
        this.attributs[paramsIn.attribName] = {};
        this.attributs[paramsIn.attribName].name   = paramsIn.paramsInTermsToSet.attributs[paramsIn.attribName].name;
        this.attributs[paramsIn.attribName].value  =  paramsIn.paramsInTermsToSet.attributs[paramsIn.attribName].hasOwnProperty('value') ?  paramsIn.paramsInTermsToSet.attributs[paramsIn.attribName].value:0;
        this.attributs[paramsIn.attribName].values =   paramsIn.paramsInTermsToSet.attributs[paramsIn.attribName].hasOwnProperty('values') ?  paramsIn.paramsInTermsToSet.attributs[paramsIn.attribName].values:[];
        this.attributs[paramsIn.attribName].recordSize =  paramsIn.paramsInTermsToSet.attributs[paramsIn.attribName].hasOwnProperty('recordSize') ?  paramsIn.paramsInTermsToSet.attributs[paramsIn.attribName].recordSize:1;
        this.attributs[paramsIn.attribName].recordCount = this.attributs[paramsIn.attribName].values.length/this.attributs[paramsIn.attribName].recordSize;
    };

    uniformIni(paramsIn) {
        this.uniforms[paramsIn.uniformName] = {};
        this.uniforms[paramsIn.uniformName].name  = paramsIn.paramsInTermsToSet.uniforms[paramsIn.uniformName].name;
        this.uniforms[paramsIn.uniformName].value =    paramsIn.paramsInTermsToSet.uniforms[paramsIn.uniformName].hasOwnProperty('value') ?  paramsIn.paramsInTermsToSet.uniforms[paramsIn.uniformName].value:0;
        this.uniforms[paramsIn.uniformName].values =   paramsIn.paramsInTermsToSet.uniforms[paramsIn.uniformName].hasOwnProperty('values') ?  paramsIn.paramsInTermsToSet.uniforms[paramsIn.uniformName].values:[];
        this.uniforms[paramsIn.uniformName].recordSize = paramsIn.paramsInTermsToSet.uniforms[paramsIn.uniformName].hasOwnProperty('recordSize') ?  paramsIn.paramsInTermsToSet.uniforms[paramsIn.uniformName].recordSize:1;
        this.uniforms[paramsIn.uniformName].recordCount =   this.uniforms[paramsIn.uniformName].values.length/ this.uniforms[paramsIn.uniformName].recordSize;

    };

    locateAndPassAttribut4f(paramsIn) {

        this.attributs[paramsIn.attribName].obj = this.gl.getAttribLocation(this.program, this.attributs[paramsIn.attribName].name);
        if (this.attributs[paramsIn.attribName].obj  < 0) {
            console.log('Failed to get the storage  ');
            return;
        };
        let value = this.attributs[paramsIn.attribName].value;
        this.gl.vertexAttrib4f(this.attributs[paramsIn.attribName].obj, value[0], value[1], value[2], value[3]);
    };

    locateAndPassAttribut3f(paramsIn) {
        this.attributs[paramsIn.attribName].obj = this.gl.getAttribLocation(this.program, this.attributs[paramsIn.attribName].name);
        if (this.attributs[paramsIn.attribName].obj  < 0) {
            console.log('Failed to get the storage  ');
            return;
        };
        let value = this.attributs[paramsIn.attribName].value;
        this.gl.vertexAttrib3f(this.attributs[paramsIn.attribName].obj, value[0], value[1], value[2]);
    };

    locateAndPassArrayAttribut3f(paramsIn) {
        this.attributs[paramsIn.attribName].obj = this.gl.getAttribLocation(this.program, this.attributs[paramsIn.attribName].name);
        if (this.attributs[paramsIn.attribName].obj  < 0) {
            console.log('Failed to get the storage  ');
            return;
        };
        let values = this.attributs[paramsIn.attribName].values;
        let stepIndex = this.attributs[paramsIn.attribName].recordSize*paramsIn.recordIndex;
        this.gl.vertexAttrib3f(this.attributs[paramsIn.attribName].obj, values[stepIndex ], values[stepIndex+1], values[stepIndex+2]);
    };

    locateAndPassAttribut2f(paramsIn) {
        this.attributs[paramsIn.attribName].obj = this.gl.getAttribLocation(this.program, this.attributs[paramsIn.attribName].name);
        if (this.attributs[paramsIn.attribName].obj  < 0) {
            console.log('Failed to get the storage  ');
            return;
        };
        let value = this.attributs[paramsIn.attribName].value;
        this.gl.vertexAttrib2f(this.attributs[paramsIn.attribName].obj, value[0], value[1]);
    };

    locateAndPassAttribut1f(paramsIn) {
        this.attributs[paramsIn.attribName].obj = this.gl.getAttribLocation(this.program, this.attributs[paramsIn.attribName].name);
        if (this.attributs[paramsIn.attribName].obj  < 0) {
            console.log('Failed to get the storage  ');
            return;
        };
        let value = this.attributs[paramsIn.attribName].value;
        this.gl.vertexAttrib1f(this.attributs[paramsIn.attribName].obj, value);
    };

    locateAndPassArrayAttribut1f(paramsIn) {
        this.attributs[paramsIn.attribName].obj = this.gl.getAttribLocation(this.program, this.attributs[paramsIn.attribName].name);
        if (this.attributs[paramsIn.attribName].obj  < 0) {
            console.log('Failed to get the storage  ');
            return;
        };
        let values = this.attributs[paramsIn.attribName].values;
        this.gl.vertexAttrib1f(this.attributs[paramsIn.attribName].obj, values[paramsIn.recordIndex]);
    };

    locateAndPassUniform4f(paramsIn) {
        this.uniforms[paramsIn.uniformName].obj = this.gl.getUniformLocation(this.program, this.uniforms[paramsIn.uniformName].name);
        if (this.uniforms[paramsIn.uniformName].obj  < 0) {
            console.log('Failed to get the storage  ');
            return;
        };
        let value = this.uniforms[paramsIn.uniformName].value;
        this.gl.uniform4f(this.uniforms[paramsIn.uniformName].obj, value[0],value[1],value[2],value[3]);
    };

    locateAndPassArrayUniform4f(paramsIn) {
        this.uniforms[paramsIn.uniformName].obj = this.gl.getUniformLocation(this.program, this.uniforms[paramsIn.uniformName].name);
        if (this.uniforms[paramsIn.uniformName].obj  < 0) {
            console.log('Failed to get the storage  ');
            return;
        };
        let values    = this.uniforms[paramsIn.uniformName].values;
        let stepIndex = this.uniforms[paramsIn.uniformName].recordSize*paramsIn.recordIndex;
        this.gl.uniform4f(this.uniforms[paramsIn.uniformName].obj, values[stepIndex],values[stepIndex+1],values[stepIndex+2],values[stepIndex+3]);
    };
};

Ebika.ShaderProgramNBuffer                = class EbikaShaderProgram extends Ebika {
    constructor(paramsIn) {
        super();



        this.attributs                = {};
        this.uniforms                 = {};
        const contextType = 'webgl';
        this.graphic3DContext = new Ebika.Graphic3DContext({canvasId:paramsIn.canvasId, contextType:contextType }) ;
        this.graphic3DContext.ini();
        this.shadersSources   = paramsIn.shadersSources;
        this.gl       =   this.graphic3DContext.gl;
        this.canvas   =   this.graphic3DContext.canvas;

        this.vertexShader;
        this.fragmentShader;
        this.program          = this.gl.createProgram();

        function   getShader(objHolder, shadersSources,shaderSourceKey){
            let shader;
            if (shaderSourceKey == objHolder.VERTEX_SHADER) {
                shader = objHolder.gl.createShader(objHolder.gl.VERTEX_SHADER);

            }
            else if (shaderSourceKey ==  objHolder.FRAGMENT_SHADER)   {

                shader = objHolder.gl.createShader(objHolder.gl.FRAGMENT_SHADER);

            };

            objHolder.gl.shaderSource(shader,shadersSources[shaderSourceKey.toString()]);
            objHolder.gl.compileShader(shader);
            if (!objHolder.gl.getShaderParameter(shader,objHolder.gl.COMPILE_STATUS)) {
                console.error(objHolder.gl.getShaderInfoLog(shader));
                return null;
            };
            return shader;
        }

        this.ini = function () {

            this.vertexShader     =  getShader(this, this.shadersSources, this.VERTEX_SHADER );
            this.fragmentShader   =  getShader(this, this.shadersSources, this.FRAGMENT_SHADER );

            this.gl.attachShader(this.program,this.vertexShader);
            this.gl.attachShader(this.program,this.fragmentShader);
            this.gl.linkProgram(this.program);

            if (! this.gl.getProgramParameter( this.program,  this.gl.LINK_STATUS)) {
                console.error('Shaders not linked');
                return null;
            };
            this.gl.useProgram( this.program);
        }
    };

    canvasFullScreen () {
        let canvas =  this.canvas;

        canvas.addEventListener("click",function () {

            let el =  canvas;
            if(el.webkitRequestFullScreen) {
                el.webkitRequestFullScreen();
            }
            else {
                el.mozRequestFullScreen();
            }

        });
    };
}

Ebika.Random                    = class EbikaRandom  extends Ebika {

    constructor() {
        super();

        this.paramsInTest =  {
            showTests:true,
            objContainer:this.__proto__,
            range:[5,33],
            ranges:[[2,5],[-1,12],[60,60]],
            conv:[0.,1.],
            convRanges:[[0.,1.], [0.5,0.8]],
            partsCount: 10,
        };
    }

    floatValue (paramsIn) { //range

        let result;
        let valMax, valMin;
        if (paramsIn.range[0] <= paramsIn.range[1]) {
            valMin = paramsIn.range[0];
            valMax = paramsIn.range[1];
        }
        else if (paramsIn.range[0] > paramsIn.range[1]) {
            valMin = paramsIn.range[1];
            valMax = paramsIn.range[0];
        }
        result = Math.random() * ((valMax) - valMin) + new Number(valMin);
        return result;
    }

    intValue  (paramsIn)  { //range
        return   Math.round( this.floatValue(paramsIn));
    }

    floatConv (paramsIn) { //range, conv
        let result, size    = paramsIn.range[1] - paramsIn.range[0],
        pourcStartSize  =  paramsIn.conv[0] * size,
        pourcEndSize    = paramsIn.conv[1] * size,
        pourcMin, pourcMax;
        pourcMin = paramsIn.range[0] + pourcStartSize;
        pourcMax = paramsIn.range[0] + pourcEndSize;
        result = this.floatValue({range:[pourcMin,pourcMax]});
        return result;
    }

    intConv (paramsIn) { //range, conv
        let result, size    = paramsIn.range[1] - paramsIn.range[0],
            pourcStartSize  =  paramsIn.conv[0] * size,
            pourcEndSize    = paramsIn.conv[1] * size,
            pourcMin, pourcMax;
        pourcMin = paramsIn.range[0] + pourcStartSize;
        pourcMax = paramsIn.range[0] + pourcEndSize;
        result = this.intValue({range:[pourcMin,pourcMax]});
        return result;
    }

    floatPart (paramsIn) {  //ranges, convRanges
        let  result,
            intervalIndex        =   this.intConv({range:[0,paramsIn.ranges.length-1] ,     conv:[0.,1.]}),
            convRangesIndex      =   this.intConv({range:[0,paramsIn.convRanges.length-1] , conv:[0.,1.]});
                  result         =   this.floatConv({range:[
                                                      paramsIn.ranges[intervalIndex][0],
                                                      paramsIn.ranges[intervalIndex][1]
                                                     ],

                                                     conv: [
                                                      paramsIn.convRanges[convRangesIndex][0],
                                                      paramsIn.convRanges[convRangesIndex][1]
                                                    ]
                                                    });

        return result;
    }

    floatParts  (paramsIn) {  //ranges, convRanges, partsCount
        let  result = [];
        for (let partIndex = 0;partIndex<paramsIn.partsCount;partIndex++ ) {
            result.push(this.floatPart(paramsIn));
        };
        return result;
    }

    intPart (paramsIn) {  //ranges, convRanges
        let  result,
            intervalIndex        =   this.intConv({range:[0,paramsIn.ranges.length-1] ,     conv:[0.,1.]}),
            convRangesIndex      =   this.intConv({range:[0,paramsIn.convRanges.length-1] , conv:[0.,1.]});
        result         =   this.intConv({range:[
                paramsIn.ranges[intervalIndex][0],
                paramsIn.ranges[intervalIndex][1]
            ],

            conv: [
                paramsIn.convRanges[convRangesIndex][0],
                paramsIn.convRanges[convRangesIndex][1]
            ]
        });

        return result;
    }

    intParts  (paramsIn) {  //ranges, convRanges, partsCount
        let  result = [];
        for (let partIndex = 0;partIndex<paramsIn.partsCount;partIndex++ ) {
            result.push(this.intPart(paramsIn));
        }
        return result;
    }

    desc(paramsIn) {

        paramsIn.result =  {
            range :'Valeur minimum et maximun, Array, [minm,max]',
            ranges:'Ensemble de valeurs minimum et maximun, Array[Arrays], exple: [[2,5],[-1,12],[60,60]]',
            conv:'Convergence aléatoire minimun et maximum , Array,[convMin,convMax]',
            convRanges:'Ensemble de Convergences aléatoire minimun et maximum, Array[Arrays], exple: [[0.,1.], [0.5,0.8]]',
            partsCount:'Nombre d éléments aléatoires à générer'
        };

        return    paramsIn.result
    };

    classTests(paramsIn) {

        if ( paramsIn) {
            paramsIn.xceptionFunctionsName = ['constructor','tests','classTests'];
            this.tests(paramsIn);
        }
        else {
            this.tests({
                showTests:true,
                object:  this  ,
                xceptionFunctionsName:  ['constructor','tests','classTests'] ,
                range:[5,33],
                ranges:[[2,5],[-1,12],[60,60]],
                conv:[0.,1.],
                convRanges:[[0.,1.], [0.5,0.8]],
                partsCount: 10,

            });
        };

    };

};

Ebika.Vectors                   = class EbikaVectors  extends Ebika.Random  {

    constructor () {
        super();
    };

    vectorIni(paramsIn){
        let result = [];
        for(let compVectIndex = 0;compVectIndex<paramsIn.dimension;compVectIndex++ ) {
            result.push(0);
        };
        return result;
    }

    vector (paramsIn){

        let result = [];

        for(let compVectIndex = 0;compVectIndex<paramsIn.p1.length;compVectIndex++ ) {
            result.push(0);
        };

        for(let compVectIndex = 0;compVectIndex<paramsIn.p1.length;compVectIndex++ ) {
            result[compVectIndex] = paramsIn.p2[compVectIndex] - paramsIn.p1[compVectIndex];
        };

        return result;
    };

    magnitude (paramsIn){
        let result , vector = paramsIn.v, sum;
        sum = 0;
        for(let compVectIndex = 0;compVectIndex<vector.length;compVectIndex++ ) {
            sum += Math.pow(vector[compVectIndex],2);
        };
        return Math.sqrt(sum);
    };

    getPolesCount (paramsIn){
        return  paramsIn.poles.length  / paramsIn.dimension
    };

    polesMerge (paramsIn){

        let polesA =  paramsIn.polesA,  polesB =  paramsIn.polesB;

        for(let polesBEltIndex = 0;polesBEltIndex<polesB.length;polesBEltIndex++ ) {
            polesA.push(polesB[polesBEltIndex ]);
        };

        return polesA;
    };

    polesCenter (paramsIn){
        let result = [] , poles = paramsIn.poles, dimension = paramsIn.dimension, polesCount = this.getPolesCount(paramsIn);
        //init center
        for(let compVectIndex = 0;compVectIndex<polesCount;compVectIndex++ ) {
            result.push(0);
        };

        for(let poleIndex = 0;poleIndex <polesCount;poleIndex ++ ) {

            let  pole =   this.vectorFromMatrix({
                dimension : dimension,
                matrix : poles,
                vectorPosition: poleIndex ,
            });

            for(let compVectIndex = 0;compVectIndex<polesCount;compVectIndex++ ) {
                result[compVectIndex]+= pole[compVectIndex];
            };

        };

        for(let compVectIndex = 0;compVectIndex<polesCount;compVectIndex++ ) {
            result[compVectIndex] = result[compVectIndex]/polesCount;
        };

        return  result;
    };

    distance (paramsIn){
        let result , vector, sum;
        vector = this.vector(paramsIn);
        result = this.magnitude({v:vector});
        return result ;
    };

    unitVector (paramsIn) {
        let result = [];
        let magnitude = this.magnitude(paramsIn);
        for(let compVectIndex = 0;compVectIndex<paramsIn.v.length;compVectIndex++ ) {
            result.push( paramsIn.v[compVectIndex]/magnitude);
        };
        return result;
    };

    vectorNormalized(paramsIn) {
        return this.unitVector(paramsIn);
    };

    oppositeVectors (paramsIn){

        let result = [];

        for(let compVectIndex = 0;compVectIndex<paramsIn.v.length;compVectIndex++ ) {
            result.push(-1* paramsIn.v[compVectIndex]);
        };

        return result;
    };

    addVectors (paramsIn){

        let result = [];

        for(let compVectIndex = 0;compVectIndex<paramsIn.v1.length;compVectIndex++ ) {
            result.push( paramsIn.v1[compVectIndex] + paramsIn.v2[compVectIndex]);
        };

        return result;
    };

    substractVectors (paramsIn){

        let result = [];

        for(let compVectIndex = 0;compVectIndex<paramsIn.v1.length;compVectIndex++ ) {
            result.push( paramsIn.v1[compVectIndex] - paramsIn.v2[compVectIndex]);
        };

        return result;
    };

    scaleVectorWithVector(paramsIn){

        let result = [];

        for(let compVectIndex = 0;compVectIndex<paramsIn.v.length;compVectIndex++ ) {
            result.push( paramsIn.vectorScalars[compVectIndex]*paramsIn.v[compVectIndex]);
        };

        return result;
    };

    scalePolesWithVector(paramsIn){

        let result= [],pole;

        for(let poleIndex = 0;poleIndex<paramsIn.poles.length;poleIndex+=paramsIn.dimension ) {
            pole = [];

            for(let compVectIndex = 0;compVectIndex<paramsIn.dimension;compVectIndex++ ) {
                pole.push( paramsIn.poles[poleIndex+compVectIndex ]);
            };

            let midresult = this.scaleVectorWithVector({
               v:  pole, vectorScalars: paramsIn.vectorScalars
            });

            for(let compVectIndex = 0;compVectIndex<paramsIn.dimension;compVectIndex++ ) {
                result.push( midresult[compVectIndex ]);
            };
        }

        return result;
    };

    scaleVectorWithScalar(paramsIn){

        let vectorScalars = [];

        for(let compVectIndex = 0;compVectIndex<paramsIn.v.length;compVectIndex++ ) {
            vectorScalars.push(paramsIn.scalar);
        };

        return  this.scaleVectorWithVector({vectorScalars:vectorScalars,v:paramsIn.v});

    };

    scalePolesWithScalar(paramsIn){

        let result= [],pole;

        for(let poleIndex = 0;poleIndex<paramsIn.poles.length;poleIndex+=paramsIn.dimension ) {
            pole = [];

            for(let compVectIndex = 0;compVectIndex<paramsIn.dimension;compVectIndex++ ) {
                pole.push( paramsIn.poles[poleIndex+compVectIndex ]);
            };

            let midresult = this.scaleVectorWithScalar({
                v:  pole, scalar: paramsIn.scalar
            });

            for(let compVectIndex = 0;compVectIndex<paramsIn.dimension;compVectIndex++ ) {
                result.push( midresult[compVectIndex ]);
            };
        }

        return result;
    };

    componentsSum(paramsIn) {
        let sum = 0;
        for(let componentIndex =0;componentIndex<paramsIn.v.length;componentIndex++) {
           sum+= paramsIn.v[componentIndex ];
        };
        return sum;
    };

    dotProduct(paramsIn) {
       let vectorScaled = this.scaleVectorWithVector({v:paramsIn.v1, vectorScalars:paramsIn.v2});
       return             this.componentsSum({v:vectorScaled});
    };

    crossProduct(paramsIn) {
        let a = {}, b ={};
        a.x  =  paramsIn.v1[0];    a.y  =  paramsIn.v1[1];  a.z  =  paramsIn.v1[2];
        b.x  =  paramsIn.v2[0];    b.y  =  paramsIn.v2[1];  b.z  =  paramsIn.v2[2];
        let result ;
        if (paramsIn.v1.length == 3) {

            result = [(a.y*b.z - a.z*b.y),(a.z*b.x - a.x*b.z), a.x*b.y - a.y*b.x  ];

        } else {
            result ='Dimension <> 3!'
        };

        return   result;
    };

    crossProductNormalized(paramsIn) {
       let vector =  this.crossProduct(paramsIn);
       return  this.vectorNormalized({v:vector});
    };

    ortho3DLeft (paramsIn) {
       return [-paramsIn.v[1],paramsIn.v[0],0];
    };

    ortho3DRight (paramsIn) {
        return [paramsIn.v[1],-paramsIn.v[0],0];
    };

    basis3DFromVector(paramsIn) {

        let v1 = paramsIn.v,
            v2 =  this.ortho3DLeft({v:paramsIn.v});
        return [v1,v2, this.crossProduct({v1:v1,v2:v2})  ];

    };

    basis3DFromVectorNormalize(paramsIn) {
        let basis = this.basis3DFromVector(paramsIn);
        return  [this.vectorNormalized({v:basis[0]}),this.vectorNormalized({v:basis[1]}),this.vectorNormalized({v:basis[2]})]
    };




    vectorFromMatrix (paramsIn) {

        let index  = paramsIn.vectorPosition*paramsIn.dimension;
        let vector = [];

         for(let componentsIndex =0;componentsIndex<paramsIn.dimension;componentsIndex++) {
             vector.push(paramsIn.matrix[index+componentsIndex]);
         }

        return vector;
    };

    linearCombination (paramsIn) {

        let vectorResult = [];
        for(let vectorComponent = 0;vectorComponent<paramsIn.v.length;vectorComponent++){
            vectorResult.push(0);
        };

        for(let vectorComponent = 0;vectorComponent<paramsIn.v.length;vectorComponent++){

           let scaledVector     = this.scaleVectorWithScalar({scalar:paramsIn.v[vectorComponent],
                                                               v:this.vectorFromMatrix({matrix:paramsIn.matrix,vectorPosition:vectorComponent,
                                                                                     dimension:paramsIn.dimension})})

            vectorResult        = this.addVectors({v1: vectorResult,v2:scaledVector});

        };
        return vectorResult;
    };

    polesDistances (paramsIn){

        let insideObj = {
            poles: []  ,
            dimension:  3,
            polesLocations   : [] ,
            polesVectors    : [] ,
            polesMagnitudes : [] ,
            polesCumulativeMagnitudes:[],
            polesCumulativeProportions:[],
            iniParamsIn: function () {
                this.poles = paramsIn.poles ||  [

                    2,    15 ,   8,

                    5,     9,    12,

                    6,    21,   17 ,

                    -2,    0,   13
                ];

                this.dimension = paramsIn.dimension || 3
            }   ,

            iniMatrices : function(obj) {

                let cumulativeMagnitude = 0;
                this.polesLocations.push([]);
                this.polesVectors.push([]);
                this.polesMagnitudes.push(0);
                this.polesCumulativeMagnitudes.push(0);
                for(let compIndex =0;compIndex<this.dimension;compIndex++) {
                    this.polesLocations[this.polesLocations.length-1].push(this.poles[compIndex]);
                    this.polesVectors[this.polesVectors.length-1].push(0);
                };

                for(let poleIndex = this.dimension ;poleIndex<(this.poles.length);poleIndex+=this.dimension) {
                    this.polesLocations.push([]);
                    for(let compIndex =0;compIndex<this.dimension;compIndex++) {
                        this.polesLocations[this.polesLocations.length-1].push(this.poles[poleIndex+compIndex]);
                    };

                    this.polesVectors.push( obj.vector({p1:this.polesLocations[this.polesLocations.length-2],p2:this.polesLocations[this.polesLocations.length-1]}));
                    let magnitude = obj.magnitude({v:this.polesVectors[this.polesVectors.length-1]});
                    cumulativeMagnitude+=magnitude;
                    this.polesMagnitudes.push(magnitude);
                    this.polesCumulativeMagnitudes.push(cumulativeMagnitude);
                }

            }   ,

            assignCumulativeProportions : function() {

                if (this.polesCumulativeMagnitudes[this.polesCumulativeMagnitudes.length-1] == 0) {
                    for(let poleIndex = 0 ;poleIndex<this.polesCumulativeMagnitudes.length;poleIndex++) {
                        this.polesCumulativeProportions.push(0);
                    };
                } else {
                    for(let poleIndex = 0 ;poleIndex<this.polesCumulativeMagnitudes.length;poleIndex++) {
                        this.polesCumulativeProportions.push(this.polesCumulativeMagnitudes[poleIndex]/this.polesCumulativeMagnitudes[this.polesCumulativeMagnitudes.length-1]);
                    };
                }

            }   ,

            run : function () {
                return {polesLocations:this.polesLocations,polesMagnitudes:this.polesMagnitudes, polesVectors: this.polesVectors,polesCumulativeMagnitudes: this.polesCumulativeMagnitudes,polesCumulativeProportions: this.polesCumulativeProportions};
            }

        };

        insideObj.iniParamsIn();
        insideObj.iniMatrices(this);
        insideObj.assignCumulativeProportions();
        return  insideObj.run();
    }

    toDegrees (paramsIn) {

        return  paramsIn.radians * (180/Math.PI);

    };

    toRadians (paramsIn) {

        return  paramsIn.degrees * (Math.PI /180);

    };
    polesDistances (paramsIn){

        let insideObj = {
            poles: []  ,
            dimension:  3,
            polesLocations   : [] ,
            polesVectors    : [] ,
            polesMagnitudes : [] ,
            polesCumulativeMagnitudes:[],
            polesCumulativeProportions:[],
            iniParamsIn: function () {
                this.poles = paramsIn.poles ||  [

                    2,    15 ,   8,

                    5,     9,    12,

                    6,    21,   17 ,

                    -2,    0,   13
                ];

                this.dimension = paramsIn.dimension || 3
            }   ,

            iniMatrices : function(obj) {

                let cumulativeMagnitude = 0;
                this.polesLocations.push([]);
                this.polesVectors.push([]);
                this.polesMagnitudes.push(0);
                this.polesCumulativeMagnitudes.push(0);
                for(let compIndex =0;compIndex<this.dimension;compIndex++) {
                    this.polesLocations[this.polesLocations.length-1].push(this.poles[compIndex]);
                    this.polesVectors[this.polesVectors.length-1].push(0);
                };

                for(let poleIndex = this.dimension ;poleIndex<(this.poles.length);poleIndex+=this.dimension) {
                    this.polesLocations.push([]);
                    for(let compIndex =0;compIndex<this.dimension;compIndex++) {
                        this.polesLocations[this.polesLocations.length-1].push(this.poles[poleIndex+compIndex]);
                    };

                    this.polesVectors.push( obj.vector({p1:this.polesLocations[this.polesLocations.length-2],p2:this.polesLocations[this.polesLocations.length-1]}));
                    let magnitude = obj.magnitude({v:this.polesVectors[this.polesVectors.length-1]});
                    cumulativeMagnitude+=magnitude;
                    this.polesMagnitudes.push(magnitude);
                    this.polesCumulativeMagnitudes.push(cumulativeMagnitude);
                }

            }   ,

            assignCumulativeProportions : function() {

                if (this.polesCumulativeMagnitudes[this.polesCumulativeMagnitudes.length-1] == 0) {
                    for(let poleIndex = 0 ;poleIndex<this.polesCumulativeMagnitudes.length;poleIndex++) {
                        this.polesCumulativeProportions.push(0);
                    };
                } else {
                    for(let poleIndex = 0 ;poleIndex<this.polesCumulativeMagnitudes.length;poleIndex++) {
                        this.polesCumulativeProportions.push(this.polesCumulativeMagnitudes[poleIndex]/this.polesCumulativeMagnitudes[this.polesCumulativeMagnitudes.length-1]);
                    };
                }



            }   ,

            run : function () {
                return {polesLocations:this.polesLocations,polesMagnitudes:this.polesMagnitudes, polesVectors: this.polesVectors,polesCumulativeMagnitudes: this.polesCumulativeMagnitudes,polesCumulativeProportions: this.polesCumulativeProportions};
            }


        };
        insideObj.iniParamsIn();
        insideObj.iniMatrices(this);
        insideObj.assignCumulativeProportions();
        return  insideObj.run();
    };
    isV1V2Equals (paramsIn) {
        let  isEqual = true;
        let  componentIndex = 0;
        while ((isEqual)&&(componentIndex<paramsIn.v1.length)) {

            if (paramsIn.v1[componentIndex]!==paramsIn.v2[componentIndex]) {
                isEqual = false;
            }

            componentIndex++;
        }

        return isEqual;
    };

    vectorShadow (paramsIn) { // Projection Orthogonale
        let vProjected         = paramsIn.v1,
            isProjectedUp      =  true,
            comment='v1:vProjected, v2:vFloor',
            vFloor             = paramsIn.v2,
            vShadow            = this.scaleVectorWithScalar({v:vFloor,scalar:this.dotProduct({v1:vProjected,v2:vFloor})/ this.dotProduct({v1:vFloor,v2:vFloor})}),
            vShadOr            = this.substractVectors({v1:vProjected,v2: vShadow}),
            isProjectedAndFloorEqual  = this.isV1V2Equals({v1:vProjected,v2:vFloor}),
            dotProduct          = this.dotProduct({v1:vProjected ,v2:vFloor}),
            cosAngle            = dotProduct/(this.magnitude({v:vProjected})*this.magnitude({v:vFloor})),
            radians             = Math.acos(cosAngle),
            degrees             = this.toDegrees({radians:radians  });
            isProjectedUp      = vShadOr[1]>0? 1: vShadOr[1]<0? -1 : 0;

        return {vProjected, vFloor ,vShadow, vShadOr,dotProduct,cosAngle,radians ,degrees  , isProjectedUp, isProjectedAndFloorEqual,comment};
    };


    turnInto2DBasis(paramsIn) {
        let basis = [this.vector({p1:paramsIn.triangle[1],p2:paramsIn.triangle[2]}),
                       this.vector({p1:paramsIn.triangle[1],p2:paramsIn.triangle[0]}) ];

        return  this.mergeArrays({matA:basis[0],matB:basis[1]}) ;
    };


    classTests(paramsIn) {

        if ( paramsIn) {
            paramsIn.xceptionFunctionsName = ['constructor','tests','classTests'];
            this.tests(paramsIn);
        }
        else {
            this.tests({
                showTests:true,
                object:  this  ,
                xceptionFunctionsName:  ['constructor','tests','classTests'] ,
                v1: [1,1,0],
                v2: [0,2,0],
                p1: [2,2],
                p2: [-2,-3],
                v:[1,4,7],
                position : [0.8,0.7,0],
                triangle: [[-1,0,0],[1,0,0],[0,1,0]],
                matrix:[3,7,12,5,8,15,6,9,12],
                vectorPosition:2,
                vectorScalars: [0.4,0.3,4],
                scalar:0.6,
                radians: Math.PI/2,
                degrees: 180,
                poles:[

                    2,    15 ,   8,

                    5,     9,    12,

                    6,    21,   17 ,

                    -2,    0,   13
                ] ,
                polesA : [

                2,    15 ,   8,

                5,     9,    12,

                6,    21,   17 ,

                -2,    0,   13
              ] ,
             polesB : [

                5,     9,    12,

                6,    21,   17 ,
                ,1,    1,     1

             ] ,

                dimension:3,

            });
        };

    };

};

Ebika.Matrices                  = class EbikaMatrices  extends Ebika.Vectors  {

    constructor () {
        super();
    };
    matMultiplication (paramsIn) {
          let insideObj = {
              multiplication: function(obj) {
                  let result = [];
                  for(let vectorIndex = 0;vectorIndex<(paramsIn.matB.length/paramsIn.dimension);vectorIndex++) {
                      let linComb = obj.linearCombination( {matrix:paramsIn.matA,
                                                          dimension: paramsIn.dimension,
                                                          v:obj.vectorFromMatrix({ matrix:paramsIn.matB,
                                                                            vectorPosition:vectorIndex,
                                                                            dimension: paramsIn.dimension } )
                          });

                     for(let comb=0;comb <linComb.length;comb++) {
                         result.push(linComb[comb]);
                     };
                  };
                  return result;
              }
          };
          return  insideObj.multiplication(this);
    };

    bundleMultiplication (paramsIn) {
        let initialIndex = 0;
        let currentIndex = 1;
        let matA  =  paramsIn.matrices[initialIndex ];

        while (currentIndex < paramsIn.matrices.length) {
            let matB  =  paramsIn.matrices[currentIndex ];
            matA =  this.matMultiplication({dimension:paramsIn.dimension, matA:matA , matB: matB });
            currentIndex++;
        };
        return  matA;
     };

    matIdentity (paramsIn) {

        let result = [1];

        for (let basisVectorIndex = 0;basisVectorIndex<paramsIn.dimension-1;basisVectorIndex++) {
            for (let vectorComponentIndex = 0;vectorComponentIndex <paramsIn.dimension;vectorComponentIndex ++) {
                result.push(0);
            };
            result.push(1);
        };

        return result;
    };
    matScale(paramsIn) {
        let scaledMat = [];
        for(let eltIndex =0;eltIndex<paramsIn.mat.length;eltIndex++) {
            scaledMat.push(paramsIn.scalar*paramsIn.mat[eltIndex] );
        };
        return scaledMat;
    };
    matRowCol (paramsIn) {
        return [paramsIn.index % paramsIn.dimension ,Math.floor(paramsIn.index/paramsIn.dimension)];
    };
    matIndex (paramsIn) {
        return  (paramsIn.col)*paramsIn.dimension + paramsIn.row;
    };
    matTransposed(paramsIn){
        let result = [];
        for(let row= 0;row<paramsIn.dimension; row++ ){
            for(let col= 0;col<paramsIn.dimension; col++ ){
              let index =  this.matIndex({ dimension:paramsIn.dimension, row:row, col:col  });
                result.push(paramsIn.mat[index ]) ;
            };
        };
        return result;
    };
    matMinorsRowCol(paramsIn) {
        let insideObj = {
            matrixReduced : []  ,
            subRowsAndColumns : function (rowXception, colXception) {
                let result = [[],[]];
                for(let squarIndex=0;squarIndex<paramsIn.dimension;squarIndex++){
                    if (squarIndex!= rowXception) {
                        result[0].push(squarIndex);
                    };

                    if (squarIndex!= colXception) {
                        result[1].push(squarIndex);
                    };
                };
                return result;
            }   ,

            loadSubMatrix(obj) {
                let row = paramsIn.row,
                    col = paramsIn.col,
                    mat = paramsIn.mat,
                    dimension= paramsIn.dimension,
                    subMatrixReduced   = [],
                    subIndices = this.subRowsAndColumns(row,col);
                for(let col = 0;col<subIndices[1].length;col++){
                    for(let row = 0;row<subIndices[0].length;row++){
                        let index = obj.matIndex ({dimension:dimension, row:subIndices[0][row],col:subIndices[1][col]})
                        subMatrixReduced.push(mat[index]);

                    };
                };

                return subMatrixReduced
            }

        };

        return insideObj.loadSubMatrix(this);

    };
    matMinors(paramsIn) {
        let mat    = paramsIn.mat,
            dim    = paramsIn.dimension,
            result = [];
        for(let col = 0;col< dim;col++){
             for(let row = 0;row< dim;row++){
                result.push(this.matMinorsRowCol({row:row, col:col, dimension: dim, mat: mat  }));
            };
        };
        return   result;
    };
    matHeaderMinors(paramsIn) {
        let mat    = paramsIn.mat,
            dim    = paramsIn.dimension,
            result = [];
            for(let col = 0;col< dim;col++){
                result.push(this.matMinorsRowCol({row:0, col:col, dimension: dim, mat: mat  }));
            };
        return   result;
    };
    matSignedRowCol (paramsIn) {
        return Math.pow(-1,paramsIn.row+paramsIn.col );
    };
    matSigned (paramsIn) {
       let result = [];
        for(let matEltIndex = 0;matEltIndex<paramsIn.mat.length;matEltIndex ++) {
            let rowCol =   this.matRowCol({index:matEltIndex ,dimension:paramsIn.dimension  });
            result.push(  this.matSignedRowCol({row:rowCol[0], col: rowCol[1] })  );
        };
        return result;
    };
    matCofactorRowCol (paramsIn) {
        let index =   this.matIndex({dimension:paramsIn.dimension,col:paramsIn.col, row: paramsIn.row});
        return this.matSignedRowCol({row:paramsIn.row, col: paramsIn.col })*paramsIn.mat[index];
    };
    matHeaderCofactors (paramsIn) {
        let result = [];
        for(let col = 0;col<paramsIn.dimension ;col ++) {
            result.push(this.matCofactorRowCol ({dimension:paramsIn.dimension, row:0, col: col, mat: paramsIn.mat }));
        };
        return result;
    };
    matCofactors (paramsIn) {
        let result = [];
        for(let matEltIndex = 0;matEltIndex<paramsIn.mat.length;matEltIndex ++) {
            let rowCol =   this.matRowCol({index:matEltIndex ,dimension:paramsIn.dimension  });
            result.push(this.matCofactorRowCol ({dimension:paramsIn.dimension, row:rowCol[0], col: rowCol[1], mat: paramsIn.mat }));
        };
        return result;
    };
    determinant(paramsIn) {
       let  mat = paramsIn.mat, dimension =  paramsIn.dimension,
       subObj = {
            det: function (obj,mat,dim) {
                let sum = 0,
                headerMinors       =  obj.matHeaderMinors({mat:mat, dimension:dim }) ,
                headerCofactors    =  obj.matHeaderCofactors({mat:mat, dimension:dim });
                for (let headCofactorsIndex =0;headCofactorsIndex<headerCofactors.length;headCofactorsIndex++) {
                     if ( headerCofactors.length ==2) {
                         sum +=   headerCofactors[headCofactorsIndex]*  headerMinors[headCofactorsIndex][0];
                     } else if (  headerCofactors.length >2) {
                        sum +=    headerCofactors[headCofactorsIndex]* this.det(obj,  headerMinors[headCofactorsIndex], Math.sqrt(  headerMinors[headCofactorsIndex].length  ));
                     }
                };
               return sum;
            } ,
        };
      return   subObj.det(this,mat,dimension);
    };
    matMinorsDeterminants(paramsIn) {

        let minors = this.matMinors(paramsIn), minorsDeterminant = [];
        for( let minorEltIndex = 0; minorEltIndex<minors.length; minorEltIndex++){
            let rowCol = this.matRowCol({index:minorEltIndex, dimension:paramsIn.dimension  });
            minorsDeterminant.push(  this.matSignedRowCol({row:rowCol[0],col:rowCol[1]})*this.determinant({mat:minors[ minorEltIndex],
                                                                                                    dimension:Math.sqrt( minors[ minorEltIndex].length) }));
        };
        return minorsDeterminant;
    };
    matAdjugate(paramsIn) {
        let minorsDeterminants  =   this.matMinorsDeterminants(paramsIn);
        let transposed          =   this.matTransposed({mat: minorsDeterminants, dimension: paramsIn.dimension});
        return  transposed ;
    };
    matAdjoint(paramsIn) {
        return  this.matAdjugate(paramsIn);
    };
    matInverse(paramsIn) {
        let  result;
        let  det      = this.determinant(paramsIn);
        if(paramsIn.dimension==2) {
            if (det!=0) {
                result = [(1/det)*paramsIn.mat[3],(-1/det)*paramsIn.mat[1],(-1/det)*paramsIn.mat[2],(1/det)*paramsIn.mat[0]];
            } else  {
                result =0;
            };
        } else if(paramsIn.dimension>2)  {
            let  adjugate = this.matAdjugate(paramsIn);
            if (det!=0) {
                result = this.matScale({scalar:1/det, mat :adjugate   });
            } else  {
                result =0;
            };
        }

       return result;
    };
    linearEquation(paramsIn) {
        let   result,
            inverse = this.matInverse({mat:paramsIn.mat,dimension:paramsIn.dimension });
            //console.log('inverse,inverse,inverse,inverse', inverse);
        if (inverse !=0) {
            result = this.matMultiplication({matA:inverse, matB:paramsIn.vector, dimension:paramsIn.dimension });
        } else {
            result = "Pas de solutions";
        };
        return   result;
    };
    whereIsLocationOnPlane(paramsIn) {
       let basis =  this.turnInto2DBasis(paramsIn),
       locationVector = this.vector({p1:paramsIn.triangle[1], p2:paramsIn.location  }),
       LocationOnBasis  =  this.linearEquation({mat: basis, vector: locationVector, dimension: paramsIn.dimension  });
       return [LocationOnBasis,  locationVector,  basis  ];
    };
    isItInsideTriangle(paramsIn) {

        let subObj = {
            getBasisAndLocalVector : function (obj,locOrigin, locRight, locLeft, location) {
                return [ obj.vector({p1:locOrigin,p2:locRight}),obj.vector({p1:locOrigin,p2:locLeft}),obj.vector({p1:locOrigin,p2: location})]
            } ,

            assignThreeBasis: function (obj) {

                return [this.getBasisAndLocalVector(obj,paramsIn.triangle[0],paramsIn.triangle[1],paramsIn.triangle[2],paramsIn.location ),
                        this.getBasisAndLocalVector(obj,paramsIn.triangle[1],paramsIn.triangle[2],paramsIn.triangle[0],paramsIn.location ),
                        this.getBasisAndLocalVector(obj,paramsIn.triangle[2],paramsIn.triangle[0],paramsIn.triangle[1],paramsIn.location ),
                ];

            }   ,


        };

    };
    matInverseTest(paramsIn) {
        let mat  = [-1,1,-2,  2,2,8,  5,3,10 ], dim = 3;
        return    this.matInverse({mat:mat, dimension: dim});
    };
    classTests(paramsIn) {
        if ( paramsIn) {
            paramsIn.xceptionFunctionsName = ['constructor','tests','classTests'];
            this.tests(paramsIn);
        }
        else {
            this.tests({
                showTests:true,
                object:  this  ,
                xceptionFunctionsName:  ['constructor','tests','classTests'] ,
                matA :[1,2,3,12,1,7,14,18,5],
                matB :[4,8,9,21,6,3,2,4,8,1,2,3,4,8,9],
                mat  : [6, 4, 2, 1,-2,8,1,5,7],
                vector: [1,0.3,4],
                triangle:[[-1,0],[1,0],[0,1]],
                location: [0,0.5],
                matrices: [[1,2,0,3],[-5,6,0,3],[1,0,0,1], [-1,2,1.1,3]],
                dimension:2,
                index: 13,
                row: 2,
                col:0,
                scalar:1.2

            });
        };
    };
};

Ebika.Matrix4                   = class EbikaMatrix4  extends Ebika.Matrices {
    constructor() {
        super();
        let dimension = 4;
        this.setIdentity();
    };
    setIdentity() {
        this.matrix = this.matIdentity ({dimension:    this.DIMENSION4 });
        return  this.matrix.slice();
    };

    setMatrix(paramsIn) {
        if (paramsIn.matrix.length !==16) {
            return
        } else {
            this.matrix = paramsIn.matrix.slice();
        };
        return  this.matrix.slice();
    };

    setTranslation(paramsIn) {
        this.matrix = [ 1,0,0,0,
                 0,1,0,0,
                 0,0,1,0,
            paramsIn.location[0],paramsIn.location[1],paramsIn.location[2],1,
        ];

        return this.matrix;
    };

    setScale(paramsIn) {
        this.matrix = [ paramsIn.scale[0],0,0,0,
            0,paramsIn.scale[1],0,0,
            0,0,paramsIn.scale[2],0,
            0,0,0,1,
        ];
        return this.matrix;
    };
    setXrotation(paramsIn) {
        this.matrix = [
            1,0,0,0,
            0, Math.cos(paramsIn.angle),Math.sin(paramsIn.angle),0,
            0, -Math.sin(paramsIn.angle),Math.cos(paramsIn.angle),0,
            0,0,0,1,
        ];
        return this.matrix;
    };

    setYrotation(paramsIn) {
        this.matrix = [
            Math.cos(paramsIn.angle),0,-Math.sin(paramsIn.angle),0,
            0,1,0,0,
            Math.sin(paramsIn.angle),0,Math.cos(paramsIn.angle),0,
            0,0,0,1,
        ];
        return this.matrix;
    };

    setZrotation(paramsIn) {
        return [ Math.cos(paramsIn.angle),Math.sin(paramsIn.angle),0,0,
            -Math.sin(paramsIn.angle),Math.cos(paramsIn.angle),0,0,
            0,0,1,0,
            0,0,0,1,
        ];
        return this.matrix;
    };

    setXYZrotation(paramsIn) {
        return [ Math.cos(paramsIn.angleZ)*Math.cos(paramsIn.angleY),
               Math.sin(paramsIn.angleZ)*Math.cos(paramsIn.angleY),
               -Math.sin(paramsIn.angleY),
                0,

                Math.cos(paramsIn.angleZ)*Math.sin(paramsIn.angleY)*Math.sin(paramsIn.angleX)- Math.sin(paramsIn.angleZ)*Math.cos(paramsIn.angleX),
                Math.cos(paramsIn.angleZ)*Math.sin(paramsIn.angleY)*Math.sin(paramsIn.angleX)+Math.sin(paramsIn.angleZ)*Math.cos(paramsIn.angleX),
                Math.cos(paramsIn.angleY)*Math.sin(paramsIn.angleX),
                0,

                Math.cos(paramsIn.angleZ)*Math.sin(paramsIn.angleY)*Math.cos(paramsIn.angleX)+ Math.sin(paramsIn.angleZ)*Math.sin(paramsIn.angleX),
                Math.cos(paramsIn.angleZ)*Math.sin(paramsIn.angleY)*Math.cos(paramsIn.angleX)- Math.cos(paramsIn.angleZ)*Math.sin(paramsIn.angleX),
                Math.cos(paramsIn.angleY)*Math.cos(paramsIn.angleX),
                0,

                0,0,0,1,
        ];
        return this.matrix;
    };

    setBundle(paramsIn) {
        this.matrix =  this.bundleMultiplication({matrices: paramsIn.matrices, dimension: this.DIMENSION4 });
        return this.matrix;
    };

    setBundle3D(paramsIn) {
        return this.bundleMultiplication({matrices:
                [[0,1,0, -1,0,0, 0,0,1], [0,0,-1,  0, 1, 0,  1,0,0], [1,0,0, 0,0,1,  0,-1,0]],
            dimension: 3});
    };

    setEulerRoation(paramsIn) {
       return  this.bundleMultiplication({matrices: [this.setXrotation({angle:paramsIn.angleX}),
                                                               this.setYrotation({angle:paramsIn.angleY}),
                                                               this.setZrotation({angle:paramsIn.angleZ}) ], dimension: this.DIMENSION4 });
    };

    translate(paramsIn) {
        return this.matMultiplication({dimension:this.DIMENSION4, matA:this.matrix,matB:paramsIn.pole })
    };



    process() {

     let description =` 
       I  - FINALITÉS
       I-1 Sommaire d'intention
           les fonctions usuelles des matrices dans le traitement graphique 3D
       I-2 Détail d'intention: Implémenter les méthode suivantes
       I-2.1  setIdentity
       I-2.2  setMatrix
       I-2.3  setTranslation 
       I-2.4  setScale
       I-2.5  setXrotation
       I-2.5  setYrotation
       I-2.6  setZrotation
       I-2.7 setBundle
       I-2.8  translate
       
        
       II- PROCÉDÉS: PRÉ-REQUIS, OPÉRATIONS, STRUCTURES ET PROCESSUS.
       II-1 Importer les méthodes générales de Ebika.Matrices

       III- RÉSULTATS
       III-1 Publier les fonctions usuelles des matrices dans le traitement graphique 3D
             `
        return  description;

    };

    doTests(paramsIn) {
        if ( paramsIn) {
            paramsIn.xceptionFunctionsName = ['constructor','tests','doTests'];
            this.tests(paramsIn);
        }
        else {
            this.tests({
                showTests:false,
                object:  this  ,
                matrix: [ 0,1,2,3,
                        4,5,6,7,
                        8,9,10,11,
                        12,13,14,15
                ] ,
                matrices: [
                    [ 0,1,2,3,
                        4,5,6,7,
                        8,9,10,11,
                        12,13,14,15
                    ] ,
                    [ 1,0,0,0,
                       0,1,0,0,
                       0,0,1,0,
                       0,0,0,1
                    ] ,
                    [ 2,0,0,0,
                        0,-1,0,0,
                        0,3,1,0,
                        0,2,0,1
                    ] ,
                    [ 2,0,5,0,
                        5,-1,0,0,
                        0,3,1,0,
                        0,2,4,1
                    ] ,
                ] ,
                location: [1.3,4,7],
                scale:[0.3,0.5,2],
                angle: Math.PI/4,
                pole: [1,1,1,1],
                angleX:Math.PI/4,
                angleY:0,
                angleZ:0,
            });
        };
    };

};
Ebika.CurveInfo                 = class EbikaCurveInfo   extends  Ebika.Matrices  {
    constructor(paramsIn) {
        super( );
        this.SECTION_PREV = "previous";
        this.SECTION_NEXT = "next";
    };

    getInfo(paramsIn) {

        const dimension  = 3 ;
        let  poleIndexMax;
        let  nestedObj    = {
            structure : {},
            result   : {}
        };

        if (paramsIn) {
            this.poles = paramsIn.hasOwnProperty("poles") ? paramsIn.poles : [
                -0.91 ,   -0.91,   0,
                -0.63 ,   -0.8,   0,
                -0.5 ,    -0.5,   0,
            ];

            this.scalingFactorRanges      =  paramsIn.hasOwnProperty("scalingFactorRanges") ? paramsIn.scalingFactorRanges : [[0.03, 0.0811 ],[0.091, 0.1 ] ];
            this.scalingFactorConvRanges  =  paramsIn.hasOwnProperty("scalingFactorConvRanges") ? paramsIn.scalingFactorConvRanges: [[0.1,0.4],[0.5, 0.8 ] ];

        } else {
            this.poles = [
                -0.91 ,   -0.91,   0,
                -0.63 ,   -0.8,   0,
                -0.5 ,    -0.5,   0,
            ];

            this.scalingFactorRanges       =  [[0.03, 0.0811 ],[0.091, 0.1 ] ];
            thia.scalingFactorConvRanges   =  [[0.1,0.4],[0.5, 0.8 ] ];
        };

        nestedObj.structureIni  =function (paramsIn) {
            poleIndexMax   = paramsIn.ownerObj.poles.length/ dimension;
        }  ;

        nestedObj.getLocalPosition =function (paramsIn ) {
            let owner                               =  paramsIn.ownerObj;
            let position;
            let orthoRight                          =  this.structure[paramsIn.sectionName].opposite.orthoRightVector;
            let opposite                            =  this.structure[paramsIn.sectionName].opposite.vector;
            let nextVector                          =  this.structure[paramsIn.sectionNextName].vector;
            this.result.basis                       =  [ orthoRight[0], orthoRight[1] ,
                opposite[0], opposite[1] ,
            ]
            position                    = owner.linearEquation({
                dimension:dimension-1,
                mat:this.result.basis ,
                vector : [nextVector[0], nextVector[1]]
            });

            return position

        };


        nestedObj.getRegion = function (paramsIn) {
            let owner                =  paramsIn.ownerObj;
            let region               = owner.REGION_NOTHING;

            if   ((paramsIn.position[0] ==0 )&& (paramsIn.position[1] ==0 )){
                region  = owner.REGION_ORIGIN;
            }
            else if   ((paramsIn.position[0] >0 )&& (paramsIn.position[1] ==0 )){
                region  = owner.REGION_POSITIVE_X
            }
            else if   ((paramsIn.position[0] < 0 )&& (paramsIn.position[1] ==0 )){
                region  = owner.REGION_NEGATIVE_X
            }
            else if   ((paramsIn.position[0] ==0 )&& (paramsIn.position[1] >0 )){
                region  = owner.REGION_POSITIVE_Y
            }
            else if   ((paramsIn.position[0] ==0 )&& (paramsIn.position[1] <0 )){
                region  = owner.REGION_NEGATIVE_Y
            }
            else if   ((paramsIn.position[0] >0 )&& (paramsIn.position[1] > 0 )){
                region  = owner.REGION_SQUARE1
            }
            else if   ((paramsIn.position[0] <0 )&& (paramsIn.position[1] > 0 )){
                region  = owner.REGION_SQUARE2
            }
            else if   ((paramsIn.position[0] <0 )&& (paramsIn.position[1] < 0 )){
                region  = owner.REGION_SQUARE3
            }
            else if   ((paramsIn.position[0] >0 )&& (paramsIn.position[1] < 0 )){
                region  = owner.REGION_SQUARE4
            }

            return region;
        };

        nestedObj.getXAxisOrientation = function (paramsIn) {
            let owner                =  paramsIn.ownerObj;
            let xOrientation = owner.REGION_NOTHING;

            if  (paramsIn.position[0] == 0 ) {
                xOrientation = owner.X_AXIS_ORIENTATION_CENTER;
            }
            else if   (paramsIn.position[0] < 0 ) {
                xOrientation = owner.X_AXIS_ORIENTATION_LEFT  ;
            }
            else if   (paramsIn.position[0] > 0 ) {
                xOrientation = owner.X_AXIS_ORIENTATION_RIGHT ;
            }

            return  xOrientation;
        };

        nestedObj.getYAxisOrientation = function (paramsIn) {
            let owner = paramsIn.ownerObj;
            let yOrientation = owner.REGION_NOTHING;

            if (paramsIn.position[1] == 0) {
                yOrientation = owner.Y_AXIS_ORIENTATION_MIDDLE;
            } else if (paramsIn.position[1] < 0) {
                yOrientation = owner.Y_AXIS_ORIENTATION_BOTTOM;
            } else if (paramsIn.position[1] > 0) {
                yOrientation = owner.Y_AXIS_ORIENTATION_TOP;
            }
            ;

            return yOrientation;
        }

        nestedObj.getSectionDetails = function  (paramsIn) {
            let owner                                          = paramsIn.ownerObj;

            let currentPole                                    = owner.vectorFromMatrix ({vectorPosition:1 ,
                                                                                   dimension: dimension,  matrix:owner.poles});
            let sectionPole                                    = owner.vectorFromMatrix ({vectorPosition:paramsIn.sectionPositionIndexFromMatrice ,
                                                                                dimension: dimension,  matrix:owner.poles});
            let sectionVector                                  = owner.vector ({p1:currentPole,p2:sectionPole});

            let sectionOppositeVector                          = owner.oppositeVectors({v: sectionVector});
            let sectionOppositeOrthoRightVector                = owner.ortho3DRight ({v:sectionOppositeVector });

            this.structure[paramsIn.sectionName]               = {};
            this.structure[paramsIn.sectionName]
                                    .pole                      = sectionPole ;
            this.structure[paramsIn.sectionName]
                                    .vector                    = sectionVector;

            this.structure[paramsIn.sectionName]
                                    .opposite                  = {};
            this.structure[paramsIn.sectionName]
                                    .opposite
                                    .vector                    = sectionOppositeVector;
            this.structure[paramsIn.sectionName]
                                    .opposite
                                    .orthoRightVector          = sectionOppositeOrthoRightVector;

            this.structure[paramsIn.sectionName]
                .opposite
                .orthoRightVector                              = sectionOppositeOrthoRightVector;

        };

        nestedObj.getPrevious  = function (paramsIn) {

            this.getSectionDetails({
                ownerObj: paramsIn.ownerObj,
                sectionPositionIndexFromMatrice:0,
                sectionName: paramsIn.ownerObj.SECTION_PREV,

            });

        };

        nestedObj.getCurrent  =function (paramsIn) {
            let owner                               = paramsIn.ownerObj;
            let currentPole                         = owner.vectorFromMatrix ({vectorPosition:1 ,
                dimension: dimension,  matrix:owner.poles});
            this.structure.current                  = {};
            this.structure.current.pole            = currentPole;
        };

        nestedObj.getNext  =function (paramsIn) {

            this.getSectionDetails({
                ownerObj: paramsIn.ownerObj,
                sectionPositionIndexFromMatrice:2,
                sectionName: paramsIn.ownerObj.SECTION_NEXT,

            });

        };

        nestedObj.getSectionScale =function (paramsIn) {
            let owner                              = paramsIn.ownerObj;
            this.structure[paramsIn.sectionName]
                                  .scale           = {};

            let scalingFactor                      = owner.floatPart ({ranges:owner.scalingFactorRanges, convRanges:owner.scalingFactorConvRanges});
            let scaledVector                       = owner.scaleVectorWithScalar({v:this.structure[paramsIn.sectionName].vector, scalar: scalingFactor });

            this.structure[paramsIn.sectionName]
                .scale
                .vector                            = scaledVector

            this.structure[paramsIn.sectionName]
                .scale
                .pole                              = owner.addVectors({v1:  this.structure.current.pole, v2 : this.structure[paramsIn.sectionName].scale.vector  });


            this.structure[paramsIn.sectionName]
                .scale
                .oppositeVector                    = owner.oppositeVectors({v: scaledVector});

            this.structure[paramsIn.sectionName]
                .scale
                .oppositePole                      = owner.addVectors({v1:  this.structure.current.pole, v2 : this.structure[paramsIn.sectionName].scale.oppositeVector  });


        };

        nestedObj.getSectionInfo =function (paramsIn) {

            let position         = this.getLocalPosition({
                ownerObj: paramsIn.ownerObj,
                sectionName: paramsIn.sectionName,
                sectionNextName:paramsIn.sectionNextName
            });

            this.structure[paramsIn.sectionName]
                                           .info                         = {};
            this.structure[paramsIn.sectionName]
                                           .info
                                            .position                    = position;
           this.structure[paramsIn.sectionName]
                                           .info
                                           .regions                      = this.getRegion({ownerObj:paramsIn.ownerObj, position: position});
            this.structure[paramsIn.sectionName]
                                            .info
                                            .xAxisOrientation            = this.getXAxisOrientation({ownerObj:paramsIn.ownerObj, position: position});
            this.structure[paramsIn.sectionName]
                                            .info
                                            .yAxisOrientation            = this.getYAxisOrientation({ownerObj:paramsIn.ownerObj, position: position});


        };

        nestedObj.getPreviousCurrentNextStructures  =function (paramsIn) {
            this.getPrevious(paramsIn);
            this.getCurrent(paramsIn);
            this.getNext(paramsIn);

            this.getSectionInfo({ownerObj: paramsIn.ownerObj,
                sectionName: paramsIn.ownerObj.SECTION_PREV,
                sectionNextName:paramsIn.ownerObj.SECTION_NEXT
            });
            this.getSectionInfo({ownerObj: paramsIn.ownerObj,
                sectionName: paramsIn.ownerObj.SECTION_NEXT  ,
                sectionNextName:paramsIn.ownerObj.SECTION_PREV
            });

            this.getSectionScale({ownerObj: paramsIn.ownerObj,
                sectionName: paramsIn.ownerObj.SECTION_PREV,
                sectionNextName:paramsIn.ownerObj.SECTION_NEXT
            });

            this.getSectionScale({ownerObj: paramsIn.ownerObj,
                sectionName: paramsIn.ownerObj.SECTION_NEXT  ,
                sectionNextName:paramsIn.ownerObj.SECTION_PREV
            });

        }  ;

        nestedObj.getInfoBetweenSections = function (paramsIn) {
            let owner                         = paramsIn.ownerObj;

            this.structure.between            = {};

            let previousScaledPole            = this.structure.previous.scale.pole;
            let NextScaledPole                 = this.structure.next.scale.pole;
            let mergePoles                    = owner.polesMerge({polesA:previousScaledPole, polesB:NextScaledPole });
            let center                        = owner.polesCenter({dimension:dimension, poles:mergePoles });
            this.structure.between
                .pole                         = center;

            let previousOppositeScaledPole    = this.structure.previous.scale.oppositePole;
            let NextOppositeScaledPole        = this.structure.next.scale.oppositePole;
            let mergeOppositePoles            = owner.polesMerge({polesA:previousOppositeScaledPole, polesB:NextOppositeScaledPole });
            let oppositeCenter                = owner.polesCenter({dimension:dimension, poles:mergeOppositePoles });
            this.structure.between
                .oppositePole                  = oppositeCenter;


        };


        nestedObj.getInfo = function (paramsIn) {
            this.structureIni(paramsIn);
            this.getPreviousCurrentNextStructures(paramsIn);
            this.getInfoBetweenSections(paramsIn)
        };

        nestedObj.getInfo ({ownerObj:this});

        return  nestedObj.structure
    };

    process() {

        let description =` 
       I  - FINALITÉS
       I-1 Sommaire d'intention
           Indiqué si une courbe va à gauche ou à droite
       I-2 Détail d'intention
  
          
       II- PROCÉDÉS: PRÉ-REQUIS, OPÉRATIONS, STRUCTURES ET PROCESSUS.
       II-1 Initialiser les attributs et les structures de données
       II-2 la structure est un tableau d'oject, contenant trois éléments :
       II-2.1 Précedent (valeur, vecteur)
       II-2.2 actuel(valeur, vecteur) 
       II-2.3 suivant(valeur, vecteur) 
       II-3
       III- RÉSULTATS
       III-1 Fournir la liste des poles de countours
             `
        return  description;

    };

    doTests(paramsIn) {
        if ( paramsIn) {
            paramsIn.xceptionFunctionsName = ['constructor','tests','doTests'];
            this.tests(paramsIn);
        }
        else {
            this.tests({
                showTests:true,
                object:  this  ,
                xceptionFunctionsName:  ['constructor','tests','doTests'] ,
                poles  : [
                    -0.91 ,   -0.91,   0,
                    -0.63 ,   -0.8,   0,
                    -0.5 ,    -0.5,   0,
                ] ,
               scalingFactorRanges       :  [[0.03, 0.0811 ],[0.091, 0.1 ] ],
               scalingFactorConvRanges  :   [[0.1,0.4],[0.5, 0.8 ] ]
            });
        };
    };

};

Ebika.Interpolation             = class EbikaInterpolation  extends Ebika.CurveInfo {

    constructor() {
        super();

    }

    inter (paramsIn) {

       return  paramsIn.origin[0]===paramsIn.origin[2]?
               [ paramsIn.destination[0], paramsIn.destination[0] ,paramsIn.destination[1] ] :
              [ paramsIn.destination[0],   paramsIn.destination[0] + (  ( (paramsIn.origin[1] - paramsIn.origin[0] ) * (paramsIn.destination[1] - paramsIn.destination[0]) ) / (paramsIn.origin[2] - paramsIn.origin[0] ) ), paramsIn.destination[1] ]
    }

    interClamp (paramsIn) {

        let result = this.inter (paramsIn);

        if (result[0] < result[2]) {

            result    = [ result[0],
                          result[1]<= result[0] ?result[0] : result[1]>= result[2] ? result[2] : result[1] ,
                          result[2] ] ;

        } else {

            result    = [ result[0],
                result[1]>= result[0] ?result[0] : result[1]<= result[2] ? result[2] : result[1] ,
                result[2] ] ;

        }

        return result;
    }

    interList (paramsIn) {

        let result = [];

        for (let eltIndex = 0;eltIndex<paramsIn.list.length;eltIndex++  ) {
            result.push( this.inter ( {
                                      origin : paramsIn.list[eltIndex][0],
                                      destination: paramsIn.list[eltIndex][1]
                                      } )
            );
        };

        return result;
    }

    interClampList (paramsIn) {

        let result = [];

        for (let eltIndex = 0;eltIndex<paramsIn.list.length;eltIndex++  ) {
            result.push( this.interClamp ( {
                    origin : paramsIn.list[eltIndex][0],
                    destination: paramsIn.list[eltIndex][1]
                } )
            );
        };

        return result;
    }


    desc(paramsIn) {

        paramsIn.result =  {
            origin:'Intervalle origine de l interpolation, est un array de trois valeurs, min, value, max',
            destination:'Intervalle destination de l interpolation, est un array deux valeurs, min,  max',
        };

        return    paramsIn.result
    };

    classTests(paramsIn) {

        if ( paramsIn) {
            paramsIn.xceptionFunctionsName = ['constructor','tests','classTests'];
            this.tests(paramsIn);
        }
        else {
            this.tests({
                showTests:true,
                object:  this  ,
                xceptionFunctionsName:  ['constructor','tests','classTests'] ,
                origin : [5, 12, 64],
                destination : [2, 6] ,
                list: [ [ [64, 12, 64], [2, 6] ] , [ [5, 12, 5], [2, 6] ],  [ [64, 12, 5], [2, 6] ]   ],
            });
        };
    };
};

Ebika.Segmentations             = class EbikaSegmentations extends  Ebika.Interpolation {

    constructor (paramsIn) {
        super();
        if (paramsIn) {
            this.randConvegences   = paramsIn.hasOwnProperty('randConvegence') ? paramsIn.randConvegences: [[0,1]];
            this.intervals = paramsIn.hasOwnProperty('intervals') ? paramsIn.intervals : {
                variation: [0, 10],
                segmentation: [4, 12]
            }
            this.segCount = paramsIn.hasOwnProperty('segCount') ? paramsIn.segCount : 10;
            this.distributionConsts = paramsIn.hasOwnProperty('distributionConsts') ? paramsIn.distributionConsts : {
                slope: 2,
                initialY: 0
            }
            this.incrementation = (this.intervals.variation[1] - this.intervals.variation[0]) / this.segCount;
        }
        else {
            this.randConvegences   = [[0,1.],[.9,1]];
            this.intervals =   {
              variation: [1, 10],
                segmentation: [4, 12]
             };
            this.segCount =  10000;
            this.distributionConsts = {
                slope: 2,
                initialY: 0
            }
            this.incrementation =   Math.abs (this.intervals.variation[1] - this.intervals.variation[0] )/ this.segCount;
        };
        this.interpolation = new Ebika.Interpolation();
        this.fractionDigit = 2;

    } ;

    process (paramsIn) {
        let result =
        `
        I-FINALITÉS
        I-1 Sommaire d'intention
              Ce modèle propose de subdiviser dynamiquement un intervalle en plusieurs segments consécutifs à partir d'une distribution mathématique ayant   une inconnue et plusieurs constantes paramétriques. 
        I-1 Détail d'intention
              Pour subdiviser l'intervalle, outre une distribution mathématique, 
              le modèle a besoin de fournir un intervalle d'inconnues ou de variation,
              un intervalle de segmentation, 
              les constantes paramétriques de la distribution mathématique, le nombre de segments souhaité, la constante d'incrémentation dans l'intervalle d'inconnues.
        
        
        II- PROCÉDÉS: PRÉ-REQUIS, OPÉRATIONS, STRUCTURES ET PROCESSUS.
        II-1 Implémenter la classe segmentations avec la méthode distribution qui sera plus tard redéfinit en fonction du type de découpage souhaité dans un intervalle
        II-2 Assigner les constantes paramétriques
        II-3 Implémenter  la méthode distribution qui sera plus tard redéfinit en fonction du type de découpage souhaité dans un intervalle
        II-4 Implémenter   la boucle de segmentation régulière
        II-5 Implémenter   la boucle de segmentation aléatoire
        III-RÉSULTATS
        III-1 Fournir une segmentation régulière(dans l'intervalle de segmentation)
        III-2 Fournir une segmentation Aléatoire(dans l'intervalle de segmentation)
        III-3 Fournir une segmentation normalisée(dans l'intervalle de segmentation compris  
                entre 0. et 1.)
        III-4 Fournir une segmentation aléatoire normalisée(dans l'intervalle de segmentation compris  entre 0. et 1.)
        III-5 Fournir une segmentation  normalisée relative(dans l'intervalle de segmentation compris  entre -1. et 1.)
        
        III-6 Fournir une segmentation  aléatoire normalisée relative(dans l'intervalle de segmentation compris  entre -1. et 1.)
      `;
      return result;
    };

    distribution(paramsIn) {
        let result;
        //   this.distributionConsts.slope * paramsIn.vari + this.distributionConsts.initialY;  // Math.pow(2,paramsIn.vari )   1/3*paramsIn.vari   // 1/ Math.pow(20,paramsIn.vari )  ;  // Math.pow(1000,paramsIn.vari )    //  Math.sin(paramsIn.vari);        this.distributionConsts.slope * paramsIn.vari + this.distributionConsts.initialY;  // Math.pow(2,paramsIn.vari )   1/3*paramsIn.vari
         let intervalVariRatio =  Math.abs( paramsIn.vari -this.intervals.variation[0]) /  Math.abs( this.intervals.variation[1]-this.intervals.variation[0])

        // console.log(intervalVariRatio)
        //
        //
        // if  (intervalVariRatio <0.4)
        //   result =Math.pow(2,paramsIn.vari )
        // else if  (intervalVariRatio >=0.4)  result =Math.pow(2,paramsIn.vari )
        // //result =  this.distributionConsts.slope * paramsIn.vari + this.distributionConsts.initialY;
        result =Math.pow(1.5,paramsIn.vari )
        return   result;
    };

    segmentate() {
        let result  ={  images:[], targets:[], normalized:[],negNormalized:[], randImages:[], randTargets:[], randNormalized:[], randNegNormalized:[],};

        let  nestedObj = {

            getDistributionValue: function (paramsIn) {
                return paramsIn.ownerObj.distribution({vari:paramsIn.vari});
            }  ,

            getSegmentTargetValue: function (paramsIn) {
                let  targetValue        =paramsIn.ownerObj.interpolation.inter({
                    origin:[paramsIn.minBound ,paramsIn.segValue, paramsIn.maxBound ],
                    destination :[paramsIn.ownerObj.intervals.segmentation[0],paramsIn.ownerObj.intervals.segmentation[1]]
                });

                return targetValue[1]
            }   ,

            getSegmentTargetNormalizedValue: function (paramsIn) {
                let  normalizedValue        =paramsIn.ownerObj.interpolation.inter({
                    origin:[paramsIn.minBound ,paramsIn.segValue, paramsIn.maxBound ],
                    destination :[0,1]
                });

                return normalizedValue [1]
            }   ,

            getSegmentTargetNegNormalizedValue: function (paramsIn) {
                let  normalizedValue        =paramsIn.ownerObj.interpolation.inter({
                    origin:[paramsIn.minBound ,paramsIn.segValue, paramsIn.maxBound ],
                    destination :[-1,1]
                });

                return normalizedValue [1]
            }   ,

            getRandomValue: function (paramsIn) {
                let varInterval,  randomVari, value;
                let dataSource  =   paramsIn.result[paramsIn.dataSourceName];
                let randData    =   paramsIn.result[paramsIn.randDataName];

                if (paramsIn.stepIndex == 0) {
                    varInterval = [dataSource[0] , dataSource[0]];
                } else if  (paramsIn.stepIndex == dataSource.length -1  ) {
                    varInterval =  [dataSource[dataSource.length -1] , dataSource[dataSource.length -1]];
                } else {

                    varInterval = [(dataSource[paramsIn.stepIndex] + dataSource[paramsIn.stepIndex-1])/2,
                        ( dataSource[paramsIn.stepIndex] + dataSource[paramsIn.stepIndex+1])/2 ]

                };

                value  = paramsIn.ownerObj.floatPart({
                    ranges:  [varInterval],
                    convRanges:paramsIn.ownerObj.randConvegences
                });
                randData.push(value);
            }  ,

            regularSegments  : function (paramsIn) {

                let minBound =  paramsIn.ownerObj.distribution({vari:paramsIn.ownerObj.intervals.variation[0]});
                let maxBound =  paramsIn.ownerObj.distribution({vari:paramsIn.ownerObj.intervals.variation[1]});

                let stepIndex  = 0 ;
                let segCount   = paramsIn.ownerObj.segCount;
                let vari = paramsIn.ownerObj.intervals.variation[0];

                while ( stepIndex<=segCount ) {
                    let  segValue                            =   this.getDistributionValue({ownerObj:paramsIn.ownerObj,vari:vari});
                    let  segmentTargetValue                  =   this.getSegmentTargetValue({
                        ownerObj: paramsIn.ownerObj,
                        minBound : minBound, maxBound:maxBound,
                        segValue: segValue
                    });
                    let  segmentTargetNormalizedValue        =   this.getSegmentTargetNormalizedValue({
                        ownerObj: paramsIn.ownerObj,
                        minBound : minBound, maxBound:maxBound,
                        segValue: segValue
                    });
                    let  segmentTargetNegNormalizedValue     =   this.getSegmentTargetNegNormalizedValue({
                        ownerObj: paramsIn.ownerObj,
                        minBound : minBound, maxBound:maxBound,
                        segValue: segValue
                    });

                    paramsIn.result.images.push(  segValue  );
                    paramsIn.result.targets.push(   segmentTargetValue );
                    paramsIn.result.normalized.push( segmentTargetNormalizedValue  );
                    paramsIn.result.negNormalized.push( segmentTargetNegNormalizedValue );
                    vari+=paramsIn.ownerObj.incrementation
                    stepIndex++;
                };

            }  ,

            randomSegments  : function (paramsIn) {
                for (let stepIndex= 0;stepIndex< paramsIn.result.images.length ; stepIndex++) {
                    this.getRandomValue({
                        result:result,
                        dataSourceName : 'targets',
                        randDataName   : 'randTargets',
                        stepIndex : stepIndex,
                        ownerObj:paramsIn.ownerObj
                    });
                    this.getRandomValue({
                        result:result,
                        dataSourceName : 'images',
                        randDataName   : 'randImages',
                        stepIndex : stepIndex,
                        ownerObj:paramsIn.ownerObj
                    });
                    this.getRandomValue({
                        result:result,
                        dataSourceName : 'normalized',
                        randDataName   : 'randNormalized',
                        stepIndex : stepIndex,
                        ownerObj:paramsIn.ownerObj
                    });
                    this.getRandomValue({
                        result:result,
                        dataSourceName : 'negNormalized',
                        randDataName   : 'randNegNormalized',
                        stepIndex : stepIndex,
                        ownerObj:paramsIn.ownerObj
                    });


                };
            }

        };


        nestedObj.regularSegments ({result:result, ownerObj:this});
        nestedObj.randomSegments({result:result, ownerObj:this});

        return result;
    };

    doTests(paramsIn) {
        if ( paramsIn) {
            paramsIn.xceptionFunctionsName = ['constructor','tests','doTests'];
            this.tests(paramsIn);
        }
        else {
            this.tests({
                showTests:true,
                object:  this  ,
                 randConvegences :  [[0,1]],
                 intervals : {variation:[0,10], segmentation:[4,12]} ,
                 segCount  : 10,
                 distributionConsts  : {slope:2, initialY  :0}
            });
        };
    };

};

Ebika.PolePortions              = class EbikaPolePortions   extends Ebika.Segmentations   {
    constructor(paramsIn) {
        super();
        this.ini(paramsIn);
    };
    process() {

    let description =` 
       I  - Finalités
       I-1  Objectifs
            À partir  d'un itinéraire de poles données, PolePortions doit être capable de fournir  une position 
            exacte dépedement d'un ratio donné compris de 0. à  1. .
            Il doit aussi être possible de fournir un ensemble de positions en fonction d'un ensemble de ratios fournis. 
       II - Structure
       II-1 Ini structure
       II-2 RunThrough poles and set changes
       II-3 Set cumulative proportions
       II-1 ini
       III- Requêtes
       III-1 Fonctions à publier
             - getPosition(paramsIn={ratio: 0.3 })
             - getPositions(paramsIn={ratios: [ ] });
             - ini(paramsIn={ratio:  , ratios: [ ], poles  :  , dimension })`

       return  description;

    };

    ini(paramsIn) {
        if (paramsIn) {
            this.poles  =  paramsIn.hasOwnProperty("poles")? paramsIn.poles  :  [
                2,    15 ,   8,

                5,     9,    12,

                6,    21,   17 ,

                -2,    0,   13
            ];
            this.dimension =  paramsIn.hasOwnProperty("dimension")? paramsIn.dimension  :  3;
        } else  {
            this.poles  =   [
                2,    15 ,   8,

                5,     9,    12,

                6,    21,   17 ,

                -2,    0,   13
            ];
            this.dimension =    3;
        };
        let nestedObj = {
            structureIni   :  function (paramsIn) {
                this.ownerObj         = paramsIn.ownerObj;
                this.structure        = {poles:paramsIn.ownerObj.poles ,vectors:[[]],distances:[0],cumulativeDistances:[0],cumulativeProportions:[]};
                this.dimension        = paramsIn.ownerObj.dimension;
                this.poleIndexMax     = this.structure.poles.length/this.dimension;

                for(let compIndex = 0;compIndex<this.dimension; compIndex++) {
                    this.structure.vectors[this.structure.vectors.length-1].push(0);
                };
            }   ,

            setSegmentChanges : function (poleIndex){
                let p1 =   this.ownerObj.vectorFromMatrix({vectorPosition:poleIndex-1,matrix:this.structure.poles,dimension:this.dimension});
                let p2 =   this.ownerObj.vectorFromMatrix({vectorPosition:poleIndex,matrix:this.structure.poles,dimension:this.dimension});
                this.structure.vectors.push(  this.ownerObj.vector({p1:p1,p2:p2}));
                this.structure.distances.push(  this.ownerObj.distance({p1:p1,p2:p2}));
                this.structure.cumulativeDistances.push( this.structure.cumulativeDistances[this.structure.cumulativeDistances.length-1] +this.ownerObj.distance({p1:p1,p2:p2}));
            }   ,

            runThroughPoles : function(paramsIn) {
                this.structureIni(paramsIn);
                for(let poleIndex = 1 ;poleIndex<this.poleIndexMax;poleIndex++ ) {
                    this.setSegmentChanges(poleIndex );
                };
            }  ,

            setCumulativeProportions : function () {
                for(let cumulDistIndex = 0 ;cumulDistIndex<this.structure.cumulativeDistances.length;cumulDistIndex++ ) {
                    this.structure.cumulativeProportions.push( this.structure.cumulativeDistances[cumulDistIndex]/this.structure.cumulativeDistances[this.structure.cumulativeDistances.length-1])
                };

            }

        };
        nestedObj.runThroughPoles({ownerObj:this});
        nestedObj.setCumulativeProportions();
        this.structure = nestedObj.structure;
        return  nestedObj;
    };

    getPosition(paramsIn) {
       let position;
       if (paramsIn)
           this.ratio     =  paramsIn.hasOwnProperty("ratio")? paramsIn.ratio      :  0.2
       else  this.ratio   = 0.2;

       let nestedOj  = {
           locateSegment: function() {
               let  find = false;
               let cumulProportionIndex =1;
               let segmentIndex = 1;

               if  (this.ownerObj.ratio< 0) {
                   segmentIndex = 0;
               } else if   (this.ownerObj.ratio> 1) {
                    segmentIndex = this.ownerObj.structure.cumulativeProportions.length-2;
               } else {
                   while ((!find)&&(cumulProportionIndex<this.ownerObj.structure.cumulativeProportions.length)) {
                       if  ((this.ownerObj.ratio>=this.ownerObj.structure.cumulativeProportions[cumulProportionIndex-1])
                           && (this.ownerObj.ratio<=this.ownerObj.structure.cumulativeProportions[cumulProportionIndex])){
                           find = true;
                           segmentIndex = cumulProportionIndex -1;
                       };
                       cumulProportionIndex ++;
                   };
               };
               return  segmentIndex;
           }   ,

           locateSegmentLocalRatio:function (segmentIndex) {
               let segStartRatio      =  this.ownerObj.structure.cumulativeProportions[segmentIndex];
               let segEndRatio        =  this.ownerObj.structure.cumulativeProportions[segmentIndex+1];
               let segDeltaRatio      =  segEndRatio -  segStartRatio;
               let targetDeltatRatio  =  this.ownerObj.ratio - segStartRatio;
               let localRatio         =   targetDeltatRatio/segDeltaRatio;
               return localRatio;
           }    ,

           findPosition:function (segmentIndex,localRatio) {
               let origin =   this.ownerObj.vectorFromMatrix({vectorPosition:segmentIndex,matrix:this.ownerObj.structure.poles,dimension:this.ownerObj.dimension});
               let segVector   = this.ownerObj.structure.vectors[segmentIndex+1];
               let vectScaledByLocalRatio  =      this.ownerObj.scaleVectorWithScalar({scalar:localRatio, v:segVector});
               let position                =      this.ownerObj.addVectors({v1:origin,v2:vectScaledByLocalRatio});
               return position;
           }    ,

           locatePosition() {
               let segmentIndex = this.locateSegment();
               let localRatio   = this.locateSegmentLocalRatio(segmentIndex);
               let position     = this.findPosition (segmentIndex,localRatio);
               return position;
           }   ,
        };
        nestedOj.ownerObj  = this;
        position = nestedOj.locatePosition() ;
        return  position
    };

    getPositions(paramsIn) {
        let positions = [];
        if (paramsIn)
            this.ratios    =  paramsIn.hasOwnProperty("ratios")? paramsIn.ratios      :  [0.2,1]
        else  this.ratios   = [0.2,1];

        for (let ratioIndex = 0; ratioIndex<this.ratios.length;ratioIndex++) {
            let result  = this.getPosition({ratio:this.ratios[ratioIndex]});
            for (let compIndex =0; compIndex<result.length; compIndex++ ) {
                positions.push(result[compIndex]);
;            }
        };

        return positions;
    };

    doTests(paramsIn) {
        if ( paramsIn) {
            paramsIn.xceptionFunctionsName = ['constructor','tests','doTests'];
            this.tests(paramsIn);
        }
        else {
            this.tests({
                showTests:true,
                object:  this  ,
                xceptionFunctionsName:  ['constructor','tests','doTests'] ,
                poles  : [
                    2,    15 ,   8,

                    5,     9,    12,

                    6,    21,   17 ,

                    -2,    0,   13
                ],
                dimension :  3,
                ratio     : 1,
                ratios    : [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1],

            });
        };
    };

};

Ebika.Borders                   = class EbikaBorders   extends  Ebika.PolePortions  {
    constructor(paramsIn) {
        super( );

    };

    getBorders(paramsIn) {

        const dimension  = 3 ;
        let  poleIndexMax;
        let  nestedObj    = {
                structure : [],
                result   : []
        };
        if (paramsIn) {
            this.poles = paramsIn.hasOwnProperty("poles") ? paramsIn.poles : [
                -0.91 ,      -0.91,   0,
                -0.63 , -0.8,   0,
                -0.5 ,      -0.5,   0,
                0.2,     -0.3,  0 ,
                0.91,       -0.91,  0 ,
                0.91,       -0.6,  0 ,
                0.3,     0.1,  0 ,
                0.91 ,      0.91,   0,
                -0.91 ,      0.91,   0,
                -0.6 ,    0.3,   0,

            ];
           this.scalingFactorRanges      =  paramsIn.hasOwnProperty("scalingFactorRanges") ? paramsIn.scalingFactorRanges : [[0.03, 0.0811 ],[0.091, 0.1 ] ];
           this.scalingFactorConvRanges  =  paramsIn.hasOwnProperty("scalingFactorConvRanges") ? paramsIn.scalingFactorConvRanges: [[0.1,0.4],[0.5, 0.8 ] ];
        } else {
            this.poles = [
                -0.91 ,      -0.91,   0,
                -0.63 , -0.8,   0,
                -0.5 ,      -0.5,   0,
                0.2,     -0.3,  0 ,
                0.91,       -0.91,  0 ,
                0.91,       -0.6,  0 ,
                0.3,     0.1,  0 ,
                0.91 ,      0.91,   0,
                -0.91 ,      0.91,   0,
                -0.6 ,    0.3,   0,

            ];
            this.scalingFactorRanges      = [[0.03, 0.0811 ],[0.091, 0.1 ] ];
            this.scalingFactorConvRanges  =  [[0.1,0.4],[0.5, 0.8 ] ];
        };

        nestedObj.structureIni  =function (paramsIn) {
            poleIndexMax   = paramsIn.ownerObj.getPolesCount({poles: paramsIn.ownerObj.poles, dimension: dimension })   // paramsIn.ownerObj.poles.length/ dimension;
            this.result    = [];
        }  ;


        nestedObj.getPreviousPole  = function (paramsIn) {
            let owner           =  paramsIn.ownerObj;
            let vectorPosition  =  (paramsIn.poleIndex==0)? (poleIndexMax-1):paramsIn.poleIndex-1;
            return owner.vectorFromMatrix ({vectorPosition:vectorPosition ,
                dimension: dimension,  matrix:owner.poles});
        }  ;

        nestedObj.getCurrentPole  = function (paramsIn) {
            let owner             =  paramsIn.ownerObj;
            let vectorPosition    =  paramsIn.poleIndex;
            return        owner.vectorFromMatrix ({vectorPosition:vectorPosition ,
                dimension: dimension,  matrix:owner.poles});
        }  ;

        nestedObj.getNextPole   = function (paramsIn) {
            let owner           =  paramsIn.ownerObj;
            let vectorPosition  =  (paramsIn.poleIndex==poleIndexMax-1)? 0:paramsIn.poleIndex+1;
            return    owner.vectorFromMatrix ({vectorPosition:vectorPosition ,
                      dimension: dimension,  matrix:owner.poles});
        }  ;

        nestedObj.getSuccessivePoles   = function (paramsIn) {
            let owner           =  paramsIn.ownerObj;
            let previous        =  this.getPreviousPole(paramsIn);
            let current         =  this.getCurrentPole(paramsIn);
            let next            =  this.getNextPole(paramsIn);
            let mergedPoles     =  owner.polesMerge({polesA: previous, polesB:current  });
            return                 owner.polesMerge({polesA:  mergedPoles, polesB:next });
        }  ;


        nestedObj.runThroughPoles = function (paramsIn) {

            let owner = paramsIn.ownerObj;
            let insidePole;
            this.structureIni(paramsIn);

            for(let poleIndex = 0 ;poleIndex < poleIndexMax;poleIndex++ ) {

                let mergedPoles  =   this.getSuccessivePoles({ownerObj:paramsIn.ownerObj,
                                                                  poleIndex:poleIndex
                                                            });
                let  curveInfo = new  Ebika.CurveInfo();
                let info       =   curveInfo.getInfo({poles:mergedPoles,
                    dimension: dimension,
                    scalingFactorRanges : owner.scalingFactorRanges,
                    scalingFactorConvRanges  : owner.scalingFactorConvRanges
                });
                if (info.previous.info.xAxisOrientation ==curveInfo.X_AXIS_ORIENTATION_LEFT) {
                    info.between.pole.push(0);
                    insidePole  =   info.between.pole;
                }
                else  if (info.previous.info.xAxisOrientation ==curveInfo.X_AXIS_ORIENTATION_RIGHT) {
                    info.between.oppositePole.push(0);
                    insidePole  =   info.between.oppositePole;

                }
                else {
                    info.between.pole.push(0);
                    insidePole  =   info.between.pole;
                }



                 this.result     =  owner.polesMerge({polesA: this.result, polesB:insidePole   });
                this.structure.push(info);

            };
        };

        nestedObj.runThroughPoles({ownerObj:this});
        return  nestedObj.result;
    };

    process() {

        let description =` 
       I  - FINALITÉS
       I-1 Sommaire d'intention
           Déterminer le contour intérieur d'un polygone constitué donnée
       I-2 Détail d'intention
           À partir des poles consécutifs constituant le polygone et un éventail de facteurs d'agrandissement et leur convergence aléatoire associée ,
           déterminer les poles consécutifs qui forment le contour intérieur  du polygone
          
       II- PROCÉDÉS: PRÉ-REQUIS, OPÉRATIONS, STRUCTURES ET PROCESSUS.
       II-1 Initialiser les attributs et les structures de données
       II-2 la structure est un tableau d'oject, contenant pour chaque élément :
             - la valeur du poles : value
             - la valeur du précédent  
             - la valeur  du suivant.
               le précédent du premier élément   de la liste des poles est le dernier poles et le suivant du dernier est le premier pole   (previous, next)
             - Le vecteur precédent : previousVector
             - Le vecteur suivant : nextVector   
             - le vecteur réduit précédent 
             - la position réduit précédent 
             - le vecteur opposé réduit précédent 
             - la position opposé  réduit précédent 
             - le vecteur réduit suivant
             - la position réduit suivant
             - le vecteur opposé suivant
             - la position opposé  suivant
             - l'indicateur du sens de courbe. La courbe au niveau du pole va t-elle à droite ou a gauche.
       II-3 Parcourir tous les poles et assigner leurs  valeurs structurelles correspondantes 
       III- RÉSULTATS
       III-1 Fournir la liste des poles de countours
             `
        return  description;

    };

    doTests(paramsIn) {
        if ( paramsIn) {
            paramsIn.xceptionFunctionsName = ['constructor','tests','doTests'];
            this.tests(paramsIn);
        }
        else {
            this.tests({
                showTests:true,
                object:  this  ,
                xceptionFunctionsName:  ['constructor','tests','doTests'] ,
                poles  : [
                    -0.91 ,      -0.91,   0,
                    -0.63 , -0.8,   0,
                    -0.5 ,      -0.5,   0,
                    0.2,     -0.3,  0 ,
                    0.91,       -0.91,  0 ,
                    0.91,       -0.6,  0 ,
                    0.3,     0.1,  0 ,
                    0.91 ,      0.91,   0,
                    -0.91 ,      0.91,   0,
                    -0.6 ,    0.3,   0,

                ] ,
                scalingFactorRanges : [[0.03, 0.0811 ],[0.091, 0.1 ] ] ,
                scalingFactorConvRanges  :  [[0.1,0.4],[0.5, 0.8 ] ]
            });
        };
    };

};

Ebika.Projects                =    { };


class DateUtils {

    constructor(paramsIn) {

    };

    /** @function formateDateAAAAMMDD */
    formateDateAAAAMMDD(paramsIn) {
        let day   =   paramsIn.date.getDate(); day = (day<10)? "0"+day:day;
        let month =   paramsIn.date.getMonth()+1;  month = (month<10)? "0"+month:month;
        let year  =  paramsIn.date.getFullYear();
        let result;
        return year +paramsIn.separator+ month +paramsIn.separator+ day;
    };
    /** @function splitTextIntoYearMonthDay*/
    splitTextIntoYearMonthDay(paramsIn) {
        let dateStr       = paramsIn.dateStr;
        //Logger.log( dateStr);
        let components    = dateStr.split(paramsIn.separator);
        if (components[1]<0) components[1] = 1
        else if (components[1]>11) components[1] = 12
        else if ((components[1]>=0)&&(components[1]<=11)) components[1] = parseFloat(components[1])-1
        else components[1] = 0;
        return {year:components[0], month:components[1], day:components[2]};
    };
    /** @function assignSplitedDateToVariable*/
    assignSplitedDateToVariable(paramsIn) {
        let dateComponents       = this.splitTextIntoYearMonthDay({dateStr:paramsIn.dataStr,separator:paramsIn.separator});
        let dateVariable         = new Date(dateComponents.year, dateComponents.month,dateComponents.day, 0, 0, 0, 0);
        return dateVariable;
    };
    /** @function millisecondeToDays*/
    millisecondeToDaysCount(paramsIn) {
        let milliseconds = paramsIn.milliseconds;
        let daysCount    = milliseconds/(24*60*60*1000);
        return daysCount ;
    };

};

class Echeancier {
    constructor(paramsIn){
        this.dateUtils    = new DateUtils();
        this.dateFirstStr = paramsIn.dateFirstStr;
        this.dateFirst    = this.dateUtils.assignSplitedDateToVariable({dataStr:this.dateFirstStr , separator:dateSeparator});
        this.pas          = paramsIn.pas;
        this.nombrePas    = paramsIn.nombrePas;
        this.dateGivenStr = paramsIn.dateGivenStr;
        this.dateGiven    = this.dateUtils.assignSplitedDateToVariable({dataStr:this.dateGivenStr , separator:dateSeparator});
        this.montant      = paramsIn.montant;
        //Logger.log(this.dateGiven);
    };

    getLast() {
        this.dateLast = new  Date(this.dateFirst.getFullYear(),this.dateFirst.getMonth(),this.dateFirst.getDate(), 0, 0, 0, 0);
        this.dateLast.setDate(this.dateLast.getDate()+this.pas*this.nombrePas);
        return this.dateUtils.formateDateAAAAMMDD({date:this.dateLast,separator:dateSeparator});
    };

    getNext() {
        let daysCountBetweenGivenAndStartDate        = this.dateUtils. millisecondeToDaysCount({milliseconds:  (this.dateGiven -  this.dateFirst)});
        let stepsCountBetweenGivenAndStartDate       = Math.floor(daysCountBetweenGivenAndStartDate/this.pas);
        let nextStepsCountBetweenGivenAndStartDate   = stepsCountBetweenGivenAndStartDate + 1;
        this.dateNext                                = new Date(this.dateFirst.getFullYear(),this.dateFirst.getMonth(),this.dateFirst.getDate(), 0, 0, 0, 0);
        this.dateNext.setDate(this.dateNext.getDate()+this.pas*nextStepsCountBetweenGivenAndStartDate);
        return this.dateUtils.formateDateAAAAMMDD({date:this.dateNext,separator:dateSeparator});
    };

};
