export  function validate_form(name,surname,username,password,confirm_password,email){
    let validate_error ={};
    let validated = true;
      if(name == ""){
         validate_error.name="name field is empty";
          validated=false;
      }else{
          validate_error.name=""
      }

      if(username == ""){
    validate_error.username="username field is empty";
        validated=false;
    }else{
        validate_error.username=""
    }

    if(password != confirm_password || password == '') {
        validate_error.password="password dosent match  or empty";
        validated=false;
    }else{
        validate_error.password=""
    }

    if(email == ""){
        validate_error.email="email field empty";
        validated=false;
    }else{
        validate_error.email=""
    }
    

    if(surname == ""){
        validate_error.surname="surname field is empty";
        validated=false;
    }else{
        validate_error.surname=""
    }
    return {validate_error,validated}
}