$(document).ready(function () {

    //>>>>>>>>>>>>>>>>> Global variable initialization on start <<<<<<<<<<<<<<<<<<<<<<<<<
    var host = window.location.host;
    var token = null;
    var headers = {};
    var usersEndPoint = "/api/users";
    var usersUrl = "http://" + host + usersEndPoint;

  

    //Prva stranica pri ucitavanju 
    $("#logoutDiv").css("display", "none");
    $("#loginDiv").css("display", "none");
    $("#regForm").css("display", "block");

    $("body").on("click", "#logoutBtn", reset);
    $("body").on("click", "#giveUpBtn", cleanForm);
    $("body").on("click", "#loginBtn", ulogujSe);
    $("body").on("click", "#btnDelete", deleteUser);
    $("body").on("click", "#btnEdit", editUser);


    $("body").on("click", "#regBtn", loadRegistration);
    $("body").on("click", "#btnAlready", LoadLogin);
    //-------------------------------------------------
    function LoadLogin() {
        $("#loginDiv").css("display", "block");
        $("#regForm").css("display", "none");

    }
    //-----------------------------------------------
    function cleanForm() {

        $("#createInput2").val('');
        $("#createInput3").val('');
        $("#exampleMembership").val('');

    }

   //------------------------------------------------
    function loadRegistration() {
        $("#info").empty();
        $("#loginDiv").css("display", "none");
        $("#regForm").css("display", "block");
    }

    //---------------------- Load login form--------------------------
    $("body").on("click", "#jumpToLogin", reset);

    //-----------------------LOGOUT----------------------------
    function reset() {
        if (token != null) {
            token = null;
        }
        $("#loginDiv").css("display", "none");
        $("#regForm").css("display", "block");
        $("#logoutDiv").css("display", "none");
        $("#loggedInParagraph").empty();
        $("#create").addClass("hidden");
        $("#data").addClass("hidden");
        $("#info").css("display", "none");

    }

    //----------------------------- REGISTRATION---------------------------

    $("#registration").submit(function (e) {
        e.preventDefault();

        var email = $("#regEmail").val();
        var loz1 = $("#regPass").val();
        var loz2 = $("#regPass2").val();


        var sendData = {
            "Email": email,
            "Password": loz1,
            "ConfirmPassword": loz2
        };

        $.ajax({
            type: "POST",
            url: 'http://' + host + "/api/Account/Register",
            data: sendData

        }).done(function (data) {

            $("#regEmail").val('');
            $("#regPass").val('');
            $("#regPass2").val('');
            $("#regForm").css("display", "none");
            $("#loginDiv").css("display", "block");





        }).fail(function (data) {
            alert("Your Registration failed! Try Again!");
        });
    });
    //-----------------------LOGIN------------------------

    function ulogujSe() {

        var email = $("#loginEmail").val();
        var loz = $("#loginPass").val();

        var sendData = {
            "grant_type": "password",
            "username": email,
            "password": loz
        };

        $.ajax({
            "type": "POST",
            "url": 'http://' + host + "/Token",
            "data": sendData

        }).done(function (data) {
            console.log(data);
            $.getJSON(usersUrl, setUsers);
            $("#data").removeClass("hidden");

            $("#info").empty().append("Logged user: " + data.userName);

            token = data.access_token;
            console.log(token);
            $("#loginEmail").val('');
            $("#loginPass").val('');
            $("#loginDiv").css("display", "none");
            $("#regForm").css("display", "none");
            $("#loggedInParagraph").append("Logged user: " + "<b>" + email + "</b>");
            $("#logoutDiv").css("display", "block");
            

            $("#data").css("display", "block");
            $("#create").removeClass("hidden");
            $("#regPrijLogHead").addClass("hidden");


        }).fail(function (data) {
            alert("Your login attempt failed! Try Again!");
        });

    };


    //-------------------------------EDIT MEMBERSHIP STATUS ------------------

    function editUser() {
        var editId = this.name;
        console.log(this.name);
        httpAction = "GET";
        var editUrl = "http://" + host +"/api/toggle?id=" + editId;


        if (token) {
            headers.Authorization = "Bearer " + token;
        }
       
       
            $.getJSON(editUrl, setUsers)
                    .done(function (data, status) {
                        usersUrl = "http://" + host + usersEndPoint;
                        $.getJSON(usersUrl, setUsers);

                    })
                    .fail(function (data, status) {

                        alert("Error during your last action!!")
                    })
    };
          
        
            
    
   

    //------------------------------ADDING MAIN ENTITY(USER)----------------------------

    $("#create").submit(function (e) {

        e.preventDefault();



        var namelastname = $("#createInput2").val();
        var yearofBirth = $("#createInput3").val();



        if (token) {
            headers.Authorization = "Bearer " + token;
        }

        if ($('#exampleMembership').is(":checked")) {
            var dataCreate = {
                "NameAndLastName": namelastname,
                "YearOfBirth": yearofBirth,
                "Paid": true

            }
        }
        else {
            var dataCreate = {
                "NameAndLastName": namelastname,
                "YearOfBirth": yearofBirth,
                "Paid": false

            }
        }
        httpAction = "POST";

        $.ajax({
            "url": usersUrl,
            "type": httpAction,
            "data": dataCreate,
            "headers": headers
        })
            .done(function (data, status) {
                $.getJSON(usersUrl, setUsers);
                $("#createInput2").val('');
                $("#createInput3").val('');

            })
            .fail(function (data) {
                alert("You failed during your last action!")
            })

    })

    //--------------------------USERS IN TABLE--------------------------------------
    function setUsers(data, status) {

        var $container = $("#data");
        $container.empty();

        if (status == "success") {
            // ispis naslova
            var div = $("<div></div>");
            var h1 = $("<h1 style='text-align:center'>Users</h1>");
            div.append(h1);
            // ispis tabele
            var table = $("<table class='table table-bordered'></table>");
            
            var header = $("<tr class='text-center' style='background-color:Gainsboro'><td  style='padding:7px; width:200px'>Name and Last Name</td><td style = 'width:auto; padding:7px'>Year of Birth</td><td style = 'width:auto; padding:7px'>Membership</td><td style='width:auto'>Delete</td><td style='width:auto'>Change</td></tr>");
            if (token) {
                headers.Authorization = "Bearer " + token;
            }
            table.append(header);
            tbody = $("<tbody></tbody>");
            for (i = 0; i < data.length; i++) {
                // prikazujemo novi red u tabeli
                var stringId = data[i].Id.toString();
                var placeno = data[i].Paid;
                var row = "";
                // prikaz podataka
                if (placeno == true) {
                    var displayData = "<tr style='background-color:lawngreen'><td style='padding:7px;text-align:center'>" + data[i].NameAndLastName + "</td><td style='padding:7px;text-align:center'>" + data[i].YearOfBirth + "</td>" + "<td style='padding:7px;text-align:center'>" + "Paid" + "</td>" + "<td><button href=\"#\" id=btnDelete name=" + stringId + " style='color:black'>Delete</button></td><td><button href=\"#\" id=btnEdit name=" + stringId + ">Change</button></td>";

                }
                else {
                    var displayData = "<tr style='background-color:red; color:white'><td style='padding:7px;text-align:center'>" + data[i].NameAndLastName + "</td><td style='padding:7px;text-align:center'>" + data[i].YearOfBirth + "</td>" + "<td style='padding:7px;text-align:center'>" + "Expired" + "</td>" + "<td><button href=\"#\" id=btnDelete name=" + stringId + " style='color:black'>Delete</button></td><td><button href=\"#\" id=btnEdit name=" + stringId + " style='color:black'>Change</button></td>";

                };
                // prikaz dugmadi za izmenu i brisanje
                row = displayData;
                
                tbody.append(row);
            }
            table.append(tbody);

            div.append(table);
            if (token) {
                // prikaz forme ako je korisnik prijavljen
                $("#formData").css("display", "block");
            }

            // ispis novog sadrzaja
            $container.append(div);
        }
        else {
            var div = $("<div></div>");
            var h1 = $("<h1>Error during your last action!</h1>");
            div.append(h1);
            $container.append(div);
        }
    };
    //-------------------------------DELETE-------------------------
    function deleteUser() {
        var deleteId = this.name;
        console.log(this.name);
        httpAction = "DELETE";

        if (token) {
            headers.Authorization = "Bearer " + token;
        }
        var usersUrl = "http://" + host + usersEndPoint;
        $.ajax({
            "url": usersUrl + "?id=" + deleteId,
            "type": httpAction,
            "headers": headers

        })
            .done(function (data, status) {
                usersUrl = "http://" + host + usersEndPoint;
                $.getJSON(usersUrl, setUsers);

            })
            .fail(function (data, status) {

                alert("Error during your last action!!")
            })

    };
})