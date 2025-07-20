document.getElementById("passwordLength").oninput = function(event) {
  document.getElementById("length").value = event.target.value;
};

document.getElementById("length").oninput = function(event) {
  document.getElementById("passwordLength").value = event.target.value;
};

function generatePassword() {
  var lengthInput = document.getElementById("length");
  var length = parseInt(lengthInput.value, 10);

  if (length > 100) {
    alert("Password length cannot exceed 100 characters.");
    length = 100;
    lengthInput.value = 100;
    document.getElementById("passwordLength").value = 100;
    document.getElementById("lengthValue").innerText = 100;
  }

  if (isNaN(length) || length < 6) {
    alert("Password length must be at least 6 characters.");
    return;
  }

  var includeUppercase = document.getElementById("uppercase").checked;
  var includeLowercase = document.getElementById("lowercase").checked;
  var includeNumbers = document.getElementById("numbers").checked;
  var includeSymbols = document.getElementById("symbols").checked;

  var upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lower = "abcdefghijklmnopqrstuvwxyz";
  var numbers = "0123456789";
  var symbols = "!@#$%^&*()_+-=[]{}|;:',.<>/?";

  var characters = "";
  if (includeUppercase) {
    characters = characters + upper;
  }
  if (includeLowercase) {
    characters = characters + lower;
  }
  if (includeNumbers) {
    characters = characters + numbers;
  }
  if (includeSymbols) {
    characters = characters + symbols;
  }

  if (characters === "") {
    document.getElementById("result").innerText = "Select at least one character type.";
    return;
  }

  var password = "";
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    password = password + characters.charAt(randomIndex);
  }

  document.getElementById("result").innerText = password;
}

function copyToClipboard() {
  var password = document.getElementById("result").innerText;

  var isEmpty = password === "" || password == null;
  var isInvalid = password.indexOf("Select at least one character type.") !== -1 || password === "Your password will appear here";

  if (isEmpty || isInvalid) {
    alert("Nothing to copy!");
    return;
  }

  navigator.clipboard.writeText(password)
    .then(function() {
      alert("Password copied to clipboard!");
    })
    .catch(function(err) {
      console.error("Failed to copy: ", err);
    });
}

document.getElementById("length").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    generatePassword();
  }
});
