
function opinion2html(opinion){

    const opinionView ={
        name: opinion.name,
        comment: opinion.comment,
        mail: opinion.mail,
        url: opinion.url,
        male: opinion.male?"Male":"",
        female: opinion.female?"Female":"",
        article1: opinion.article1 ? "I read our thoughts and reality" : "I didn't read our thoughts and reality",
        article2: opinion.article2 ? "I read psychosomatic" : "I didn't read psychosomatic",
        article3: opinion.article3 ? "I read affirmations" : "I didn't read affirmations",
        keyWords: opinion.keyWords,
        createdDate: (new Date(opinion.created)).toDateString()
    };

    const template = document.getElementById("mTplOneOpinion").innerHTML;

    let inf = Mustache.render(template, opinionView);
    return inf;
}

function opinionArray2html(sourceData){

    return sourceData.reduce((htmlWithOpinions,opn) => htmlWithOpinions+ opinion2html(opn),"");
    /*let htmlWithOpinions="";

    for(const opn of sourceData){
        htmlWithOpinions += opinion2html(opn);
    }

    return htmlWithOpinions;*/
}



//--------------------------------------------------------------------------------------------------------------
//data and localStorage handling and rendering opinions to the page at startup

let opinions=[];

const opinionsElm=document.getElementById("opinionsContainer");


if(localStorage.myTreesComments){
    opinions=JSON.parse(localStorage.myTreesComments);
}

//TODO render opinions to html
opinionsElm.innerHTML=opinionArray2html(opinions);




//--------------------------------------------------------------------------------------------------------------
//Form processing functionality

/*
* Note:
* For the sake of simplicity, here we use window.alert to display messages to the user
* However, if possible, avoid them in the production versions of your web applications
*
*/


    let myForm = document.getElementById("commenting");
    myForm.addEventListener("submit",processingDate);

    function processingDate(event) {
        event.preventDefault();

        const fName = document.getElementById("name").value.trim();
        const fMail = document.getElementById("email").value.trim();
        const fUrl = document.getElementById("url").value.trim();
        const fgender = document.getElementById("male").checked;
        const fgender1 = document.getElementById("female").checked;
        const article1 = document.getElementById("thoughts").checked;
        const article2 = document.getElementById("psychosomatic").checked;
        const article3 = document.getElementById("affirmations").checked;
        const textArea =  document.getElementById("oppinion").value.trim();
        const keyWords = document.getElementById("commenting").elements["keyword"];

        if(fName=="" || fMail=="" || textArea=="")
        {
            window.alert("Please, enter your name, oppinion and email");
           return;
}



      const newOpinion = {
              name: fName,
              comment: textArea,
              mail: fMail,
              url: fUrl,
              male: fgender,
              female: fgender1,
              article1: article1 ? "I read our thoughts and reality" : "",
              article2: article2 ? "I read psychosomatic" : "",
              article3: article3 ? "I read affirmations" : "",
              keyWords: keyWords.value,
              created: new Date()
          };

       opinions.push(newOpinion);
       localStorage.myTreesComments = JSON.stringify(opinions);


        //4. Update HTML
        //TODO add the new opinion to HTML
        opinionsElm.innerHTML+=opinion2html(newOpinion);


       //5. Reset the form-->
       myForm.reset(); //resets the form-->
}























// let commFrmElm=document.getElementById("opnFrm");
//
// commFrmElm.addEventListener("submit",processOpnFrmData);
//
// function processOpnFrmData(event){
//     //1.prevent normal event (form sending) processing
//     event.preventDefault();
//
//     //2. Read and adjust data from the form (here we remove white spaces before and after the strings)
//     const nopName = document.getElementById("nameElm").value.trim();
//     const nopOpn = document.getElementById("opnElm").value.trim();
//     const nopWillReturn = document.getElementById("willReturnElm").checked;
//
//     //3. Verify the data
//     if(nopName=="" || nopOpn==""){
//         window.alert("Please, enter both your name and opinion");
//         return;
//     }
//
//     //3. Add the data to the array opinions and local storage
//     const newOpinion =
//         {
//             name: nopName,
//             comment: nopOpn,
//             willReturn: nopWillReturn,
//             created: new Date()
//
//         };
//
//
//     opinions.push(newOpinion);
//     localStorage.myTreesComments = JSON.stringify(opinions);
//
//
//     //4. Update HTML
//     //TODO add the new opinion to HTML
//     opinionsElm.innerHTML+=opinion2html(newOpinion);
//
//     //5. Reset the form
//     commFrmElm.reset(); //resets the form
// }