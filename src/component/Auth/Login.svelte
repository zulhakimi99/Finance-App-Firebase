<script>
    import { auth, provider } from '../../firebase.js';
    import { navigate } from 'svelte-routing';
    import { user } from './../../store.js';
    import { Router, Link, Route } from 'svelte-routing';
    let email = '';
    let password = '';

    const handleGoogleLogin = () => {
      auth.signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var firebaseuser = result.user;

        if(firebaseuser) {
            let {email} = firebaseuser;
            console.log('Google first', $user);
            user.set({...$user, loggedIn: true, email});
            console.log('Google then', $user);
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
    const handleLoginForm = () => {
        auth.signInWithEmailAndPassword(email, password).then(function(result) {

        let firebaseUser = auth.currentUser;

        if(firebaseUser) {
            let {email} = firebaseUser;
            console.log('first', $user);
            user.set({...$user, loggedIn: true, email});
            console.log('then', $user);
            navigate('/dashboard');
        }

        }).catch(error => alert(error.message));
        
    };


</script>

<style>

#container {
    position: fixed;
    width: 340px;
    height: 340px;
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



.login {
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


</style>

<div id="container">
    <h1><center>Login</center></h1>
    <p><center>Please Enter Your Email And Password</center></p>
    <div>
        <label for="email"><b>Email</b></label>
        <input type="email" name="email" bind:value={email}>
    </div>
    <div>
        <label for="password"><b>Password</b></label>
        <input type="password" name="password" bind:value={password}>
    </div>
    <div id="lower">
        <button class="login" on:click={handleLoginForm}>Login</button>
        <button class="googlelogin" on:click={handleGoogleLogin}>Google</button>
    </div><br>
     <Link to="register"> Register Now</Link>


    
</div>