# php-react-app

Live example for the [back-end workshop](https://io.tskoli.dev/guides/61d477adc520060008588f10) for Module 5.

## The app 

We'll be creating a simple app with **React** as frontend and **PHP** for back-end on an **Apache** server using this [tutorial](https://www.youtube.com/watch?v=96DuZ33NX_Y).

## The Stack  
- **MAMP stack**
    - Mac
    - Apache
    - MySQL
    - PHP 
- **React** 

## Step 1: Create the React app 

- Create a react app 
- Update the file **App.js** with the following code: 

```javascript
import React, { Component } from "react";
import "./App.css";

class App extends Component {
  state = {
    text: "",
  };
  handleAdd = async (e) => {
    await this.setState({
      text: e.target.value,
    });
  };
  handleSubmit = (e) => {
    console.log(this.state.text);
  };
  render() {
    return (
      <div className="App-header">
        <input
          onChange={this.handleAdd}
          type="text"
          id="text"
          placeholder="enter some text"
        ></input>
        <br />
        <button onClick={this.handleSubmit} id="submit">
          Save
        </button>
      </div>
    );
  }
}

export default App;

```

- Now check if the console.log works 

## Step 2: Set-up the backend-end

### Set-up the Apache server 

- Download [XAMPP](https://www.apachefriends.org/index.html). 
- To install it on Mac, rename the downloaded file from ".bz2" file to ".dmg" to convert it and then go ahead and install it 
- Once installed, launch it and we'll need to do the following:
    - On the **XAMPP** tab, click on **Start**, the dot should become green and you IP address should appear 
    - On the **Services** tab, all the dots should be green, otherwise click on **Start all**
    - On the **Network** tab, click on **localhost:8080 -> 80 (Over SSH)** and enable it, the dot should become green  
    - On the **Volumes** tab, click on **Mount**, to check if it succeeded, go on the Finder, if a new volume appeared with you IP address on "Locations" with a "lampp" folder in it, then it worked! 🎉

### Create the database

- Then go on [http://localhost:8080/phpmyadmin/](http://localhost:8080/phpmyadmin/) to access phpMyAdmin
- Click on **Databases**, enter a **database name** and click on **Create**, *(mine is called "react_php"*
- Under **Create table**, enter a name for you table, *(I named mine "react_database")*, reduce to "2" to number of columns since we'll only use two and click on **Go**
- Create the columns: 
    1. Name: **ID** / Type: **INT** / Index: **PRIMARY** / A_I: **check the box**
    2. Name: **texts** / Type: **VARCHAR** / Length/Values: **45** / Null: **check the box** / A_I: **check the box**
- Click on **Save** and verify if they were created by clicking on the **+** under **Columns**

### Create the index.php file 

- Actually, it already exists, you only need to access it and update id 
- Go to **[Finder -> *the volume mounted with your IP address* -> lampp -> htdocs -> index.php]**
- Then update the index.php file with the code below 
    - the **username** should be "root" and the **password** should be empty by default. But if you want to check, go to **[... -> lampp -> phpmyadmin -> config.inc]** and check ` $cfg['Servers'][$i]['user'] = 'root';` and `$cfg['Servers'][$i]['password'] = '';` 
    - **db** = your table's name, in my case "react_php"
    - after **INSERT INTO** is the name of your table, in my case "react_database"
        
```php
<?php
$serverName="localhost";
$username="root";
$password="";
$db="react_php";
$conn=mysqli_connect($serverName, $username, $password, $db);
$query = "INSERT INTO react_database (texts) VALUES('my first text')";

if(mysqli_query($conn,$query)){
echo "Data has been inserted successfully";
}
else{
    echo "Error!";
}
```

- Check the connection -> **go to [http://localhost:8080/index.php](http://localhost:8080/index.php)**, if you see "Data has been inserted successfully", then it worked! 🎉

- If not, check the logs under [**... -> lampp -> logs**]

- Finally, update your **index.php** so that the data inserted in the frontend will be posted on the table in your database:

```php
<?php
<?php
$serverName="localhost";
$username="root";
$password="";
$db="react_php";
$conn=mysqli_connect($serverName, $username, $password, $db);
// $query = "INSERT INTO react_php (texts) VALUES('my first text')";

$recText = $POST['text'];
$query = "INSERT INTO react_database (texts) VALUES('$recText')";

if(mysqli_query($conn,$query)){
echo "Data has been inserted successfully";
}
else{
    echo "Error!";
}
```

- Refresh **[http://localhost:8080/index.php](http://localhost:8080/index.php)**, if you still see Data has been inserted successfully", then it's working! 🎉

## Step 3: Set up the frontend  

- Before updating you **App.js** file, we'll to install **Axios** and the Google Chrome Exstension [Moesif Origin & CORS Changer](https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc#:~:text=Moesif%20Origin%20%26%20CORS%20Changer&text=This%20plugin%20allows%20you%20to,without%20receiving%20Cross%20Origin%20Errors.)
- Then update your **App.js** file like so: 


```javascript
import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    text: "",
  };
  handleAdd = async (e) => {
    await this.setState({
      text: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.text);
    let formData = new FormData();
    formData.append("text", this.state.text);
    const url = "http://localhost:8080/index.php";
    axios
      .post(url, formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="App-header">
        <input
          onChange={this.handleAdd}
          type="text"
          id="text"
          placeholder="enter some text"
        ></input>
        <br />
        <button onClick={this.handleSubmit} id="submit">
          Save
        </button>
      </div>
    );
  }
}

export default App;
```

- Then run you app, it should be on **[http://localhost:3000](http://localhost:3000)**, open the **console**, type in something and click on **save**
- If you see a console.log with what you typed in and the message "Data has been inserted successfully", it worked!
- Finally, go to you database on **[http://localhost:8080/index.php](http://localhost:8080/index.php)** and you should see a new entry! 

# php-react-app
