document.getElementById("passwordLength").oninput = function() {
  document.getElementById("length").value = this.value;
}

document.getElementById("length").oninput = function() {
  document.getElementById("passwordLength").value = this.value;
}

function generatePassword() {
  var lengthInput = document.getElementById("length");
  var length = +(lengthInput.value);

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
  if (includeUppercase) characters += upper;
  if (includeLowercase) characters += lower;
  if (includeNumbers) characters += numbers;
  if (includeSymbols) characters += symbols;

  if (characters === "") {
    document.getElementById("result").innerText = "❗ Select at least one character type.";
    return;
  }

  var password = "";
  for (var i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }

  document.getElementById("result").innerText = password;
}

function copyToClipboard() {
  var password = document.getElementById("result").innerText;
  if (!password || password.includes("❗") || password === "Your password will appear here") {
    return alert("Nothing to copy!");
  }

  navigator.clipboard.writeText(password)
    .then(() => {
      alert("✅ Password copied to clipboard!");
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
    });
}

document.getElementById("length").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        generatePassword();
    }
});
