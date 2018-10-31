/**
 * Sample Application Built
 * Author: Payal Butala
 * For: media.net
 */

/**
 * The main object encapsulating the entire application
 */
var filmAppObj = {};

/**
 * This is the array that gets filled once the import has been done from the JSON 
 * file
 */
filmAppObj.actual_JSON = [];

/**
 * This is the array that is used to display the movie list in the page and then
 *  on each sort this is what gets updated
 */
filmAppObj.search_JSON = [];

/**
 * Function to sort by year
 */
filmAppObj.sortYear = function () {
    // console.log("sort")
    filmAppObj.search_JSON.sort(function (a, b) {
        return (a.year) - (b.year);
    });
    // console.log("sortyear", search_JSON);
    document.getElementById('movieList').innerHTML = '';
    filmAppObj.showData();
    filmAppObj.delBtnListener()
}


/**
 * Function to sort movies by title
 */
filmAppObj.sortTitle = function () {
    filmAppObj.search_JSON.sort(function (a, b) {
        var nameA = a.title.toLowerCase(),
            nameB = b.title.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1
        if (nameA > nameB)
            return 1
        return 0 //default return value (no sorting)

    });
    document.getElementById('movieList').innerHTML = '';
    filmAppObj.showData();
    filmAppObj.delBtnListener()
}


/**
 * Loops through all the delete buttons and adds listener event to all of them
 * since we are removing and adding the html multiple times this functions needs
 * to be called every time you add and remove HTMl from the page
 */
filmAppObj.delBtnListener = function () {
    var buttons = document.getElementsByClassName("btn-del");
    var buttonsCount = buttons.length;
    // console.log(buttons);
    for (var i = 0; i < buttonsCount; i++) {
        // console.log(buttons[i]);
        buttons[i].onclick = function (e) {
            // alert(this.id);
            filmAppObj.deleteMovie(this.id);
        }
    }
}


/**
 * This function reads the input text value and then creates a list of movies that
 * need to be shown into the array that is searchJSON and then recreates 
 */
filmAppObj.searchList = function () {
    filmAppObj.search_JSON = [];
    var input = document.getElementById('ip-search');
    var filter = input.value.toUpperCase();
    console.log(filter, "ip")
    for (i = 0; i < filmAppObj.actual_JSON.length; i++) {
        if (filmAppObj.actual_JSON[i].title.toUpperCase().indexOf(filter) > -1) {
            filmAppObj.search_JSON.push(filmAppObj.actual_JSON[i]);
        }
    }
    document.getElementById('movieList').innerHTML = '';
    filmAppObj.showData();
    filmAppObj.delBtnListener()
}


/**
 * Delete's a movie from given list of array but wont delete it from the JSON
 * you can get back the original list once you refresh the page
 */
filmAppObj.deleteMovie = function (movId) {
    for (var j = 0; j < filmAppObj.actual_JSON.length; j++) {
        if (filmAppObj.actual_JSON[j].id == movId) {
            // console.log("indx", indx);
            filmAppObj.actual_JSON.splice(j, 1);
        }
    }
    filmAppObj.search_JSON = filmAppObj.actual_JSON;
    document.getElementById('movieList').innerHTML = '';
    filmAppObj.showData();
    filmAppObj.delBtnListener()
}

/**
 * Function that adds a movie to the array it adds to both to Actual Array as well as 
 * search Array and recreates the list
 */
filmAppObj.submitMovie = function (e) {
    e.preventDefault();
    var name = document.getElementById("name").value;
    var year = document.getElementById("year").value;
    var posterUrl = document.getElementById("posterUrl").value;

    // document.getElementById("form_movie").submit(); //form submission
    // alert(" Name : " + name + " n Year : " + year + " n Poster URL : " + posterUrl + " n Form Id : " + document.getElementById("form_movie").getAttribute("id") + "nn Form Submitted Successfully......");
    var newMovie = {};
    newMovie.id = filmAppObj.search_JSON.length + 1;
    newMovie.title = name;
    newMovie.year = year;
    newMovie.poster = posterUrl;
    console.log(newMovie);
    filmAppObj.actual_JSON.push(newMovie);
    filmAppObj.search_JSON.push(newMovie);
    document.getElementById('movieList').innerHTML = '';
    filmAppObj.showData();
    filmAppObj.delBtnListener();
}


