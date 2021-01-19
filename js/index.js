var users = new Array();
var openedUserindex = -1;

$(document).ready(function() {
    function init() {
        fetchAllUsers()
            .then(data => {
                users = data;
                renderAllUsers();
            })
            .catch(error => {
                alert("unable to load users");
            });
    }

    $(document).on('click', ".user", function() {
        var myModal = $("#detailsModal");
        myModal.css("display", "block");
        openedUserindex = parseInt($(this).attr("id"));
        renderDetails();
    });

    $(".close").on("click", function() {
        $("#detailsModal").css("display", "none");
        $("#formModal").css("display", "none");
    });

    $("#cancel").on("click", function() {
        hideAllModals();
        openedUserindex = -1;
    });

    $("#detailsModal").find("#edit").on("click", function() {
        $("#detailsModal").css("display", "none");
        $("#formModal").css("display", "block");
        renderForm();
    });

    $("#save").on("click", async function() {
        if (validateForm()) {
            var modal = $("#formModal");
            var fname = modal.find(".first-name").val();
            var lname = modal.find(".last-name").val();
            var email = modal.find(".email").val();
            var gender = modal.find('input[name="gender"]:checked').val();
            var phone = modal.find(".phone").val();
            var user = {
                "FirstName": fname,
                "LastName": lname,
                "Email": email,
                "Phone": phone,
                "Gender": gender
            }
            hideAllModals();
            if (openedUserindex == -1) {
                saveUser(user).then(status => {
                    if (status) {
                        alert("used added successfully");
                        fetchAllUsers()
                            .then(data => {
                                users = data;
                                openedUserindex = -1;
                                renderAllUsers();
                            }).catch(error => {
                                alert("unable to load users");
                            });
                    }
                }).catch(error => {
                    alert("request failed");
                });
            } else {
                updateUser(users[openedUserindex]["_id"], user)
                    .then(status => {
                        if (status) {
                            alert("user updated successfully");
                            openedUserindex = -1;
                            fetchAllUsers()
                                .then(data => {
                                    users = data;
                                    renderAllUsers();
                                }).catch(error => {
                                    alert("unable to load users");
                                });
                        }
                    }).catch(error => {
                        openedUserindex = -1;
                        alert("request failed");
                    });

            }
        }
    });

    $("#new").on("click", function() {
        $("#detailsModal").css("display", "none");
        $("#formModal").css("display", "block");
        clearForm();
    });

    $("#refresh").on("click", function() {
        hideAllModals();
        openedUserindex = -1;
        fetchAllUsers()
            .then(data => {
                users = data;
                renderAllUsers();
            }).catch(error => {
                alert("unable to load users");
            });
    });

    $("#delete").on("click", function() {
        if (openedUserindex != -1) {
            if (confirm("Are you sure to delete the user?", "")) {
                deleteUser(users[openedUserindex]["_id"])
                    .then(status => {
                        if (status) {
                            hideAllModals();
                            alert("user deleted successfully");
                            openedUserindex = -1;
                            fetchAllUsers()
                                .then(data => {
                                    users = data;
                                    renderAllUsers();
                                }).catch(error => {
                                    alert("unable to load users");
                                });
                        }
                    })
                    .catch(error => {
                        alert("request failed");
                        openedUserindex = -1;
                    });
            }
        }
    });

    init();
});

function renderAllUsers() {
    var counter;
    $("#users").html("");
    for (counter = 0; counter < users.length; counter += 1) {
        var user = "<div class='user' id=" + counter + ">";
        user += "<div class = 'firstName' >" + users[counter]["FirstName"] + "</div>";
        user += "<div class = 'email' >" + users[counter]["Email"] + "</div></div>";
        $("#users").append(user);
    }
}

function hideAllModals() {
    $("#detailsModal").css("display", "none");
    $("#formModal").css("display", "none");
}

function renderDetails() {
    if (openedUserindex != -1) {
        var modal = $("#detailsModal");
        modal.find(".first-name").text(users[openedUserindex]["FirstName"]);
        modal.find(".last-name").text(users[openedUserindex]["LastName"]);
        modal.find(".email").text(users[openedUserindex]["Email"]);
        modal.find(".gender").text(users[openedUserindex]["Gender"]);
        modal.find(".phone").text(users[openedUserindex]["Phone"]);
    }
}

function renderForm() {
    if (openedUserindex != -1) {
        var modal = $("#formModal");
        modal.find(".first-name").val(users[openedUserindex]["FirstName"]);
        modal.find(".last-name").val(users[openedUserindex]["LastName"]);
        modal.find(".email").val(users[openedUserindex]["Email"]);
        if (users[openedUserindex]["Gender"] == "Male") {
            modal.find(".Male").prop("checked", true);
        } else if (users[openedUserindex]["Gender"] == "Female") {
            modal.find(".Female").prop("checked", true);
        }
        modal.find(".gender").text(users[openedUserindex]["Gender"]);
        modal.find(".phone").val(users[openedUserindex]["Phone"]);
    }
}

function clearForm() {
    var modal = $("#formModal");
    modal.find(".first-name").val("");
    modal.find(".last-name").val("");
    modal.find(".email").val("");
    modal.find(".Male").prop("checked", true);
    modal.find(".gender").text("");
    modal.find(".phone").val("");
}