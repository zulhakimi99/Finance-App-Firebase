
<script>
    import Register from './component/Auth/Register.svelte';
	import Dashboard from './router/Home.svelte';
    import Login from './component/Auth/Login.svelte';
    import { Router, Link, Route } from 'svelte-routing';
    import { user } from './store';
    import { auth } from './firebase';

    const classActive = "active";
    const classInactive = "inactive";
  
	const handleLogOut = () => {
		auth.signOut().then(function() {
			// Sign-out successful.
			user.set({...$user, loggedIn: false});
			console.log('logout', $user);

		}, function(error) {
      // An error happened.
      console.warn('error on logout', error.message);
		});
	}

	function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;
    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: classActive };
    }
    return {class: classInactive };
  }
    
    
</script>

<body>
   
        <Router>
			<div class="topnav">
        {#if  $user.loggedIn}
            <li><Link to="dashboard" getProps="{getProps}"> Dashboard </Link></li>
			<li><a class="inactive" href="/" on:click={handleLogOut}>Logout</a></li>
             {:else}
			<li><Link to="/" getProps="{getProps}"> Home </Link></li>
			<li><Link to="login" getProps="{getProps}"> Login </Link></li>
			<li><Link to="register" getProps="{getProps}"> Register </Link></li>
		{/if}
		</div>
		<Route path="login" component={Login} />
		<Route path="register" component={Register} />
		<Route path="dashboard" component={Dashboard} />
		<Route path="/">
			<h1> You must been login Before Use This App</h1>
			<p> Login Now</p>
			<center><button class="login"> <Link to="login"> Login  </Link> </button></center>
			</Route>
        </Router>
   
</body>


<style>
    body {
 margin: 0;
 font-family: Arial, Helvetica, sans-serif;
}

h1{
	text-align: center;
}

p{
	text-align: center;
}

.topnav {
	position: sticky;
	top: 0;
	margin: 0;
	padding: 0;
	list-style-type: none;
	overflow: hidden;
	background-color: tomato;
}

a {
 float: right;
 color: #f2f2f2;
 text-align: center;
 text-decoration: none;
 font-size: 17px;
}

a:hover {
 background-color: #ddd;
 color: black;
}

li {
	float: left;
	padding: 7px 8px;
	background-color: tomato;
	display: block;
	text-align: center;
	text-decoration: none;
	color: white;
}

button{
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 16px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
}

.login {
  background-color: white; 
  color: black; 
  border: 2px solid #008CBA;
}

.login:hover {
  background-color: #008CBA;
  color: white;
}

.inlogin {

	background-color: #222222;
	display: block;
	text-align: center;
	text-decoration: none;
	color: white;
}

</style>
