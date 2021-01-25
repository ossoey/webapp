
const   continents = ["Afrique", "Amérique", "Asie", "Europe", "Océanie"];

Ebika.Projects.Quizzexp   = class EbikaProjectsQuißzzexp     extends Ebika   {
    constructor(paramsIn) {
        let turn  =  0;
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
                    {"pays": "Australie", "capitale": "Canberra",  "continent" : continents [5], "preposition":"de l'"} ,
                    {"pays": "Austriche", "capitale": "Vienne",  "continent" : continents [3], "preposition":"de l'"} ,
                    {"pays": "Azerbaïdjan", "capitale": "Bakou",  "continent" :  continents [3], "preposition":"de l'"} ,
                    {"pays": "Bahamas", "capitale": "Nasseau",  "continent" :  continents [1], "preposition":"de l'"} ,
                    {"pays": "Bahreîn", "capitale": "Manama",  "continent" :  continents [2], "preposition":"de l'"} ,
                    {"pays": "Bangladesh", "capitale": "Dacca",  "continent" :  continents [2], "preposition":"de l'"} ,
                    {"pays": "Barbade", "capitale": "BridgeTown",  "continent" :  continents [1], "preposition":"de l'"} ,
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

                buildGivenQuestion : function (targetReferenceIndex,targetQuestionIndex) {
                    let str          =  this.questions[targetQuestionIndex]["question"]
                    let strQuestion_  = str.replace("$0", this.references[targetReferenceIndex][ this.questions[targetQuestionIndex]["propindex"] ]);
                    let strQuestion   = strQuestion_.replace("$", this.references[targetReferenceIndex][ this.questions[targetQuestionIndex]["qindex"] ]);
                    let reponse      = this.references[targetReferenceIndex][this.questions[targetQuestionIndex]["rindex"] ]

                    return {strQuestion,reponse};
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
        }
    };

    essay(paramsIn) {

        let infos = [];

        // for (let paysIndex = 0 ;paysIndex< this.quizzes.wordcapitals.references.length ;paysIndex ++ ) {
        //     infos.push(this.quizzes.wordcapitals.buildGivenQuestion(paysIndex,0));
        // };

        this.quizzes.wordcapitals.tests();
        //return infos;

    };

    nextTurn () {
       return  "C'est le tour de :" + this.players.elements[this.players.nextTurn()];
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
function main() {
    quizz.essay();
   // quizz.doTests();
}