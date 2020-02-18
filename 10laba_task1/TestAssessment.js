function dataBase() {
    let count = 0;

    for(let i=0; i < document.test.getElementsByTagName('input').length; i++)
        if (document.test.getElementsByTagName('input')[i].checked){
            count += +document.test.getElementsByTagName("input")[i].value;
        }

    document.test.display.value = count ;
}


function goAnswerTest() {
    parent.AnswerTest.inpt.value =  document.test.display.value;
}

function goClassifier() {
    parent.Classifier.inpt.value =  document.test.display.value;
}