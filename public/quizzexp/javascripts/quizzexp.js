
Ebika.Projects.Quizzexp   = class EbikaProjectsQuizzexp     extends Ebika   {
    constructor(paramsIn) {
        let turn  =  0;
        super();
        this.quizzes = {
            "wordcapitals" : {


                "references" :  [
                    {"pays": "Afghanistan", "capitale": "Kaboul",  "continent" : "Asie", "preposition":"de l'"} ,
                    {"pays": "Afrique du Sud", "capitale": "Pretoria",  "continent" : "Afrique", "preposition":"de l'"} ,
                    {"pays": "Albanie", "capitale": "Tirana",  "continent" : "Europe", "preposition":"de l'"} ,
                    {"pays": "Algérie", "capitale": "Alger",  "continent" : "Afrique", "preposition":"de l'"} ,
                    {"pays": "Allemagne", "capitale": "Berlin",  "continent" : "Europe", "preposition":"de l'"} ,
                    {"pays": "Andorre", "capitale": "Andorre-la-vielle",  "continent" : "Europe", "preposition":"de l'"} ,
                    {"pays": "Angola", "capitale": "Luanda",  "continent" : "Afrique", "preposition":"de l'"} ,
                    {"pays": "Antigua-et-Barbuda", "capitale": "Saint John’s",  "continent" : "Amérique", "preposition":"de l'"} ,
                    {"pays": "Arabie saoudite", "capitale": "Ryad",  "continent" : "Asie", "preposition":"de l'"} ,
                    {"pays": "Argentine", "capitale": "Buenos Aires",  "continent" : "Amérique", "preposition":"de l'"} ,
                    {"pays": "Arménie", "capitale": "Erevan",  "continent" : "Asie", "preposition":"de l'"} ,
                    {"pays": "Australie", "capitale": "Canberra",  "continent" : "Oceanie", "preposition":"de l'"} ,
                    {"pays": "Austriche", "capitale": "Vienne",  "continent" : "Europe", "preposition":"de l'"} ,
                    {"pays": "Azerbaïdjan", "capitale": "Bakou",  "continent" : "Europe", "preposition":"de l'"} ,
                   ],
                "questions" : [
                    {"question" : "Quelle est la capitale $0$ ?","qindex": "pays", "rindex":"capitale","propindex":"preposition"  },
                    {"question" : " $, est la capitale dans quel pays :","qindex": "capitale", "rindex":"pays"},
                    {"question" : " $, est dans quel continent? :","qindex": "pays", "rindex":"continent"},
                    {"question" : " $, est dans quel continent? :","qindex": "capitale", "rindex":"continent"},
                ],


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

        for (let paysIndex = 0 ;paysIndex< this.quizzes.wordcapitals.references.length ;paysIndex ++ ) {
            infos.push(this.quizzes.wordcapitals.buildGivenQuestion(paysIndex,0));
        };
        return infos;

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
   // quizz.doTests();
}