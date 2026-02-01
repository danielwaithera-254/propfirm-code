document.addEventListener("DOMContentLoaded", function () {

   

    const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const idnumber = document.getElementById("idnumber").value.trim();

        
        if (fullname === "" || email === "" || phone === "" || idnumber === "") {
            alert("Please fill in all fields.");
            return;
        }


        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        const phonePattern = /^(\+254|0)\d{9}$/;
        if (!phonePattern.test(phone)) {
            alert("Please enter a valid phone number.");
            return;
        }

        
        alert(
            "DATA NOTICE:\nYour data is collected for registration purposes only and handled according to data protection laws."
        );

        
        setCookie("registeredUser", fullname, 7);

        alert("Registration successful! Welcome, " + fullname + " 🎉");

        form.reset();
    });

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
    }

    function getCookie(name) {
        const cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + "=")) {
                return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }
        return null;
        
    }

   

    const searchBar = document.getElementById("searchbar");

    searchBar.addEventListener("input", function () {
        const searchValue = searchBar.value.toLowerCase();
        const cards = document.querySelectorAll(
            ".card, .card2, .card3, .card4, .card5, .card6"
        );

        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(searchValue) ? "block" : "none";
        });
    });

    
    const buyButtons = document.querySelectorAll("button");

    buyButtons.forEach(button => {
        button.addEventListener("click", function () {

            const user = getCookie("registeredUser");

            if (!user) {
                alert("Please register first before purchasing.");
                form.scrollIntoView({ behavior: "smooth" });
                return;
            }

            const product = this.closest("div").querySelector("h2").innerText;
            alert(`✅ ${product} added to cart.\nThank you, ${user}!`);
        });
    });

    

    const existingUser = getCookie("registeredUser");
    if (existingUser) {
        console.log("Welcome back, " + existingUser);
    }

});