/**
 * Functions that shows the list of data onthe view, the call to this functions
 * make sures that you can change the data on the page without refreshing it
 */
filmAppObj.showData = function () {
    var eleWrap = document.getElementById('movieList');

    for (i = 0; i < filmAppObj.search_JSON.length; i++) {
        text = '';
        text = '<li class="grid-item"><div class="data-wrap"><button class="btn-del" id="' + filmAppObj.search_JSON[i].id + '">delete</button>' + '<span class="set-bg"><img class="cm-not-in-page" src=' + filmAppObj.search_JSON[i].poster + '></span>' + '<div class="cont-wrap"><h2 class="mv-title">' + filmAppObj.search_JSON[i].title + '</h2>' + '<span class="mv-year">' + filmAppObj.search_JSON[i].year + '</span></div>' + '</div></li>';
        eleWrap.innerHTML += text;
    }
    filmAppObj.set_bg();
}


/**
 * Sets the background image
 */
filmAppObj.set_bg = function () {
    var bgArr = document.getElementsByClassName('set-bg')
    for (var i = 0; i < bgArr.length; i++) {
        console.log(bgArr[i].getElementsByTagName('img')[0].getAttribute('src'));
        var imgSrc = bgArr[i].getElementsByTagName('img')[0].getAttribute('src');
        bgArr[i].style.backgroundImage = "url('" + imgSrc + "')";
    };
}

/**
 * Function that loads the data from the JSON file into the memory Array
 */
filmAppObj.loadJSON = function (callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    try {
        xobj.open('GET', 'assets/js/movies.json', true); // Replace 'my_data' with the path to your file
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    } catch (e) {
        console.log('Error Occure:', e);
    }
}


/**
 * Used to create a modal and apply all the necessary function to the created 
 * modal
 */
filmAppObj.addModalCreation = function () {


    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementById("close");
    var span1 = document.getElementById("cancel");
    var span2 = document.getElementById("add");
    console.log(span, btn, modal)
    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }
    span1.onclick = function () {
        modal.style.display = "none";
    }
    span2.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

/**
 * Function that adds multiple event listeners to different elements
 * in the page
 */
filmAppObj.attachAllListeners = function () {
    document.getElementById('sortYear').addEventListener("click", filmAppObj.sortYear);
    document.getElementById('sortTitle').addEventListener("click", filmAppObj.sortTitle);
    document.getElementById('add').addEventListener("click", filmAppObj.submitMovie);
    document.getElementById('ip-search').addEventListener("keyup", filmAppObj.searchList);
}


/**
 * Function that sets all the data
 */
filmAppObj.responseHandler = function (response) {
    // Parse JSON string into object
    filmAppObj.actual_JSON = JSON.parse(response);
    filmAppObj.search_JSON = filmAppObj.actual_JSON.slice(0);
    console.log(filmAppObj.search_JSON);
    filmAppObj.showData();
    filmAppObj.delBtnListener()
}

/**
 * The function that runs as soon as the JS in loaded into the 
 * browser
 */
filmAppObj.init = function () {
    /* Function that is fired to get the data from the JSON files  */
    filmAppObj.loadJSON(function (response) {
        // Parse JSON string into object
        filmAppObj.actual_JSON = JSON.parse(response);
        filmAppObj.search_JSON = filmAppObj.actual_JSON.slice(0);
        console.log(filmAppObj.search_JSON);
        filmAppObj.showData();
        filmAppObj.delBtnListener()
    });
    /* A call to create the modal to add a movie */
    filmAppObj.addModalCreation();

    /* Bind all event Listeners */
    filmAppObj.attachAllListeners();
}


/**
 * Start the application
 */
filmAppObj.init();