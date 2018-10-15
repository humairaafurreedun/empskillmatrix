currentRow = 1;
$(document).ready(function() {
    $('#addFactoryDiv').hide();
    $('#editFactoryDiv').hide();

    $(document).on("click",'.edit' ,function(event){
        currentRow = $(this).parents('tr');
        let tr=$(this).closest('tr');
        // let mytest
        let a  = tr.find('input[name="myname"]').val();
        console.log(tr);
        console.log(a);
        alert(a);
        $('#addFactoryDiv').hide();
        $('#editFactoryDiv').show();
        $('#editName_error').hide();
        $('#editDesc_error').hide();
        $('#addName_error').hide();
        $('#addDesc_error').hide();
        $('#addName').val("");
        $('#addDesc').val("");
        $('#submitEdit').attr('disabled', true);
        console.log(event);
        //getting the name of the 'edit' link clicked
        var name1 = this.name;
        // alert(this.name + " " + name1);
        

        $.ajax({
            type: "GET",
            url : "../js/factorydata.json",
            dataType : "json",
            
            success: function(data)
                {    
                    $.each(data, function (key,value) 
                    {
                        // console.log(data);
                        // alert(value.name + " " + name1);
                    if(value.name == name1)
                        {
                            // console.log(data);
                            var name = value.name; // taking the 'name' part from the json string and storing in this variable
                            var desc = value.description; // taking the 'description' part from the json string and storing in this variable 
                            // var editid = value.id;
                            
                            // $("#editId").val(editid);
                            $("#editName").val(name);
                            $("#editDesc").val(desc);
                        } 
                    });  
            }   
        });
    });

    //append values to table when edit btn of edit factory is clicked.
    $("#submitEdit").click(function() {
        var editedName = $("#editName").val();
        var editedDesc = $("#editDesc").val();
        // var editedId = $("#editId").val();
        var editicon = '<a href="#" class="edit"><i class="material-icons" title="Edit">edit</i></a>' ;
        var delicon = '<a href="#" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872';
        var new_row = '<tr>' + '</td>' + '<td>' +editedName + '</td>' + '<td>' + editedDesc+ '</td>'+ '<td>' + editicon + '</td>'+ '<td>' + delicon + '</td>' + '</tr>';
        $("#editFactoryDiv").hide();
        $("#tableBody").find($(currentRow)).replaceWith(new_row);
    });

    //append values to table when add btn of add new factory is clicked.
    $("#submitAdd").click(function() {
        var addedName = $("#addName").val();
        var addedDesc = $("#addDesc").val();
        // var addedId = $("#addId").val();
        // var count = $("#tableBody tr").length;//gettin the length of the dynamic table
        var editicon = '<a href="#" class="edit"><i class="material-icons" title="Edit">edit</i></a>' ;
        var delicon = '<a href="#" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872';
        var new_row = '<tr>' + '<td>' +addedName + '</td>' + '<td>' + addedDesc+ '</td>'+ '<td>' + editicon + '</td>'+ '<td>' + delicon + '</td>' + '</tr>';
        $("#addFactoryDiv").hide();
        $("#tableBody").append(new_row);

    });

    //actions to be performed when cancel btn of "add factory" is clicked.
    $('#cancelAdd').click(function() {
        $('#editFactoryDiv').hide();
        $('#addFactoryDiv').hide();
        $('#addName').val("");
        $('#addDesc').val("");
        $('#addName_error').hide();
        $('#addDesc_error').hide();  
    });

    //actions to be performed when cancel btn of "edit factory" btn is clicked.
    $('#cancelEdit').click(function() {
        $('#editFactoryDiv').hide();
        $('#addFactoryDiv').hide();
        $('#editName').val("");
        $('#editDesc').val("");
        $('#editName_error').hide();
        $('#editDesc_error').hide();
    });

    //actions to be performed when "add factory" btn is clicked.
    $('#addFactory').click(function() {
        $('#editName').val("");
        $('#editDesc').val("");
        $('#editFactoryDiv').hide();
        $('#addFactoryDiv').show();
        $('#submitAdd').attr('disabled', true);
        $('#addName').val("");
        $('#addDesc').val("");
    });

    //delete the row
   $("#tableBody").on('click', '.delete', function(index) {
    var currentRow = $(this).closest('tr');
    currentRow.remove();

    $('#tableBody').find('tr').each(function(index){
      var FirstTDDomE1 = $(this).find('td');//[0];
    //   var FirstTDObject = $(FirstTDDomE1);
    //   FirstTDObject.text(index+1);
    });

   });

   //generating table dynamically from json when page loads
   $.ajax({
    type: "GET",
    url : "../js/factorydata.json",
    dataType : "json",
    success: function(data)
    {   
        $.each(data, function (key,value) 
        {
        //the data stored in the variable 'data' will be broken down terms of key and value where the index of the number of objects will be key while the value will consist of the information that will used next
        //    var id = value.id;//i am taking the 'id' part from the json string and storing in this variable
           var name = value.name;//i am taking the 'name' part from the json string and storing in this variable
           var desc = value.description;//i am taking the 'description' part from the json string and storing in this variable 
           var editIcon = '<a href="#" id="'+'" class="edit"><i class="material-icons" title="Edit">edit</i></a>' ;
           var delIcon = '<a href="#" id="'+'" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872';

          // appending the values in each row of the table
          $('#tableBody').append('<tr>' + '<td name="myname">' +name + '</td>' + '<td>' + desc+ '</td>'+ '<td>' + editIcon + '</td>'+ '<td>' + delIcon + '</td>' + '</tr>');  //In this part of the code, I am taking the json string and dynamically genereating it in a table

       });
  }
 });
  
 //this function calls the functions to validate the different fields of edit factory and add factory
    $(function() {
        var error_addName = false;
        var error_addDesc = false;
        var error_editName = false;
        var error_editDesc = false;

        $("#addName").keyup(function() {
            check_addName();
        });

        $("#addDesc").keyup(function() {
            check_addDesc();
            enableDisableAddSubmit();
        });

        $('#editName').keyup(function() {
            check_editName();
            enableDisableEditSubmit();
        });

        $("#editDesc").keyup(function() {
            check_editDesc();
            enableDisableEditSubmit();            
        });
    
//validate name field of add factory
    function check_addName() {
        var addname_length = $("#addName").val().length; 
        var addname_string = $("#addName").val().substring(0,1);

        if(addname_length== 0){
            $("#addName_error").html("Name cannot be empty");
            $("#addName_error").show();
            error_addName = true;
        }

        else {
            if(addname_string.match(' ')) {
                $("#addName_error").html("Only space/number is not allowed for an input!");
                $("#addName_error").show();
                error_addName = true;
            }

            else {
                $("#addName_error").hide();
                error_addName = false;
            }
          }
    }

//validate description field of add factory
    function check_addDesc() {

        var adddesc_length = $("#addDesc").val().length; 
        var adddesc_string = $("#addDesc").val().substring(0,1);

        if(adddesc_length== 0){
            $("#addDesc_error").html("Description cannot be empty");
            $("#addDesc_error").show();
            error_addDesc = true;
        }

        else {
            if(adddesc_string.match(' ')) {
                $("#addDesc_error").html("Only space/number is not allowed for an input!");
                $("#addDesc_error").show();
                error_addDesc = true;
            }

            else {
                $("#addDesc_error").hide();
                error_addDesc = false;
            }
          }
    }
    
//validate name field of edit factory
    function check_editName() {

        var editname_length = $("#editName").val().length; 
        var editname_string = $("#editName").val().substring(0,1);

        if(editname_length== 0){
            $("#editName_error").html("Name cannot be empty");
            $("#editName_error").show();
            error_editName = true;
        }

        else {
            if(editname_string.match(' ')) {
                $("#editName_error").html("Only space is not allowed for an input!");
                $("#editName_error").show();
                error_editName = true;
            }

            else {
                $("#editName_error").hide();
                error_editName = false;
            }
          }
    }

    //validate description field of edit factory
    function check_editDesc() {
        var editdesc_length = $("#editDesc").val().length; 
        var editdesc_string = $("#editDesc").val().substring(0,1);

        if(editdesc_length== 0){
            $("#editDesc_error").html("Description cannot be empty");
            $("#editDesc_error").show();
            error_editDesc = true;
        }

        else {
            if(editdesc_string.match(' ')) {
                $("#editDesc_error").html("Only space/number is not allowed for an input!");
                $("#editDesc_error").show();
                error_editDesc = true;
            }

            else {
                $("#editDesc_error").hide();
                error_editDesc = false;
            }
          }
    }

    //enable or disable submit btn of add factory based on the input fields
    function enableDisableAddSubmit() {
        if(error_addName == true || error_addDesc == true) {
            $('#submitAdd').attr('disabled', true);
        }
        else {
            $('#submitAdd').attr('disabled', false);
        }
    }

    //enable or disable submit btn of edit factory based on the input fields
      function enableDisableEditSubmit() {
        // $('input[id="#editName"], input[id="#editDesc"]').change(function(){
        //     if ($(this).val())
        //     {
        //         $("input[id='#submitEdit']").removeAttr('disabled');
        //     }
        // });
            if(error_editName == true || error_editDesc == true) {
                $('#submitEdit').attr('disabled', true);
            }
            else {
                $('#submitEdit').attr('disabled', false);
            } 
        }
    });

});