
const   continents = ["Afrique", "Amérique", "Asie", "Europe", "Océanie"];

Ebika.Projects.Quizzexp   = class EbikaProjectsQuißzzexp     extends Ebika   {
    constructor(paramsIn) {
        let turn  =  0;
        let questionIndex = 0;
        super();
        this.quizzes = {
            "wordcapitals" : {

                "references" :  [
                    {"pays": "Afghanistan", "capitale": "Kaboul",  "continent" :  continents [2], "preposition":"de l'",  } ,
                    {"pays": "Afrique du Sud", "capitale": "Pretoria",  "continent" :  continents [0], "preposition":"de l'"} ,
                    {"pays": "Albanie", "capitale": "Tirana",  "continent" : continents [3], "preposition":"de l'"} ,
                    {"pays": "Algérie", "capitale": "Alger",  "continent" : continents [0], "preposition":"de l'"} ,
                    {"pays": "Allemagne", "capitale": "Berlin",  "continent" :  continents [3], "preposition":"de l'"} ,
                    {"pays": "Andorre", "capitale": "Andorre-la-vielle",  "continent" :  continents [3], "preposition":"de l'"} ,
                    {"pays": "Angola", "capitale": "Luanda",  "continent" : continents [0], "preposition":"de l'"} ,
                    {"pays": "Antigua-et-Barbuda", "capitale": "Saint John’s",  "continent" : continents [1], "preposition":"de l'"} ,
                    {"pays": "Arabie saoudite", "capitale": "Ryad",  "continent" : continents [2], "preposition":"de l'"} ,
                    {"pays": "Argentine", "capitale": "Buenos Aires",  "continent" :  continents [1], "preposition":"de l'"} ,
                    {"pays": "Arménie", "capitale": "Erevan",  "continent" :  continents [2], "preposition":"de l'"} ,
                    {"pays": "Australie", "capitale": "Canberra",  "continent" : continents [4], "preposition":"de l'"} ,
                    {"pays": "Austriche", "capitale": "Vienne",  "continent" : continents [3], "preposition":"de l'"} ,
                    {"pays": "Azerbaïdjan", "capitale": "Bakou",  "continent" :  continents [3], "preposition":"de l'"} ,
                    {"pays": "Bahamas", "capitale": "Nasseau",  "continent" :  continents [1], "preposition":"du "} ,
                    {"pays": "Bahreîn", "capitale": "Manama",  "continent" :  continents [2], "preposition":"du "} ,
                    {"pays": "Bangladesh", "capitale": "Dacca",  "continent" :  continents [2], "preposition":"du "} ,
                    {"pays": "Barbade", "capitale": "BridgeTown",  "continent" :  continents [1], "preposition":"de la "} ,
                   ],
                "questions" : [
                    {"question" : "Quelle est la capitale $0$ ?","qindex": "pays", "rindex":"capitale","propindex":"preposition"  },
                    {"question" : " $, est la capitale dans quel pays :","qindex": "capitale", "rindex":"pays"},
                    {"question" : " $, est dans quel continent? :","qindex": "pays", "rindex":"continent"},
                    {"question" : " $, est dans quel continent? :","qindex": "capitale", "rindex":"continent"},
                ],

                indexOfContinent : function(continent) {
                    return continents.indexOf(continent);
                }   ,

                indexOfCountry : function(country) {
                    let indexOf = -1, trouver = false;

                    let countryIndex = 0;

                    while((countryIndex<this.references.length)&&(!trouver)) {
                        let pays = this.references[countryIndex]["pays"];
                        if( pays===country) {
                            indexOf = countryIndex;
                            trouver = true;
                        }
                        countryIndex++;
                    };

                    return indexOf;
                }   ,

                indexOfCapital: function(capitalIn) {
                    let indexOf = -1, trouver = false;

                    let capitalIndex = 0;

                    while((capitalIndex<this.references.length)&&(!trouver)) {
                        let capital =  this.references[capitalIndex]["capitale"];
                        if(   capital ===capitalIn) {
                            indexOf = capitalIndex;
                            trouver = true;
                        }
                        capitalIndex++;
                    };

                    return indexOf;
                }   ,

                tests : function () {
                    let test  =[ [["Amérique" ,this.indexOfContinent("Amérique")], ["Europe" ,this.indexOfContinent("Europe")],  ["Europew" ,this.indexOfContinent("Europew")]],
                                  [["Bahamas" ,this.indexOfCountry("Bahamas")], ["Andorre" ,this.indexOfCountry("Andorre")], ["Andorre2" ,this.indexOfCountry("Andorre2")]],
                                   [["Vienne" ,this.indexOfCapital("Vienne")], ["Alger" ,this.indexOfCapital("Alger")], ["Andorre2" ,this.indexOfCapital("Andorre2")]],
                        ]
                    console.log(test);
                   return  test;
                }  ,

                getQuizzOptions : function (targetReferenceIndex,targetQuestionIndex) {
                    let options, nestedObj = {};
                    let rand               = new Ebika.Random();
                    nestedObj.getValues = function(parentObj,rawValues){
                        let values = [];
                        for (let valueIndex = 0;valueIndex <rawValues.length;valueIndex ++) {
                            values.push(rawValues[valueIndex ][parentObj.questions[targetQuestionIndex]["rindex"]]);
                        };
                        return   values;
                    };

                    if (targetQuestionIndex <= 1) {
                        let opts    =   rand.retrieveElementsWithException({
                            arr: this.references,
                            elementsCount: 3,
                            exceptionIndex: targetReferenceIndex
                        });
                        options = nestedObj.getValues(this, opts );
                    }else if (targetQuestionIndex > 1) {
                        options   =   rand.retrieveElementsWithException({
                            arr: continents,
                            elementsCount: 3,
                            exceptionIndex: continents.indexOf(this.references[targetReferenceIndex]["continent"])
                        });
                    };
                    return options;
                }   ,

                buildGivenQuestion : function (targetReferenceIndex,targetQuestionIndex) {
                    let rand           = new Ebika.Random();
                    let str            = this.questions[targetQuestionIndex]["question"]
                    let strQuestion_   = str.replace("$0", this.references[targetReferenceIndex][ this.questions[targetQuestionIndex]["propindex"] ]);
                    let strQuestion    = strQuestion_.replace("$", this.references[targetReferenceIndex][ this.questions[targetQuestionIndex]["qindex"] ]);
                    let reponse        = this.references[targetReferenceIndex][this.questions[targetQuestionIndex]["rindex"] ]
                    let options        = this.getQuizzOptions(targetReferenceIndex,targetQuestionIndex);
                    let eltIndex       = rand.intValue({range:[0,options.length-1]});
                    let optionsDiplay  = options.slice();
                    optionsDiplay.splice(eltIndex, 0, reponse);


                    return {strQuestion, reponse, options, optionsDiplay };
                }    ,

                nextQuestion : function () {
                    questionIndex +=1;
                    questionIndex = questionIndex % this.references.length
                    return    this.buildGivenQuestion(questionIndex,1);
                }

           },

        };

        this.players = {
            elements :  [],
            nextTurn : function () {
                turn+=1;
                turn = turn % this.elements.length
                return   turn
            }
        };


    };

    essay(paramsIn) {

        let infos = [];

        for (let paysIndex = 0 ;paysIndex< this.quizzes.wordcapitals.references.length ;paysIndex ++ ) {
            infos.push(this.quizzes.wordcapitals.buildGivenQuestion(paysIndex,1));
        };

        console.log(infos)

       // this.quizzes.wordcapitals.tests();
        return infos;

    };

    nextTurn () {
       return  "C'est le tour de :" + this.players.elements[this.players.nextTurn()];
    };

    nextQuestion() {

        return  this.quizzes.wordcapitals.nextQuestion()
    };

    iniPlayers(paramsIn) {
      this.players.elements = paramsIn.players;
      //alert(this.players)
    };

    doTests(paramsIn) {
        if ( paramsIn) {
            paramsIn.xceptionFunctionsName = ['constructor','tests','doTests'];
            this.tests(paramsIn);
        }
        else {
            this.tests({
                showTests:true,
                object:  this
            });
        };
    };
};


const  quizz  = new Ebika.Projects.Quizzexp();
const  rand  = new Ebika.Random();
function main() {
    quizz.essay();
    //  console.log(   rand.retrieveElements({
    //
    //     arr: [0,1,2,3,4,5,6,7,8,9],
    //     elementsCount: 11
    //
    // }),"  ,  ", rand.mixElements({
    //
    //      arr: [0,1,2,3,4,5,6,7,8,9]
    //  }),"  ,  ",
    //
    //      rand. retrieveElementsWithException({
    //
    //          arr: [0,1,2,3,4],
    //          elementsCount: 3,
    //          exceptionIndex: 2
    //
    //          })
    //
    //  );
   // quizz.doTests();
}