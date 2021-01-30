
    var unsortedArray = [];
    var list_size = 0;

    var insertionSortTimeTaken = 0;
    var mergeSortTimeTaken = 0;

    var myBooks = []
    var newTable = document.createElement('table');
    var allData = []


    window.onload = function(){
        google.charts.load('current', {'packages':['corechart']});
    }

    var initList = function(){
        list_size = document.getElementById('list_size').value;
        initUnsortedArray(list_size)
    }


    var randomNumberGenerator = function(start, end){
        return Math.floor(Math.random() * (end - start + 1) + start)
    }

    var initUnsortedArray = function(size){
        let randomNumberArray = [];

        for(var i=0; i<size; i++){
            randomNumberArray.push(randomNumberGenerator(1,20))
        }
        unsortedArray = [...randomNumberArray]
        document.getElementById('unsortedArray').innerHTML = unsortedArray
      //  console.log("Array : " + unsortedArray)
    }

    var insertionSort = function(){

        let array = [...unsortedArray];
        let length = array.length;

        let start = performance.now();

        for(var i = 1, j; i < length; i++) {
            var temp = array[i];
            for(var j = i - 1; j >= 0 && array[j] > temp; j--) {
            array[j+1] = array[j];
            }
            array[j+1] = temp;
        }

        let end = performance.now();

        insertionSortTimeTaken = (end-start) 

        document.getElementById('insertionSort').innerHTML = array;
        document.getElementById('is_time_taken').innerHTML = insertionSortTimeTaken
    }

    var initMergeSort = function(){
        let start = performance.now();
        let sortedArray = mergeSort(unsortedArray)
        let end = performance.now();

        mergeSortTimeTaken = (end-start)

        document.getElementById('mergeSort').innerHTML = sortedArray;
        document.getElementById('ms_time_taken').innerHTML = mergeSortTimeTaken
    }

    var mergeSort = function(array){

       if (array.length === 1) {
            return array
        } else {
            var split = Math.floor(array.length/2)
            var left = array.slice(0, split)
            var right = array.slice(split)

            left = mergeSort(left)
            right = mergeSort(right)

            var sorted = []
            while (left.length > 0 || right.length > 0) {
            if (right.length === 0 || left[0] <= right[0]) {
                sorted.push(left.shift())
            } else {
                sorted.push(right.shift())
            }
            }

            return sorted
        }
    }


    var saveEntry = function(){

        let dataObj = {
            'size' : list_size,
            'tis' : insertionSortTimeTaken,
            'mis' : mergeSortTimeTaken
        }
        allData.push(dataObj);

        addDataEntry(dataObj)
    
    }

    var addDataEntry = function(data){
        myBooks.push(data)

        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myBooks.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myBooks[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("dataEntry");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }


    var chartData = function(){
        var data = [];
        var headers = ['Size','Time for Insertion Sort (ms)','Time for Merge Sort (ms)'];
        data.push(headers);
        
        for(var el=0; el<allData.length; el++){
            let arr = [];
            arr.push(allData[el].size)
            arr.push(allData[el].tis)
            arr.push(allData[el].mis)
            data.push(arr);
        }
     drawChart(data)
    }

    var drawChart = function(dataPoints){
        document.getElementById('graphContainer').scrollIntoView();
        var data = google.visualization.arrayToDataTable(dataPoints);
        var options = {
            title: 'Sorting Alogrithm Performance : Insertion Sort v/s Merge Sort',
            curveType: 'function',
            legend: { position: 'bottom' }
          };

          var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
          chart.draw(data, options);
    }

    
