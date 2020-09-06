<script>
    import { auth, provider } from './../../firebase.js';
    import { navigate } from 'svelte-routing';
    import { user } from './../../store.js';

    const handleGoogleLogin = () => {
      auth.signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var firebaseuser = result.user;

        if(firebaseuser) {
            let {email} = firebaseuser;
            console.log('first', $user);
            user.set({...$user, loggedIn: true, email});
            console.log('then', $user);
            navigate('/dashboard');
        }
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    };

    // Destructuring to obtain email and password from form via Event
    const handleRegisterForm = ({ 
        target: { elements: { email, password } } 
    }) => {
        auth.createUserWithEmailAndPassword(email.value, password.value).catch(error => alert(error.message));
        let firebaseUser = auth.currentUser;

        if(firebaseUser) {
            let {email} = firebaseUser;
            console.log('first', $user);
            user.set({...$user, loggedIn: true, email});
            console.log('then', $user);
            navigate('/dashboard');
        }
    };
</script>

<style>

#container {
    position: fixed;
    width: 340px;
    height: 380px;
    top: 50%;
    left: 50%;
    margin-top: -140px;
    margin-left: -170px;
    background: #fff;
    border-radius: 3px;
    border: 1px solid #ccc;
    box-shadow: 0 1px 2px rgba(0, 0, 0, .1);
}


input[type=email], input[type=password] {
    color: #777;
    padding-left: 10px;
    margin: 10px;
    margin-top: 12px;
    margin-left: 18px;
    width: 290px;
    height: 35px;
    border: 1px solid #c7d0d2;
    border-radius: 2px;
    box-shadow: inset 0 1.5px 3px rgba(190, 190, 190, .4), 0 0 0 5px #f5f7f8;
    -webkit-transition: all .4s ease;
    -moz-transition: all .4s ease;
    transition: all .4s ease;
}

label {
    color: #555;
    display: inline-block;
    margin-left: 18px;
    padding-top: 10px;
    font-size: 14px;
}


input[type=submit] {
  background-color: #4CAF50; /* Green */
  border-radius: 20px;
  border: none;
  float: right;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

.googlelogin {
  background-color: #4CAF50; /* Green */
  border-radius: 20px;
  border: none;
  float: right;
  color: white;
  padding: 10px 24px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

form {
    margin-top: 20px;
}

</style>



<div id="container">
    <h1><center>Register</center></h1>
    <p><center>Please Enter Your Email And Password For Register</center></p>
    <form on:submit|preventDefault={handleRegisterForm}>
        <div>
            <label for="email">Email</label>
            <input type="email" name="email" id="email">
        </div>
        <div>
            <label for="password">Password</label>
            <input type="password" name="password" id="password">
        </div>
        <div id="lower">
            <input type="submit" value="Register">
             <button class="googlelogin" on:click={handleGoogleLogin}>Google</button>
        </div>
    </form>
</div>
    