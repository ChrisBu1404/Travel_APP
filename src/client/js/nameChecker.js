function checkForName(inputText) {
    console.log("::: Running INPUT CHECK :::", inputText);

    var http = new RegExp("^(https|http)://", "i");
    var blanks = new RegExp("[\\s]")

    if (http.test(inputText) === false){
        alert('The URL needs to start with http or https!')
    }
    if (blanks.test(inputText)){
        alert('There are white spaces in the URL!')
    }


    if (http.test(inputText) && !blanks.test(inputText))
    {
        return(true)
    }else{
        return(false)
    }

}
export { checkForName }
